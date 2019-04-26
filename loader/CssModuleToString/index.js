const fs = require('fs');

const AddCss = (js) => {
    return `import './cat-react-tool.css';\n` + js;
}

class CssModuleToString{
    constructor(options){
        this.options = options;
    }
    apply (compiler){

        let indexJs = '';
        // 读取入口文件
        compiler.hooks.afterPlugins.tap('CssModuleToString', (compilation) => {
            if (typeof compilation.options.entry === 'string') {
                // 缓存入口文件内容
                indexJs = fs.readFileSync(compilation.options.entry).toString();
            }
        })

        compiler.hooks.emit.tap('CssModuleToString', (compilation) => {
            // 遍历需要的文件
            Array.from(compilation.fileDependencies).forEach((items) => {
                // 只读取js文件
                if (/\.js/.test(items)) {
                    // 读取文件
                    fs.readFile(items, (err, data) => {
                        if (err) throw Error(err);
                        // 替换less为js
                        let re = /module\.less/g;
                        let js = data.toString();
                        if (re.test(js)) {
                            js = js.replace(re, `module.less.js`);
                            fs.writeFile(items, js, err => {
                                if (err) throw Error(err);
                            })
                        }
                    })
                }
            })
            // 重写入口文件
            indexJs = AddCss(indexJs);
            compilation.assets['index.js'] = {
                source: () => indexJs,
                size: () => indexJs.length,
            };
        })
    };
}

CssModuleToString.loader = require.resolve('./loader');

module.exports = CssModuleToString;
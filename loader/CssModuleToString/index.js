const fs = require('fs');
const path = require('path');

class CssModuleToString{
    constructor(options){
        this.options = options;
    }
    apply (compiler){
        compiler.hooks.emit.tap('css-module-to-string', (compilation, callback) => {
            let number = 0;
            // 遍历需要的文件
            this.options.files.forEach((items, index, files) => {
                // 读取文件
                fs.readFile(items.file, (err, data) => {
                    if (err) {
                        throw err;
                    }
                    let js = data.toString();
                    // 替换less为js
                    js = js.replace(/module\.less/g, `module.less.js`);
                    fs.writeFile(items.file, js, err => {
                        if (err) {
                            throw err;
                        }
                        number += 1;
                        if (number === files.length - 1) {
                            callback && callback();
                        }
                    })
                })
            })
            let indexTs = fs.readFileSync(path.resolve(__dirname, '../../dist/component/index.d.ts'));
            indexTs = indexTs.toString().replace(/\.\//g, './component/');
            compilation.assets['index.d.ts'] = {
                source: function() {
                    return indexTs;
                },
                size: function() {
                    return indexTs.length;
                }
            };
            let indexJs = fs.readFileSync(path.resolve(__dirname, '../../dist/component/index.d.ts'));
            indexJs = indexJs.toString().replace(/\.\//g, './component/');
            indexJs = `import './cat-react-tool.css';\n` + indexJs;
            compilation.assets['index.js'] = {
                source: function() {
                    return indexJs;
                },
                size: function() {
                    return indexJs.length;
                }
            };
        })
    };
}

CssModuleToString.loader = require.resolve('./loader');

module.exports = CssModuleToString;
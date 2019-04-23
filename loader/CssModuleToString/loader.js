const fs = require('fs');

const mkdir = require('./mkdir');
const moduleFile = require('./module');

module.exports = function(source, map){
    // this.cacheable && this.cacheable();

    let name = this.resourcePath.match(/\w+\.module\.less/g)[0];

    if (mkdir(moduleFile)) {
        fs.writeFileSync(`${moduleFile}/${name}.js`, source);
    }

    return source;
}
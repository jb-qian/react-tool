"use strict";
/*
 * @Author: 宋乾
 * @Date: 2019-01-18 14:59:31
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-02-14 14:23:28
 */
exports.__esModule = true;
var Rem = /** @class */ (function () {
    function Rem() {
    }
    Rem.set = function (size) {
        if (size === void 0) { size = 750; }
        // 获取htnml
        var html = document.documentElement;
        // 获取宽度
        var width = html.clientWidth;
        // 计算px值
        var px = width / size * 100;
        // 设置html字体大小
        html.setAttribute('style', "font-size: " + px + "px !important");
    };
    Rem.get = function (size) {
        if (size === void 0) { size = 750; }
        // 获取htnml
        var html = document.documentElement;
        // 获取宽度
        var width = html.clientWidth;
        // 计算px值
        var px = width / size * 100;
        // 返回px值
        return px;
    };
    return Rem;
}());
exports.Rem = Rem;

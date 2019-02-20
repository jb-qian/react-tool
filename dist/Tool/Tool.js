"use strict";
/*
 * @Author: 宋乾
 * @Date: 2019-01-18 14:59:31
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-02-20 09:24:47
 */
exports.__esModule = true;
var PX = function (size) {
    if (size === void 0) { size = 750; }
    // 获取htnml
    var html = document.documentElement;
    // 获取宽度
    var width = html.clientWidth;
    // 计算px值
    var px = width / size * 100;
    // 返回px值
    return { html: html, px: px };
};
var Rem = /** @class */ (function () {
    function Rem() {
    }
    Rem.set = function (size) {
        if (size === void 0) { size = 750; }
        var _a = PX(size), html = _a.html, px = _a.px;
        // 设置html字体大小
        html.setAttribute('style', "font-size: " + px + "px !important");
    };
    Rem.get = function (size) {
        if (size === void 0) { size = 750; }
        var px = PX(size).px;
        // 返回px值
        return px;
    };
    return Rem;
}());
exports.Rem = Rem;

"use strict";
exports.__esModule = true;
/*
 * @Author: 宋乾
 * @Date: 2019-01-18 14:59:31
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-01-18 15:42:42
 */
exports.rem = function (size) {
    // 获取htnml
    var html = document.documentElement;
    // 读取html宽度
    var w = html.clientWidth;
    // 计算出作为rem基础的单位大小
    var px = w / size * 100;
    return {
        // 设置html字体
        set: function () {
            html.setAttribute('style', "font-size: " + px + "px !important");
        },
        // 返回字体
        get: function () {
            return px;
        }
    };
};

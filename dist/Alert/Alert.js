"use strict";
exports.__esModule = true;
/*
 * @Author: 宋乾
 * @Date: 2019-01-10 13:49:29
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-03-19 12:05:55
 */
var React = require("react");
var ReactDOM = require("react-dom");
var styles = require("../../less/alert.less");
var Element_1 = require("./Element");
var App = function (props) {
    // 创建一个元素
    var div = document.createElement('div');
    // 添加专属样式
    div.className = styles.alert;
    // 添加到页面内
    document.body.appendChild(div);
    // 加入到dom中
    var element = React.createElement(Element_1["default"], Object.assign(props, {
        // 结束后销毁方法
        willUnmount: function () {
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
        }
    }));
    ReactDOM.render(element, div);
};
exports["default"] = App;

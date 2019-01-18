"use strict";
exports.__esModule = true;
/*
 * @Author: 宋乾
 * @Date: 2019-01-10 09:15:22
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-01-18 15:44:21
 */
var React = require("react");
var ReactDOM = require("react-dom");
var Element_1 = require("./Element");
var App = function (props) {
    var div = document.createElement('div');
    document.body.appendChild(div);
    var element = React.createElement(Element_1["default"], Object.assign(props, {
        willUnmount: function () {
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
        }
    }));
    ReactDOM.render(element, div);
};
exports["default"] = App;

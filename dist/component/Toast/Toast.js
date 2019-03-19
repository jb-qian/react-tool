"use strict";
exports.__esModule = true;
/*
 * @Author: 宋乾
 * @Date: 2019-01-10 09:15:22
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-03-19 11:24:09
 */
var React = require("react");
var ReactDOM = require("react-dom");
var Element_1 = require("./Element");
var App = function (props) {
    var div = document.getElementById('sq-toast');
    if (!div) {
        div = document.createElement('div');
        div.id = 'sq-toast';
        document.body.appendChild(div);
    }
    var element = React.createElement(Element_1["default"], Object.assign(props, {
        willUnmount: function () {
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
        }
    }));
    ReactDOM.render(element, div);
};
exports["default"] = App;
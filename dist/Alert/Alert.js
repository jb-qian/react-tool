"use strict";
exports.__esModule = true;
var React = require("react");
var ReactDOM = require("react-dom");
var Element_1 = require("./Element");
var App = function (props) {
    var div = document.createElement('div');
    div.className = 'sq-alert';
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

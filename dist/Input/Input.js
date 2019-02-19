"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
/*
 * @Author: 宋乾
 * @Date: 2019-01-24 15:46:24
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-02-15 16:21:18
 */
var React = require("react");
var Input = /** @class */ (function (_super) {
    __extends(Input, _super);
    function Input(props) {
        return _super.call(this, props) || this;
    }
    Input.prototype.render = function () {
        var type = {
            type: this.props.type,
            maxLength: this.props.maxLength || undefined,
            name: this.props.name,
            className: this.props.className,
            style: this.props.style,
            onInput: this.props.onInput,
            onChange: this.props.onChange,
            placeholder: this.props.placeholder,
            'data-error': this.props.error
        };
        if (this.props.type === 'textarea') {
            return (React.createElement("textarea", __assign({}, type)));
        }
        return (React.createElement("input", __assign({}, type)));
    };
    return Input;
}(React.Component));
exports["default"] = Input;

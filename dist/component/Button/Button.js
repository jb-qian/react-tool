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
exports.__esModule = true;
/*
 * @Author: 宋乾
 * @Date: 2019-01-10 11:08:12
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-03-20 09:48:46
 */
var React = require("react");
var styles = require("../../less/button.module.less");
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button(props) {
        var _this = _super.call(this, props) || this;
        _this.click = function () {
            if (_this.props.disabled) {
                return;
            }
            if (_this.props.onClick) {
                _this.props.onClick();
            }
        };
        return _this;
    }
    Button.prototype.render = function () {
        return (React.createElement("button", { type: this.props.type, style: this.props.style, disabled: this.props.disabled, className: [styles.button, this.props.className || '', this.props.disabled ? styles.disabled : ''].join(' '), onClick: this.click }, this.props.children));
    };
    return Button;
}(React.Component));
exports["default"] = Button;

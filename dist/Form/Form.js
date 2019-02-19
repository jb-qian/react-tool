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
 * @Date: 2019-01-24 14:40:15
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-02-19 17:46:16
 */
var React = require("react");
var Form = /** @class */ (function (_super) {
    __extends(Form, _super);
    function Form(props) {
        var _this = _super.call(this, props) || this;
        _this.submit = function (e) {
            e.preventDefault();
            var json = {};
            for (var key in e.target) {
                if (e.target.hasOwnProperty(key)) {
                    var target = e.target[key];
                    var element = ['INPUT', 'TEXTAREA', 'SELECT'].indexOf(target.nodeName);
                    if (element !== -1) {
                        if (target.nodeName === 'SELECT') {
                            json[target.name] = target.getAttribute('data-value');
                        }
                        else {
                            json[target.name] = target.value;
                        }
                        var text = target.getAttribute('data-error');
                        if (text && !json[target.name]) {
                            return _this.props.toast && _this.props.toast({
                                text: text
                            });
                        }
                    }
                }
            }
            _this.props.submit && _this.props.submit(json);
        };
        return _this;
    }
    Form.prototype.render = function () {
        return (React.createElement("form", { onSubmit: this.submit }, this.props.children));
    };
    return Form;
}(React.Component));
exports["default"] = Form;

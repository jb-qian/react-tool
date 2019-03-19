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
 * @Date: 2019-01-10 13:44:28
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-03-19 12:05:11
 */
var React = require("react");
var styles = require("../../less/alert.less");
var border = require("../../less/border.less");
var Element = /** @class */ (function (_super) {
    __extends(Element, _super);
    function Element(props) {
        var _this = _super.call(this, props) || this;
        /**
         * 取消事件
         */
        _this["default"] = function () {
            _this.clone();
            _this.props["default"] && _this.props["default"]();
        };
        /**
         * 确定事件
         */
        _this.primary = function () {
            _this.clone();
            _this.props.primary && _this.props.primary();
        };
        /**
         * 关闭
         */
        _this.clone = function () {
            _this.confirm.addEventListener('transitionend', _this.transitionend);
            _this.setState({
                className: ''
            });
        };
        /**
         * 动画结束
         */
        _this.transitionend = function () {
            _this.confirm.removeEventListener('transitionend', _this.transitionend);
            _this.props.willUnmount();
        };
        _this.state = {
            className: ''
        };
        return _this;
    }
    Element.prototype.componentDidMount = function () {
        var _this = this;
        setTimeout(function () {
            _this.setState({
                className: styles.active
            });
        }, 0);
    };
    Element.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { ref: function (e) { return _this.confirm = e; }, className: [styles.confirm, this.state.className].join(' ') },
            React.createElement("div", { className: styles.content },
                this.props.title ? React.createElement("div", { className: styles.title }, this.props.title) : null,
                this.props.subtitle ? React.createElement("div", { className: styles.subtitle }, this.props.subtitle) : null),
            React.createElement("div", { className: [styles.btnsContent, border.brt].join(' ') },
                !this.props.noDefault ? React.createElement("div", { className: [styles.btn, border.brr].join(' '), onClick: this["default"] }, "\u53D6\u6D88") : null,
                !this.props.noPrimary ? React.createElement("div", { className: styles.btn, onClick: this.primary }, "\u786E\u5B9A") : null)));
    };
    return Element;
}(React.Component));
exports["default"] = Element;

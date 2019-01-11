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
var React = require("react");
var Element = /** @class */ (function (_super) {
    __extends(Element, _super);
    function Element(props) {
        var _this = _super.call(this, props) || this;
        _this["default"] = function () {
            _this.clone();
            if (_this.props["default"]) {
                _this.props["default"]();
            }
        };
        _this.primary = function () {
            _this.clone();
            if (_this.props.primary) {
                _this.props.primary();
            }
        };
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
                className: 'active'
            });
        }, 0);
    };
    Element.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { ref: function (e) { return _this.confirm = e; }, className: "sq-confirm " + this.state.className },
            React.createElement("div", { className: "sq-content" },
                React.createElement("div", { className: "sq-title" }, this.props.title || '缺少标题'),
                React.createElement("div", { className: "sq-subtitle" }, '是否退出登录？')),
            React.createElement("div", { className: "sq-btns-content brt" },
                !this.props.noDefault && React.createElement("div", { className: "sq-btn brr", onClick: this["default"] }, "\u53D6\u6D88"),
                !this.props.noPrimary && React.createElement("div", { className: "sq-btn", onClick: this.primary }, "\u786E\u5B9A"))));
    };
    return Element;
}(React.Component));
exports["default"] = Element;

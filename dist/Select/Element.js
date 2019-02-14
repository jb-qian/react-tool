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
var List_1 = require("./List");
var Element = /** @class */ (function (_super) {
    __extends(Element, _super);
    function Element(props) {
        var _this = _super.call(this, props) || this;
        _this.onClose = function () {
            _this.props.willUnmount();
        };
        _this.onClick = function (item) {
            _this.props.setValue(item);
            _this.props.willUnmount();
        };
        _this.onChange = function (item) {
            _this.props.setValue(item);
        };
        _this.touch = function (type) {
            var mask = _this.refSelectMask;
            if (mask) {
                mask[type]('touchstart', _this.maskTouchStart);
            }
        };
        _this.maskTouchStart = function (e) {
            e.preventDefault();
        };
        _this.state = {
            active: false
        };
        return _this;
    }
    Element.prototype.componentDidMount = function () {
        this.touch('addEventListener');
    };
    Element.prototype.componentWillUnmount = function () {
        this.touch('removeEventListener');
    };
    Element.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "sq-select" },
            React.createElement("div", { ref: function (e) { return _this.refSelectMask = e; }, className: "sq-select-mask", onClick: this.onClose }),
            React.createElement("div", { className: "sq-select-box" },
                React.createElement(List_1["default"], { onChange: this.onChange, data: this.props.data }))));
    };
    return Element;
}(React.Component));
exports["default"] = Element;

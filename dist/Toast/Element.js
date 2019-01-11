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
        /**
         * 动画结束
         */
        _this.transitionend = function () {
            _this.toast.removeEventListener('transitionend', _this.transitionend);
            _this.props.willUnmount();
        };
        _this.state = {
            duration: _this.props.duration || 3000,
            show: true
        };
        return _this;
    }
    Element.prototype.componentDidMount = function () {
        var _this = this;
        this.toast.addEventListener('transitionend', this.transitionend);
        if (this.state.duration > 0) {
            setTimeout(function () {
                _this.setState({
                    show: false
                });
            }, this.state.duration);
        }
    };
    Element.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { ref: function (e) { return _this.toast = e; }, className: "sq-toast " + (this.state.show ? '' : 'hide') },
            React.createElement("div", { className: "sq-text" }, this.props.text)));
    };
    return Element;
}(React.Component));
exports["default"] = Element;

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
 * @Date: 2019-01-25 11:50:38
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-02-19 15:37:48
 */
var React = require("react");
var List_1 = require("./List");
var Element = /** @class */ (function (_super) {
    __extends(Element, _super);
    function Element(props) {
        var _this = _super.call(this, props) || this;
        _this.reflist = {};
        _this.initNumber = function (num) {
            if (num < 10) {
                num = "0" + num;
            }
            return num;
        };
        _this.getMonth = function () {
            var arr = [];
            for (var i = 1; i <= 12; i++) {
                arr.push({
                    value: _this.initNumber(i),
                    text: "" + _this.initNumber(i)
                });
            }
            return arr;
        };
        _this.getDate = function (year, month) {
            year = Number(year);
            month = Number(month);
            var arr = [];
            var max = [1, 3, 5, 7, 8, 10, 12].indexOf(month) !== -1 ? 31 : 30;
            if (month === 2) {
                max = (year % 400 === 0 || year % 4 === 0 && year % 100 !== 0) ? 29 : 28;
            }
            for (var i = 1; i <= max; i++) {
                arr.push({
                    value: _this.initNumber(i),
                    text: "" + _this.initNumber(i)
                });
            }
            return arr;
        };
        _this.onClose = function () {
            _this.props.willUnmount();
        };
        _this.onConfirm = function () {
            _this.props.setValue(_this.state.value, true);
            _this.props.willUnmount();
        };
        _this.onChange = function (index, item) {
            if (item === void 0) { item = { value: '', text: '' }; }
            _this.setState(function (prev) {
                var value = prev.value.slice();
                value[index] = item;
                return {
                    value: value
                };
            });
            clearTimeout(_this.timer);
            _this.timer = setTimeout(function () {
                _this.props.setValue(_this.state.value);
            }, 10);
            _this.setState(function (prev) {
                var data = prev.data.slice();
                data[index + 1] = item.children || [];
                return {
                    data: data
                };
            });
            // 时间单独处理
            if (_this.props.type === 'date') {
                _this.setState(function (prev) {
                    var data = prev.data.slice();
                    data[1] = _this.getMonth();
                    var year = (_this.state.value[0] || { value: 1970 }).value;
                    var month = (_this.state.value[1] || { value: 1 }).value;
                    data[2] = _this.getDate(year, month);
                    return {
                        data: data
                    };
                });
            }
        };
        _this.touch = function (type) {
            var mask = _this.refSelectMask;
            if (mask) {
                mask[type]('touchstart', _this.maskTouchStart);
                mask[type]('touchend', _this.maskTouchEnd);
            }
        };
        _this.maskTouchStart = function (e) {
            e.preventDefault();
            e.stopPropagation();
        };
        _this.maskTouchEnd = function (e) {
            e.preventDefault();
            e.stopPropagation();
            _this.onClose();
        };
        _this.state = {
            active: false,
            data: [
                _this.props.data
            ],
            value: []
        };
        return _this;
    }
    Element.prototype.componentDidMount = function () {
        this.touch('addEventListener');
    };
    Element.prototype.componentWillUnmount = function () {
        this.touch('removeEventListener');
    };
    Element.prototype.listView = function () {
        var arr = [];
        var length = Number(this.props.length);
        for (var i = 0; i < length; i++) {
            var data = this.state.data[i] || [];
            arr.push(React.createElement(List_1["default"], { key: "sq-list-" + i, onChange: this.onChange.bind(this, i), data: data }));
        }
        return arr;
    };
    Element.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "sq-select" },
            React.createElement("div", { ref: function (e) { return _this.refSelectMask = e; }, className: "sq-select-mask" }),
            React.createElement("div", { className: "sq-select-box" },
                React.createElement("div", { className: 'sq-select-head brb' },
                    React.createElement("div", { className: 'sq-select-head-btn', onClick: this.onClose }, "\u53D6\u6D88"),
                    React.createElement("div", { className: 'sq-select-head-title' }, "\u8BF7\u9009\u62E9"),
                    React.createElement("div", { className: 'sq-select-head-btn active', onClick: this.onConfirm }, "\u786E\u5B9A")),
                React.createElement("div", { className: 'sq-list' }, this.listView().map(function (item, index) {
                    return item;
                })))));
    };
    return Element;
}(React.Component));
exports["default"] = Element;

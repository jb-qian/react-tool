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
 * @Date: 2019-01-25 15:48:42
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-01-30 17:24:09
 */
var React = require("react");
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List(props) {
        var _this = _super.call(this, props) || this;
        // 转轮高度
        _this.height = 36;
        // 转轮距离
        _this.rotateX = 20;
        // 转轮最小值
        _this.min = 0;
        // 转轮最大值
        _this.max = -((_this.props.data.length - 1) * _this.height);
        // 触摸值
        _this.start = 0;
        _this.more = 0;
        _this.end = 0;
        _this.startY = 0;
        _this.endY = 0;
        _this.onClick = function (item) {
            _this.props.onClick(item);
        };
        _this.renderView = function (item, index) {
            var newIndex = Math.abs(index - _this.state.index);
            var opacity = 1 - (newIndex / 10 * 2.5);
            var transform = "translateZ(90px) rotateX(-" + index * _this.rotateX + "deg)";
            var WebkitTransform = transform;
            var transformOrigin = "center center -90px";
            var WebkitTransformOrigin = transformOrigin;
            if (opacity < 0) {
                opacity = 0;
            }
            var style = { opacity: opacity, WebkitTransform: WebkitTransform, WebkitTransformOrigin: WebkitTransformOrigin, transformOrigin: transformOrigin, transform: transform };
            if (style.opacity !== 0) {
                return (React.createElement("div", { style: style, className: "sq-select-list-item", key: "select-data-" + index }, item.text));
            }
            return '';
        };
        _this.touch = function (type) {
            var list = _this.refSelectList;
            if (list) {
                list[type]('touchstart', _this.onTouchStart);
                list[type]('touchmove', _this.onTouchMove);
                list[type]('touchend', _this.onTouchEnd);
            }
        };
        _this.setTransform = function (index, transition) {
            _this.setState({
                index: index,
                transition: transition
            });
        };
        _this.onTouchStart = function (e) {
            e.preventDefault();
            var pageY = e.targetTouches[0].pageY;
            _this.start = pageY - (_this.end || 0);
            _this.startY = pageY;
            _this.isMore = false;
            _this.startTime = +new Date();
        };
        _this.onTouchMove = function (e) {
            e.preventDefault();
            var pageY = e.targetTouches[0].pageY;
            _this.more = pageY - _this.start;
            _this.setTransform(-(_this.more / _this.height), '');
            _this.isMore = true;
            _this.endY = pageY;
        };
        _this.setEnd = function () {
            // height的值越小 定格的位置越精准
            var height = 20;
            if (Math.abs(_this.end - _this.more) > height) {
                // speed越大 转的越慢 时间越久
                var speed = 30;
                _this.more += (_this.end - _this.more) / speed;
                _this.setTransform(-(_this.more / _this.height), '');
                requestAnimationFrame(_this.setEnd);
            }
            else {
                if (_this.more > _this.min) {
                    _this.end = _this.more = _this.min;
                }
                if (_this.more < _this.max) {
                    _this.end = _this.more = _this.max;
                }
                var index = -Math.round(_this.more / _this.height);
                _this.end = -index * _this.height;
                _this.setTransform(index, "transform .2s ease-out");
            }
        };
        _this.onTouchEnd = function (e) {
            e.preventDefault();
            _this.endTime = +new Date();
            var end = _this.endTime - _this.startTime;
            var max = 300;
            if (end > max) {
                end = max;
            }
            var time = (max - end) / 50;
            if (_this.isMore) {
                _this.end = _this.more + (_this.endY - _this.startY) * time;
                if (_this.end > _this.min) {
                    _this.end = _this.min + 60;
                }
                if (_this.end < _this.max) {
                    _this.end = _this.max - 60;
                }
            }
            _this.setEnd();
        };
        _this.state = {
            index: 0,
            iPhone: false,
            transition: ''
        };
        return _this;
    }
    List.prototype.componentDidMount = function () {
        this.touch('addEventListener');
        var o = window.navigator.platform.toLowerCase();
        var ua = window.navigator.userAgent.toLowerCase();
        var iPhone = (ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1 || ua.indexOf('ipod') > -1) && (o.indexOf('iphone') > -1 || o.indexOf('ipad') > -1 || o.indexOf('ipod') > -1);
        this.setState({
            iPhone: iPhone
        });
    };
    List.prototype.componentWillUnmount = function () {
        this.touch('removeEventListener');
    };
    List.prototype.render = function () {
        var _this = this;
        var transform = "perspective(1000px) rotateY(0) rotateX(" + this.state.index * this.rotateX + "deg)";
        var style = { WebkitTransform: transform, transform: transform };
        var transformOrigin = "center center 90px";
        var iPhone = this.state.iPhone ? { WebkitTransformOrigin: transformOrigin, transformOrigin: transformOrigin } : {};
        return (React.createElement("div", { className: "sq-select-list" },
            React.createElement("div", { className: "sq-select-list-items", style: __assign({}, style, iPhone, { transition: this.state.transition }) }, this.props.data.map(function (item, index) {
                return _this.renderView(item, index);
            })),
            React.createElement("div", { className: "sq-select-active brt brb" }),
            React.createElement("div", { ref: function (e) { return _this.refSelectList = e; }, className: "sq-select-mask-content" })));
    };
    return List;
}(React.Component));
exports["default"] = List;

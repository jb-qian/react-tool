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
 * @LastEditTime: 2019-03-19 11:37:14
 */
var React = require("react");
var styles = require("../../less/select.less");
var border = require("../../less/border.less");
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List(props) {
        var _this = _super.call(this, props) || this;
        // 转轮高度
        _this.height = 40;
        // 转轮距离
        _this.rotateX = 22;
        // 转轮最小值
        _this.min = 0;
        // 转轮最大值
        _this.max = 0;
        // 触摸值
        _this.start = 0;
        _this.move = 0;
        _this.end = 0;
        // 开始、结束的位置
        _this.startY = 0;
        _this.endY = 0;
        // 是否移动了
        _this.isMore = false;
        // 是否结束了
        _this.isInertial = false;
        _this.onChange = function (item) {
            _this.props.onChange(item);
        };
        _this.renderView = function (item, index) {
            var newIndex = Math.abs(index - Math.round(_this.state.currentMove / _this.rotateX));
            var opacity = 1 - (newIndex / 10 * 2.5);
            var transform = "translateZ(89px) rotateX(-" + index * _this.rotateX + "deg)";
            var WebkitTransform = transform;
            var transformOrigin = "center center -89px";
            var WebkitTransformOrigin = transformOrigin;
            if (opacity < 0) {
                opacity = 0;
            }
            var style = { opacity: opacity, WebkitTransform: WebkitTransform, WebkitTransformOrigin: WebkitTransformOrigin, transformOrigin: transformOrigin, transform: transform, color: '#333' };
            if (style.opacity !== 0) {
                if (style.opacity !== 1) {
                    style.color = '#999';
                }
                return (React.createElement("div", { style: style, className: styles.listItem, key: "select-data-" + index }, item.text));
            }
            return '';
        };
        _this.init = function (data) {
            // 触摸值
            _this.start = 0;
            _this.move = 0;
            _this.end = 0;
            // 是否移动了
            _this.isMore = false;
            // 是否结束了
            _this.isInertial = false;
            // 设置初始化state
            _this.setState({
                data: data,
                currentMove: 0,
                transition: ''
            });
            _this.onChange(_this.props.data[0]);
        };
        _this.touch = function (type) {
            var list = _this.refSelectList;
            if (list) {
                list[type]('touchstart', _this.onTouchStart);
                list[type]('touchmove', _this.onTouchMove);
                list[type]('touchend', _this.onTouchEnd);
            }
        };
        _this.setTransform = function (currentMove, transition) {
            _this.setState({
                currentMove: currentMove,
                transition: transition
            });
        };
        _this.onTouchStart = function (e) {
            e.preventDefault();
            e.stopPropagation();
            var pageY = e.targetTouches[0].pageY;
            _this.start = pageY;
            _this.startY = pageY;
            _this.isMore = false;
            _this.startTime = +new Date();
            _this.isInertial = false;
        };
        _this.onTouchMove = function (e) {
            e.preventDefault();
            e.stopPropagation();
            var pageY = e.targetTouches[0].pageY;
            _this.move = _this.start - pageY + _this.end;
            if (_this.move < _this.min - _this.rotateX * 2) {
                _this.move = _this.min - _this.rotateX * 2;
            }
            if (_this.move > _this.max + _this.rotateX * 2) {
                _this.move = _this.max + _this.rotateX * 2;
            }
            _this.setTransform(_this.move, '');
            _this.isMore = true;
            _this.isInertial = false;
            _this.endY = pageY;
        };
        _this.setEnd = function (start, position, end) {
            if (end === void 0) { end = 0; }
            var t = 1000 / 60;
            // 加速度
            var a = -0.003;
            // 未结束
            if (start - end > 0 && !_this.isInertial) {
                _this.isInertial = false;
                // v末 = v初 + at
                var newStart_1 = start + a * t;
                // S = vt + 1/2at^2;
                _this.move = (position * start * t) + (0.5 * a * t * t) + _this.move;
                if (_this.move < _this.min - _this.rotateX * 2) {
                    _this.move = _this.min - _this.rotateX * 2;
                    _this.isInertial = true;
                }
                if (_this.move > _this.max + _this.rotateX * 2) {
                    _this.move = _this.max + _this.rotateX * 2;
                    _this.isInertial = true;
                }
                _this.setTransform(_this.move, '');
                requestAnimationFrame(function () {
                    _this.setEnd(newStart_1, position, end);
                });
            }
            else {
                _this.isInertial = false;
                // 结束
                if (_this.move < _this.min) {
                    _this.move = _this.min;
                }
                if (_this.move > _this.max) {
                    _this.move = _this.max;
                }
                var index = Math.round(_this.move / _this.rotateX);
                _this.setTransform(index * _this.rotateX, "transform 300ms ease-out 0s");
                _this.end = _this.move;
                _this.props.onChange(_this.state.data[index]);
            }
        };
        _this.onTouchEnd = function (e) {
            e.preventDefault();
            e.stopPropagation();
            _this.endTime = +new Date();
            var distance = _this.startY - _this.endY;
            var end = _this.endTime - _this.startTime;
            // 速度 v = s / t
            var speed = distance / end;
            var absSpeed = Math.abs(speed);
            var position = absSpeed / speed;
            // 没有滑动
            if (!_this.isMore) {
                absSpeed = 0;
            }
            _this.setEnd(absSpeed, position, 0);
        };
        _this.state = {
            currentMove: 0,
            transition: '',
            data: _this.props.data
        };
        // 获取设备
        var o = window.navigator.platform.toLowerCase();
        var ua = window.navigator.userAgent.toLowerCase();
        _this.iPhone = (ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1 || ua.indexOf('ipod') > -1) && (o.indexOf('iphone') > -1 || o.indexOf('ipad') > -1 || o.indexOf('ipod') > -1);
        return _this;
    }
    List.prototype.componentDidMount = function () {
        if (this.state.data.length) {
            this.init(this.state.data);
        }
        this.touch('addEventListener');
    };
    List.prototype.componentDidUpdate = function () {
        this.max = (this.state.data.length - 1) * this.rotateX;
        if (this.props.data.length !== this.state.data.length) {
            this.init(this.props.data);
        }
        else {
            var len = this.props.data.length;
            for (var i = 0; i < len; i++) {
                if (this.props.data[i].value !== this.state.data[i].value) {
                    return this.init(this.props.data);
                }
            }
        }
    };
    List.prototype.componentWillUnmount = function () {
        this.touch('removeEventListener');
    };
    List.prototype.render = function () {
        var _this = this;
        var transform = "perspective(1000px) rotateY(0) rotateX(" + this.state.currentMove + "deg)";
        var style = { WebkitTransform: transform, transform: transform };
        var transformOrigin = "center center 89px";
        var iPhone = this.iPhone ? { WebkitTransformOrigin: transformOrigin, transformOrigin: transformOrigin } : {};
        return (React.createElement("div", { className: styles.list },
            React.createElement("div", { className: styles.listItems, style: __assign({}, style, iPhone, { transition: this.state.transition }) }, this.state.data.map(function (item, index) {
                return _this.renderView(item, index);
            })),
            React.createElement("div", { className: [styles.active, border.brt, border.brb].join(' ') }),
            React.createElement("div", { ref: function (e) { return _this.refSelectList = e; }, className: styles.maskContent })));
    };
    return List;
}(React.Component));
exports["default"] = List;

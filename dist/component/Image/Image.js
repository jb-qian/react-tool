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
 * @Date: 2019-01-17 15:03:47
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-03-20 09:48:49
 */
var React = require("react");
var styles = require("../../less/image.module.less");
var MyImage = /** @class */ (function (_super) {
    __extends(MyImage, _super);
    function MyImage(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            style: {},
            src: _this.props.defaultSrc || ''
        };
        return _this;
    }
    MyImage.prototype.componentDidMount = function () {
        var _this = this;
        var src = this.props.src;
        var box = this.image || {};
        var image = new Image();
        image.src = src;
        image.onload = function () {
            var width = image.width, height = image.height;
            var offsetWidth = box.offsetWidth, offsetHeight = box.offsetHeight;
            var imgSize = width / height;
            var boxSize = offsetWidth / offsetHeight;
            // 通过比例算出 需要设置的宽高
            var style = {};
            if (imgSize > boxSize) {
                width = -((offsetHeight / height) * width) / 2;
                style = {
                    top: '0',
                    left: '50%',
                    width: 'auto',
                    height: '100%',
                    marginLeft: width + "px"
                };
            }
            else {
                height = -((offsetWidth / width) * height) / 2;
                style = {
                    left: '0',
                    top: '50%',
                    width: '100%',
                    height: 'auto',
                    marginTop: height + "px"
                };
            }
            _this.setState({
                style: style,
                src: src
            });
            _this.props.onSuccess && _this.props.onSuccess();
        };
        image.onerror = function (e) {
            _this.props.onError && _this.props.onError(e);
        };
    };
    MyImage.prototype.render = function () {
        var _this = this;
        var className = [styles.imageBox, this.props.className].filter(function (item) { return item; });
        return (React.createElement("div", { ref: function (e) { return _this.image = e; }, className: className.join(' ') },
            React.createElement("img", { className: styles.image, style: this.state.style, src: this.state.src, alt: this.props.alt })));
    };
    return MyImage;
}(React.Component));
exports["default"] = MyImage;

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
            if (imgSize > boxSize) {
                width = -((offsetHeight / height) * width) / 2;
                _this.setState({
                    style: {
                        top: '0',
                        left: '50%',
                        width: 'auto',
                        height: '100%',
                        marginLeft: width + "px"
                    },
                    src: src
                });
            }
            else {
                height = -((offsetWidth / width) * height) / 2;
                _this.setState({
                    style: {
                        left: '0',
                        top: '50%',
                        width: '100%',
                        height: 'auto',
                        marginTop: height + "px"
                    },
                    src: src
                });
            }
            _this.props.onSuccess && _this.props.onSuccess();
        };
        image.onerror = function (e) {
            _this.props.onError && _this.props.onError(e);
        };
    };
    MyImage.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { ref: function (e) { return _this.image = e; }, className: "sq-image-box " + (this.props.className || '') },
            React.createElement("img", { className: "sq-image", style: this.state.style, src: this.state.src, alt: this.props.alt })));
    };
    return MyImage;
}(React.Component));
exports["default"] = MyImage;

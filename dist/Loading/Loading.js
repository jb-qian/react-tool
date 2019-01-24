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
 * @Date: 2019-01-18 16:38:49
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-01-24 15:42:12
 */
var React = require("react");
var Loading = /** @class */ (function (_super) {
    __extends(Loading, _super);
    function Loading(props) {
        return _super.call(this, props) || this;
    }
    Loading.prototype.render = function () {
        if (this.props.loading) {
            return (React.createElement("div", { className: "sq-loading" },
                React.createElement("div", { className: "sq-loading-box" },
                    React.createElement("div", { className: "sq-loading-icon" }, "icon"),
                    React.createElement("div", { className: "sq-loading-text" }, this.props.text || '加载中'))));
        }
        return (React.createElement("div", { style: { display: 'none' } }, "loading"));
    };
    return Loading;
}(React.Component));
exports["default"] = Loading;

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
var ReactDOM = require("react-dom");
var Element_1 = require("./Element");
var createElement = function (props) {
    var div = document.createElement('div');
    div.className = 'sq-select';
    document.body.appendChild(div);
    var element = React.createElement(Element_1["default"], Object.assign(props, {
        willUnmount: function () {
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
        }
    }));
    ReactDOM.render(element, div);
};
var Select = /** @class */ (function (_super) {
    __extends(Select, _super);
    function Select(props) {
        var _this = _super.call(this, props) || this;
        _this.click = function () {
            createElement({
                data: _this.props.data,
                setValue: _this.setValue
            });
        };
        _this.setValue = function (item) {
            _this.setState({
                text: item.text,
                value: item.value
            });
            _this.props.onChange && _this.props.onChange(item);
        };
        _this.onChange = function (e) {
            // 用不到
            console.log(e);
        };
        var _a = _this.props.defaultValue || _this.props.data[0], value = _a.value, text = _a.text;
        _this.state = {
            value: value,
            text: text
        };
        return _this;
    }
    Select.prototype.render = function () {
        var defaultValue = (this.props.defaultValue || this.props.data[0]).value;
        var className = [this.props.className, defaultValue === this.state.value ? 'default' : ''].filter(function (item) { return item; });
        return (React.createElement("div", { className: "" + className.join(' '), onClick: this.click },
            React.createElement("select", { style: { display: 'none' }, name: this.props.name, value: this.state.value, onChange: this.onChange }, this.props.data.map(function (item, index) {
                return (React.createElement("option", { key: "select-" + index, value: item.value }, item.text));
            })),
            this.state.text));
    };
    return Select;
}(React.Component));
exports["default"] = Select;

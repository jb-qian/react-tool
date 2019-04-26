/*
 * @Author: 宋乾
 * @Date: 2019-01-25 11:28:30
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-04-26 16:19:22
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as styles from '../../less/select.module.less.js';
import Element from './Element';
const createElement = (props) => {
    const div = document.createElement('div');
    div.className = styles.select;
    document.body.appendChild(div);
    const element = React.createElement(Element, Object.assign(props, {
        willUnmount: () => {
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
        }
    }));
    ReactDOM.render(element, div);
};
export default class Select extends React.Component {
    constructor(props) {
        super(props);
        // 默认数据
        this.defaultValue = { value: '', text: '' };
        this.click = () => {
            return createElement({
                data: this.props.data,
                setValue: this.setValue,
                length: this.props.length || 1,
                type: this.props.type || '',
            });
        };
        this.setValue = (data, isConfirm) => {
            // 点击确定按钮
            if (isConfirm) {
                this.props.onConfirm && this.props.onConfirm(data);
                let text = [];
                let value = [];
                data.map((item) => {
                    text.push(item.text);
                    value.push(item.value);
                });
                let textJoin = ' ';
                let valueJoin = ',';
                if (this.props.type === 'date') {
                    textJoin = '-';
                    valueJoin = '-';
                }
                this.setState({
                    text: text.join(textJoin),
                    value: value.join(valueJoin),
                });
            }
            else {
                this.props.onChange && this.props.onChange(data);
            }
        };
        this.onChange = (e) => {
            // 用不到
            // console.log(e);
        };
        this.defaultValue.text = this.props.placeholder || '请选择';
        let { value, text } = this.props.defaultValue || this.defaultValue;
        this.state = {
            value,
            text,
        };
    }
    render() {
        let defaultValue = !(this.props.defaultValue || this.defaultValue).value && !this.state.value;
        let className = [this.props.className, defaultValue ? styles.defaultValue : ''].filter(item => item);
        return (React.createElement("div", { className: className.join(' '), onClick: this.click },
            React.createElement("select", { style: { display: 'none' }, name: this.props.name, "data-error": this.props.error, "data-value": this.state.value, onChange: this.onChange }),
            this.state.text));
    }
}

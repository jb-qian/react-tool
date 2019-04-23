/*
 * @Author: 宋乾
 * @Date: 2019-01-24 15:46:24
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-04-15 23:29:18
 */
import * as React from 'react';
export default class Input extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = (event) => {
            let value = event.currentTarget.value;
            this.props.onChange && this.props.onChange(value);
        };
        this.onInput = (event) => {
            let value = event.currentTarget.value;
            this.props.onInput && this.props.onInput(value);
        };
    }
    render() {
        let type = {
            type: this.props.type,
            maxLength: this.props.maxLength || undefined,
            name: this.props.name,
            className: this.props.className,
            style: this.props.style,
            onInput: this.onInput,
            onChange: this.onChange,
            placeholder: this.props.placeholder,
            'data-error': this.props.error,
        };
        if (this.props.type === 'mobile') {
            type.type = 'tel';
            type.maxLength = 11;
            type.placeholder = type.placeholder || '请输入手机号';
            type['data-type'] = 'mobile';
        }
        return (this.props.type === 'textarea' ?
            React.createElement("textarea", Object.assign({}, type)) :
            React.createElement("input", Object.assign({}, type)));
    }
}

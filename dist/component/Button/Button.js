/*
 * @Author: 宋乾
 * @Date: 2019-01-10 11:08:12
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-03-20 09:48:46
 */
import * as React from 'react';
import * as styles from '../../less/button.module.less.js';
export default class Button extends React.Component {
    constructor(props) {
        super(props);
        this.click = () => {
            if (this.props.disabled) {
                return;
            }
            if (this.props.onClick) {
                this.props.onClick();
            }
        };
    }
    render() {
        return (React.createElement("button", { type: this.props.type, style: this.props.style, disabled: this.props.disabled, className: [styles.button, this.props.className || '', this.props.disabled ? styles.disabled : ''].join(' '), onClick: this.click }, this.props.children));
    }
}

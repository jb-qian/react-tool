/*
 * @Author: 宋乾
 * @Date: 2019-01-10 13:44:28
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-03-20 09:48:40
 */
import * as React from 'react';
import * as styles from '../../less/alert.module.less.js';
import * as border from '../../less/border.module.less.js';
export default class Element extends React.Component {
    constructor(props) {
        super(props);
        /**
         * 取消事件
         */
        this.default = () => {
            this.clone();
            this.props.default && this.props.default();
        };
        /**
         * 确定事件
         */
        this.primary = () => {
            this.clone();
            this.props.primary && this.props.primary();
        };
        /**
         * 关闭
         */
        this.clone = () => {
            this.confirm.addEventListener('transitionend', this.transitionend);
            this.setState({
                className: '',
            });
        };
        /**
         * 动画结束
         */
        this.transitionend = () => {
            this.confirm.removeEventListener('transitionend', this.transitionend);
            this.props.willUnmount();
        };
        this.state = {
            className: '',
        };
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                className: styles.active,
            });
        }, 0);
    }
    render() {
        return (React.createElement("div", { ref: e => this.confirm = e, className: [styles.confirm, this.state.className].join(' ') },
            React.createElement("div", { className: styles.content },
                this.props.title ? React.createElement("div", { className: styles.title }, this.props.title) : null,
                this.props.subtitle ? React.createElement("div", { className: styles.subtitle }, this.props.subtitle) : null),
            React.createElement("div", { className: [styles.btnsContent, border.brt].join(' ') },
                !this.props.noDefault ? React.createElement("div", { className: [styles.btn, border.brr].join(' '), onClick: this.default }, "\u53D6\u6D88") : null,
                !this.props.noPrimary ? React.createElement("div", { className: styles.btn, onClick: this.primary }, "\u786E\u5B9A") : null)));
    }
}

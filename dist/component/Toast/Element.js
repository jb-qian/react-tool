/*
 * @Author: 宋乾
 * @Date: 2019-01-10 10:50:18
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-03-20 09:49:21
 */
import * as React from 'react';
import * as styles from '../../less/toast.module.less.js';
export default class Element extends React.Component {
    constructor(props) {
        super(props);
        /**
         * 动画结束
         */
        this.transitionend = () => {
            this.toast.removeEventListener('transitionend', this.transitionend);
            this.props.willUnmount();
        };
        this.state = {
            duration: this.props.duration || 3000,
            show: true,
        };
    }
    componentDidMount() {
        this.toast.addEventListener('transitionend', this.transitionend);
        // 时间大于0 自动隐藏
        if (this.state.duration > 0) {
            setTimeout(() => {
                this.setState({
                    show: false,
                });
            }, this.state.duration);
        }
    }
    render() {
        return (React.createElement("div", { ref: e => this.toast = e, className: [styles.toast, this.state.show ? '' : styles.hide].join(' ') },
            React.createElement("div", { className: styles.text }, this.props.text)));
    }
}

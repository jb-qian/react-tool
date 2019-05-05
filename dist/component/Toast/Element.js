/*
 * @Author: 宋乾
 * @Date: 2019-01-10 10:50:18
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-05-05 13:46:08
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
            show: true,
        };
    }
    componentDidMount() {
        this.toast.addEventListener('transitionend', this.transitionend);
        setTimeout(() => {
            this.setState({ show: false });
        }, this.props.duration || 3000);
    }
    componentWillUnmount() {
        this.toast.removeEventListener('transitionend', this.transitionend);
    }
    render() {
        return (React.createElement("div", { ref: e => this.toast = e, className: [styles.toast, this.state.show ? '' : styles.hide].join(' ') },
            React.createElement("div", { className: styles.text }, this.props.text)));
    }
}

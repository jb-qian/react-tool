/*
 * @Author: 宋乾
 * @Date: 2019-01-18 16:38:49
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-03-20 09:48:55
 */
import * as React from 'react';
import * as styles from '../../less/loading.module.less.js';
export default class Loading extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.loading) {
            return (React.createElement("div", { className: styles.loading },
                React.createElement("div", { className: styles.box },
                    React.createElement("div", { className: styles.icon }),
                    React.createElement("div", { className: styles.text }, this.props.text || '加载中'))));
        }
        return (React.createElement("div", { style: { display: 'none' } }));
    }
}

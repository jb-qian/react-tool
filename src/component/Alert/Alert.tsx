/*
 * @Author: 宋乾
 * @Date: 2019-01-10 13:49:29
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-03-19 12:05:55
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as styles from '../../less/alert.less';

import Element from './Element';

/**
 * @param default 点击取消时调用
 * @param primary 点击确定时调用
 * @param title 提示标题
 * @param subtitle 提示内容
 * @param noDefault 设置没有取消按钮
 * @param noPrimary 设置没有确定按钮
 */

export interface Props {
    default?: () => void;
    primary?: () => void;
    title: string;
    subtitle?: string;
    noDefault?: boolean;
    noPrimary?: boolean;
}

const App = (props:Props) => {
    // 创建一个元素
    const div = document.createElement('div');
    // 添加专属样式
    div.className = styles.alert;
    // 添加到页面内
    document.body.appendChild(div);
    // 加入到dom中
    const element = React.createElement(Element, Object.assign(props, {
        // 结束后销毁方法
        willUnmount: () => {
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
        }
    }));
    ReactDOM.render(element, div);
}

export default App;
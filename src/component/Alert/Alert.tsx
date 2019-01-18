/*
 * @Author: 宋乾
 * @Date: 2019-01-10 13:49:29
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-01-18 15:44:03
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Element from './Element';

/**
 * @param
 * default 点击取消时调用
 * primary 点击确定时调用
 * title 提示标题
 * subtitle 提示内容
 * noDefault 设置没有取消按钮
 * noPrimary 设置没有确定按钮
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
    div.className = 'sq-alert';
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
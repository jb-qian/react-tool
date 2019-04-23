/*
 * @Author: 宋乾
 * @Date: 2019-01-10 13:49:29
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-03-27 23:00:58
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as styles from '../../less/alert.module.less.js';
import Element from './Element';
const App = (props) => {
    // 创建一个元素
    const div = document.createElement('div');
    // 添加专属样式
    div.className = styles.alert;
    // 添加到页面内
    document.body.appendChild(div);
    // 绑定事件
    div.addEventListener('touchmove', e => {
        e.preventDefault();
        e.stopPropagation();
    });
    // 加入到dom中
    const element = React.createElement(Element, Object.assign(props, {
        // 结束后销毁方法
        willUnmount: () => {
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
            div.removeEventListener('touchmove', e => {
                e.preventDefault();
                e.stopPropagation();
            });
        }
    }));
    ReactDOM.render(element, div);
};
export default App;

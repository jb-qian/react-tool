/*
 * @Author: 宋乾
 * @Date: 2019-01-10 09:15:22
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-02-15 16:25:45
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Element from './Element';

/**
 * @param
 * duration 时间
 * text 文字
 */

export interface Props {
    duration?: number;
    text: string;
}

const App = (props: Props) => {
    const div = document.createElement('div');

    document.body.appendChild(div);

    const element = React.createElement(Element, Object.assign(props, {
        willUnmount: () => {
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
        }
    }));

    ReactDOM.render(element, div);
}

export default App;
/*
 * @Author: 宋乾
 * @Date: 2019-01-10 09:15:22
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-03-19 11:24:09
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Element from './Element';

/**
 * @param duration 停留时间
 * @param text 文字
 */

export interface Props {
    duration?: number;
    text: string;
}

const App = (props: Props) => {
    let div: any = document.getElementById('sq-toast');

    if (!div) {
        div = document.createElement('div');
        div.id = 'sq-toast';
        document.body.appendChild(div);
    }

    const element = React.createElement(Element, Object.assign(props, {
        willUnmount: () => {
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
        }
    }));

    ReactDOM.render(element, div);
}

export default App;
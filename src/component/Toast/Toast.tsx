import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Element from './Element';

interface Props {
    duration: number;
    text: string;
}

const App = (props:Props) => {
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
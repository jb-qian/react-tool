import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Element from './Element';

export interface Props {
    default?: () => void;
    title: string;
    subtitle?: string;
    noDefault?: boolean;
    noPrimary?: boolean;
    primary?: () => void;
}

const App = (props:Props) => {
    const div = document.createElement('div');

    div.className = 'sq-alert';

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
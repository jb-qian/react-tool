import * as React from 'react';

import { Props, Value } from './Select';
import List from './List';

interface SelectProps extends Props {
    willUnmount: () => void;
}

interface State {
    active: boolean;
}

export default class Element extends React.Component<SelectProps, State> {
    constructor(props: SelectProps) {
        super(props)
        this.state = {
            active: false,
        }
    }
    public onClose = () => {
        this.props.willUnmount();
    }
    public onClick = (item: Value) => {
        this.props.setValue(item);
        this.props.willUnmount();
    }
    // public componentDidMount (){

    // }
    public render(){
        return (
            <div className={ `sq-select` }>
                <div className={ `sq-select-mask` } onClick={ this.onClose } />
                <div className={ `sq-select-box` }>
                    <List onClick={ this.onClick } data={ this.props.data } />
                </div>
            </div>
        )
    }
}
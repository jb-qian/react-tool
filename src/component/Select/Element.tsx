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

    public refSelectMask:HTMLDivElement | null;

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
    public onChange = (item: Value) => {
        this.props.setValue(item);
    }
    public touch = (type: string) => {
        let mask = this.refSelectMask;
        if (mask) {
            mask[type]('touchstart', this.maskTouchStart);
        }
    }
    public maskTouchStart = (e: any) => {
        e.preventDefault();
    }
    public componentDidMount (){
        this.touch('addEventListener');
    }
    public componentWillUnmount (){
        this.touch('removeEventListener');
    }
    public render(){
        return (
            <div className={ `sq-select` }>
                <div ref={ e => this.refSelectMask = e } className={ `sq-select-mask` } onClick={ this.onClose } />
                <div className={ `sq-select-box` }>
                    <List onChange={ this.onChange } data={ this.props.data } />
                </div>
            </div>
        )
    }
}
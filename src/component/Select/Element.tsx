import * as React from 'react';

import { Props, Value } from './Select';
import List from './List';

interface SelectProps extends Props {
    willUnmount: () => void;
}

interface State {
    active: boolean;
    data: Value[][];
    value: Value[];
}

export default class Element extends React.Component<SelectProps, State> {

    public refSelectMask:HTMLDivElement | null;

    public timer: NodeJS.Timeout;

    constructor(props: SelectProps) {
        super(props)
        this.state = {
            active: false,
            data: [
                this.props.data
            ],
            value: [],
        }
    }
    public onClose = () => {
        this.props.willUnmount();
    }
    public onChange = (index: number, item: Value = { value: '', text: '' }) => {
        this.setState(prev => {
            let value = [...prev.value];
            value[index] = item;
            return {
                value,
            }
        })
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.props.setValue(this.state.value);
        }, 10);
        this.setState(prev => {
            let data = [...prev.data];
            data[index + 1] = item.children || [];
            return {
                data,
            }
        })
    }
    public touch = (type: string) => {
        let mask = this.refSelectMask;
        if (mask) {
            mask[type]('touchstart', this.maskTouchStart);
            mask[type]('touchend', this.maskTouchEnd);
        }
    }
    public maskTouchStart = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
    }
    public maskTouchEnd = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        this.onClose();
    }
    public componentDidMount (){
        this.touch('addEventListener');
    }
    public componentWillUnmount (){
        this.touch('removeEventListener');
    }
    public listView (){
        let arr = [];
        let length = Number(this.props.length);
        for (let i = 0; i < length; i++) {
            let data = this.state.data[i] || [];
            arr.push(<List key={ `sq-list-${i}` } onChange={ this.onChange.bind(this, i) } data={ data } />);
        }
        return arr;
    }
    public render(){
        return (
            <div className={ `sq-select` }>
                <div ref={ e => this.refSelectMask = e } className={ `sq-select-mask` } />
                <div className={ `sq-select-box` }>
                    {
                        this.listView().map((item, index) => {
                            return item;
                        })
                    }
                </div>
            </div>
        )
    }
}
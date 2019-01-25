import * as React from 'react';

import { Value } from './Select';

interface ListProps {
    onClick: (item: Value) => void;
    data: Value[];
}
interface State{
    index: number,
}

export default class List extends React.Component<ListProps, State> {

    public start: number;
    public more: number;
    public end: number;

    constructor(props: ListProps) {
        super(props)
        this.state = {
            index: 0,
        }
    }
    public onClick = (item: Value) => {
        this.props.onClick(item);
    }
    public renderView = (item: Value, index: number) => {
        let newIndex = Math.abs(index - this.state.index);
        let opacity = 1 - (newIndex / 10 * 2.5);
        let transform = `translateZ(89.5px) rotateX(-${index * 20}deg)`;
        let transformOrigin = `center center -89.5px`;
        if (opacity < 0) {
            opacity = 0;
        }
        let style = { opacity, transform, transformOrigin };
        return (
            <div style={style} className={ `sq-select-list-item` } key={ `select-data-${index}` } onClick={ this.onClick.bind(this, item) }>{ item.text }</div>
        )
    }
    // public componentDidMount (){
        
    // }
    public onTouchStart = (e: any) => {
        e.preventDefault();
        let { pageY } = e.nativeEvent.targetTouches[0];
        this.start = pageY;
    }
    public onTouchMove = (e: any) => {
        e.preventDefault();
        let { pageY } = e.nativeEvent.targetTouches[0];
        this.more = pageY - this.start + (this.end || 0);
        this.setState({
            index: -(this.more / 36)
        })
    }
    public onTouchEnd = () => {
        this.end = this.more;
    }
    public render(){
        return (
            <div className={ `sq-select-list` } onTouchStart={ this.onTouchStart } onTouchMove={ this.onTouchMove } onTouchEnd={ this.onTouchEnd }>
                <div className={ `sq-select-list-items` } style={{ transform: `perspective(1000px) rotateY(0deg) rotateX(${this.state.index * 20}deg)` }}>
                    {
                        this.props.data.map((item, index) => {
                            return this.renderView(item, index);
                        })
                    }
                </div>
            </div>
        )
    }
}
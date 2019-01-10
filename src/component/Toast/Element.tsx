import * as React from 'react';

import './toast.less';

interface Props {
    duration: number;
    text: string;
    willUnmount: () => void;
}
interface State{
    show: boolean;
    duration: number;
}

export default class Element extends React.Component<Props, State> {

    public refs:any;
    public toast:any;

    constructor (props:Props){
        super(props)
        this.state = {
            duration: this.props.duration || 3000,
            show: true,
        }
    }
    /**
     * 动画结束
     */
    public transitionend = () => {
        this.toast.removeEventListener('transitionend', this.transitionend);
        this.props.willUnmount();
    }
    public componentDidMount (){
        this.toast.addEventListener('transitionend', this.transitionend);
        if (this.state.duration > 0) {
            setTimeout(() => {
                this.setState({
                    show: false,
                })
            }, this.state.duration);
        }
    }
    public render (){
        return (
            <div ref={ e => this.toast = e } className={ `sq-toast ${this.state.show ? '' : 'hide'}` }>
                <div className="sq-text">{ this.props.text }</div>
            </div>
        )
    }
}

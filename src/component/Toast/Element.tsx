/*
 * @Author: 宋乾
 * @Date: 2019-01-10 10:50:18
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-05-05 13:46:08
 */
import * as React from 'react';

import { Props } from './Toast';
import * as styles from '../../less/toast.module.less';

interface ToastProps extends Props {
    willUnmount: () => void;
}
interface State{
    show: boolean;
}

export default class Element extends React.Component<ToastProps, State> {

    public toast:any;

    constructor (props:ToastProps){
        super(props)
        this.state = {
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
        setTimeout(() => {
            this.setState({ show: false })
        }, this.props.duration || 3000);
    }
    public componentWillUnmount (){
        this.toast.removeEventListener('transitionend', this.transitionend);
    }
    public render (){
        return (
            <div ref={ e => this.toast = e } className={ [styles.toast, this.state.show ? '' : styles.hide].join(' ') }>
                <div className={ styles.text }>{ this.props.text }</div>
            </div>
        )
    }
}

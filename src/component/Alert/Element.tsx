/*
 * @Author: 宋乾
 * @Date: 2019-01-10 13:44:28
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-01-18 15:40:45
 */
import * as React from 'react';

import { Props } from './Alert';

interface AlertProps extends Props {
    willUnmount: () => void;
}

interface State {
    name?: string;
    className: string;
}

export default class Element extends React.Component<AlertProps, State>{

    public confirm:any;

    constructor(props: AlertProps){
        super(props)
        this.state = {
            className: '',
        }
    }
    /**
     * 取消事件
     */
    public default = () => {
        this.clone();
        this.props.default && this.props.default();
    }
    /**
     * 确定事件
     */
    public primary = () => {
        this.clone();
        this.props.primary && this.props.primary();
    }
    /**
     * 关闭
     */
    public clone = () => {
        this.confirm.addEventListener('transitionend', this.transitionend);
        this.setState({
            className: '',
        })
    }
    /**
     * 动画结束
     */
    public transitionend = () => {
        this.confirm.removeEventListener('transitionend', this.transitionend);
        this.props.willUnmount();
    }
    public componentDidMount (){
        setTimeout(() => {
            this.setState({
                className: 'active',
            })
        }, 0);
    }
    public render (){
        return (
            <div ref={ e => this.confirm = e } className={ `sq-confirm ${this.state.className}` }>
                <div className="sq-content">
                    {
                        this.props.title ? <div className="sq-title">{ this.props.title }</div> : ''
                    }
                    {
                        this.props.subtitle ? <div className="sq-subtitle">{ this.props.subtitle }</div> : ''
                    }
                </div>
                <div className="sq-btns-content brt">
                {
                    !this.props.noDefault ? <div className="sq-btn brr" onClick={ this.default }>取消</div> : ''
                }
                {
                    !this.props.noPrimary ? <div className="sq-btn" onClick={ this.primary }>确定</div> : ''
                }
                </div>
            </div>
        )
    }
}
/*
 * @Author: 宋乾
 * @Date: 2019-01-10 13:44:28
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-05-08 16:12:10
 */
import * as React from 'react';

import { Props } from './Alert';
import * as styles from '../../less/alert.module.less';
import * as border from '../../less/border.module.less';

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
                className: styles.active,
            })
        }, 0);
    }
    public render (){
        return (
            <div ref={ e => this.confirm = e } className={ [styles.confirm, this.state.className].join(' ') }>
                <div className={ styles.content }>
                    {
                        this.props.title ? <div className={ styles.title }>{ this.props.title }</div> : null
                    }
                    {
                        this.props.subtitle ? <div className={ styles.subtitle }>{ this.props.subtitle }</div> : null
                    }
                </div>
                <div className={ [styles.btnsContent, border.brt].join(' ') }>
                {
                    !this.props.noDefault ? <div className={ [styles.btn, border.brr].join(' ') } onClick={ this.default }>取消</div> : null
                }
                {
                    !this.props.noPrimary ? <div className={ styles.btn } onClick={ this.primary }>确定</div> : null
                }
                </div>
            </div>
        )
    }
}
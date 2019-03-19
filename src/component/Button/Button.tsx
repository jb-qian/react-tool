/*
 * @Author: 宋乾
 * @Date: 2019-01-10 11:08:12
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-03-19 11:59:49
 */
import * as React from 'react';
import * as styles from '../../less/button.less';

/**
 * @param disabled 是否禁止点击
 * @param onClick 点击触发
 * @param className 样式名
 * @param style style
 * @param type html的type
 */

interface Props{
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties | undefined;
    type?: string;
}

export default class Button extends React.Component<Props> {
    constructor(props: Props){
        super(props)

    }
    public click = () => {
        if (this.props.disabled) {
            return;
        }
        if (this.props.onClick) {
            this.props.onClick();
        }
    }
    public render() {
        return (
            <button
                type={ this.props.type }
                style={ this.props.style }
                disabled={ this.props.disabled }
                className={ [styles.button, this.props.className || '', this.props.disabled ? styles.disabled : ''].join(' ') }
                onClick={ this.click }
            >
                {
                    this.props.children
                }
            </button>
        )
    }
}
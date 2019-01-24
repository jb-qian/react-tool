/*
 * @Author: 宋乾
 * @Date: 2019-01-10 11:08:12
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-01-18 16:14:25
 */
import * as React from 'react';

interface Props{
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties | undefined;
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
            <div
                style={ this.props.style }
                className={ `sq-button ${this.props.className || ''} ${this.props.disabled ? 'disabled' : ''}` }
                onClick={ this.click }
            >
                {
                    this.props.children
                }
            </div>
        )
    }
}
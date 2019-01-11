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
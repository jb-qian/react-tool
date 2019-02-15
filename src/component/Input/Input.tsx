/*
 * @Author: 宋乾
 * @Date: 2019-01-24 15:46:24
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-02-15 16:21:18
 */
import * as React from 'react';

interface Props {
    type?: string | undefined;
    maxLength?: number | undefined;
    name: string;
    className?: string | undefined;
    style?: React.CSSProperties | undefined;
    placeholder?: string;
    error?: string;
}

interface InputProps extends Props {
    onInput?: ((event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void) | undefined;
    onChange?: ((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void) | undefined;
}

export default class Input extends React.Component<InputProps> {
    constructor(props: InputProps) {
        super(props)
    }
    public render() {
        let type = {
            type: this.props.type,
            maxLength: this.props.maxLength || undefined,
            name: this.props.name,
            className: this.props.className,
            style: this.props.style,
            onInput: this.props.onInput,
            onChange: this.props.onChange,
            placeholder: this.props.placeholder,
            'data-error': this.props.error,
        }
        if (this.props.type === 'textarea') {
            return (
                <textarea
                    {...type}
                />
            )
        }
        return (
            <input
                {...type}
            />
        )
    }
}
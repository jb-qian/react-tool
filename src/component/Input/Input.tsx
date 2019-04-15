/*
 * @Author: 宋乾
 * @Date: 2019-01-24 15:46:24
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-04-15 23:29:18
 */
import * as React from 'react';

/**
 * @param type input 类型
 * @param maxLength 最大长度
 * @param name name值
 * @param className 样式名
 * @param style 样式
 * @param placeholder 默认值
 * @param error 错误提示，配合form使用
 * @param [key: string] 索引 定义任何属性
 */

interface Props {
    type?: string | undefined;
    maxLength?: number | undefined;
    name: string;
    className?: string | undefined;
    style?: React.CSSProperties | undefined;
    placeholder?: string;
    error?: string;
    [key: string]: any;
}

interface InputProps extends Props {
    onInput?: ((value: string) => void) | undefined;
    onChange?: ((value: string) => void) | undefined;
}

export default class Input extends React.Component<InputProps> {
    constructor(props: InputProps) {
        super(props)
    }
    public onChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let value = event.currentTarget.value;
        this.props.onChange && this.props.onChange(value);
    }
    public onInput = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let value = event.currentTarget.value;
        this.props.onInput && this.props.onInput(value);
    }
    public render() {
        let type = {
            type: this.props.type,
            maxLength: this.props.maxLength || undefined,
            name: this.props.name,
            className: this.props.className,
            style: this.props.style,
            onInput: this.onInput,
            onChange: this.onChange,
            placeholder: this.props.placeholder,
            'data-error': this.props.error,
        }
        if (this.props.type === 'mobile') {
            type.type = 'tel';
            type.maxLength = 11;
            type.placeholder = type.placeholder || '请输入手机号';
            type['data-type'] = 'mobile';
        }
        return (
            this.props.type === 'textarea' ?
            <textarea {...type} /> :
            <input {...type} />
        )
    }
}
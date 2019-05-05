/*
 * @Author: 宋乾
 * @Date: 2019-01-24 15:46:24
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-05-05 16:18:44
 */
import * as React from 'react';

import * as styles from '../../less/input.module.less';

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
            ...this.props,
            type: this.props.type,
            maxLength: this.props.maxLength || undefined,
            name: this.props.name,
            className: styles.input,
            style: {},
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
            <div style={ this.props.style } className={ this.props.className }>
                {
                    this.props.type === 'textarea' ?
                    <textarea {...type} /> :
                    <input {...type} />
                }
            </div>
        )
    }
}
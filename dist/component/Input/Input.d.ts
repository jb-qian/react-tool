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
    onInput?: ((event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void) | undefined;
    onChange?: ((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void) | undefined;
}
export default class Input extends React.Component<InputProps> {
    constructor(props: InputProps);
    render(): JSX.Element;
}
export {};

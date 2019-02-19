import * as React from 'react';
export interface Value {
    text: string;
    value: string | number;
    children?: Value[] | undefined;
}
export interface Props {
    data: Value[];
    setValue: (item: Value[], isConfirm?: boolean) => void;
    length: number;
    type: string;
}
/**
 * data 选择器数据
 * name select的name属性
 * onChange 选择器改变后触发
 * onConfirm 确认按钮触发
 * placeholder 未选择默认文案
 * defaultValue 默认选项
 * className 样式名称
 * length 选择器数量
 * type 选择器类型，可选 'date'
 * error 错误提示，配合form表单使用，如果设置此项，在form中表示必填
 */
export interface SelectProps {
    data: Value[];
    name: string;
    onChange?: (item: Value[]) => void;
    onConfirm?: (item: Value[]) => void;
    placeholder?: string;
    defaultValue?: Value;
    className?: string;
    length?: number;
    type?: string;
    error?: string;
}
interface SelectState {
    text: string;
    value: string | number;
}
export default class Select extends React.Component<SelectProps, SelectState> {
    defaultValue: {
        value: string;
        text: string;
    };
    constructor(props: SelectProps);
    click: () => void;
    setValue: (data: Value[], isConfirm: boolean) => void;
    onChange: (e: any) => void;
    render(): JSX.Element;
}
export {};

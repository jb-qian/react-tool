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
 * @param data 选择器数据
 * @param name select的name属性
 * @param onChange 选择器改变后触发
 * @param onConfirm 确认按钮触发
 * @param placeholder 未选择默认文案
 * @param defaultValue 默认选项
 * @param className 样式名称
 * @param length 选择器数量
 * @param type 选择器类型，可选 'date'
 * @param error 错误提示，配合form表单使用，如果设置此项，在form中表示必填
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

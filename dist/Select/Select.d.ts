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

import * as React from 'react';
export interface Value {
    text: string;
    value: string | number;
}
export interface Props {
    data: Value[];
    setValue: (item: object) => void;
}
interface SelectProps {
    data: Value[];
    name: string;
    onChange?: (item: Value) => void;
    defaultValue?: Value;
    className?: string;
}
interface SelectState {
    text: string;
    value: string | number;
}
export default class Select extends React.Component<SelectProps, SelectState> {
    constructor(props: SelectProps);
    click: () => void;
    setValue: (item: Value) => void;
    onChange: (e: any) => void;
    render(): JSX.Element;
}
export {};

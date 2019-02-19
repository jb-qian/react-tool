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
    constructor(props: InputProps);
    render(): JSX.Element;
}
export {};

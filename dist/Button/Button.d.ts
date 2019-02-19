import * as React from 'react';
/**
 * disabled 是否禁止点击
 * onClick 点击触发
 * className 样式名
 * style style
 * type html的type
 */
interface Props {
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties | undefined;
    type?: string;
}
export default class Button extends React.Component<Props> {
    constructor(props: Props);
    click: () => void;
    render(): JSX.Element;
}
export {};

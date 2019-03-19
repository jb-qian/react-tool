import * as React from 'react';
/**
 * @param disabled 是否禁止点击
 * @param onClick 点击触发
 * @param className 样式名
 * @param style style
 * @param type html的type
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

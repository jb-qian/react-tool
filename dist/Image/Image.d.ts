import * as React from 'react';
/**
 * @param
 * src 图片地址
 * alt 图片简介
 * className 样式名称
 * defaultSrc 默认地址，图片未load成功或失败时显示
 * onSuccess load成功后调用
 * onError load失败后显示
 */
interface Props {
    src: string;
    alt?: string;
    className?: string;
    defaultSrc?: string;
    onSuccess?: () => void;
    onError?: (e: any) => void;
}
interface State {
    style: object;
    src: string;
}
export default class MyImage extends React.Component<Props, State> {
    image: any;
    constructor(props: Props);
    componentDidMount(): void;
    render(): JSX.Element;
}
export {};

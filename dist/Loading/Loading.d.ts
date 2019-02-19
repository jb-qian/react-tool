import * as React from 'react';
/**
 * loading 状态
 * text 文字内容
 */
interface Props {
    text?: string;
    loading: boolean;
}
export default class Loading extends React.Component<Props> {
    constructor(props: Props);
    render(): JSX.Element;
}
export {};

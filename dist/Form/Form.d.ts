import * as React from 'react';
/**
 * @param
 * submit 提交表单
 */
interface Props {
    submit?: (json: object) => void;
}
export default class Form extends React.Component<Props> {
    constructor(props: Props);
    submit: (e: any) => void;
    render(): JSX.Element;
}
export {};

import * as React from 'react';
/**
 * @param submit 提交表单
 * @param toast 提示器
 * @param rules 验证规则
 */
interface Rules {
    [key: string]: (value: string) => string | undefined;
}
interface Props {
    submit?: (json: object) => void;
    toast?: any;
    rules?: Rules;
}
export default class Form extends React.Component<Props> {
    constructor(props: Props);
    submit: (e: any) => any;
    render(): JSX.Element;
}
export {};

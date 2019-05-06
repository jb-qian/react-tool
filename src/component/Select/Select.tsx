/*
 * @Author: 宋乾
 * @Date: 2019-01-25 11:28:30
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-05-06 15:59:33
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as styles from '../../less/select.module.less';

import Element from './Element';

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

const createElement = (props: Props) => {
    const div = document.createElement('div');

    div.className = styles.select;
    document.body.appendChild(div);

    const element = React.createElement(Element, Object.assign(props, {
        willUnmount: () => {
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
        }
    }));
    
    ReactDOM.render(element, div);
}

export default class Select extends React.Component<SelectProps, SelectState> {
    // 默认数据
    public defaultValue = { value: '', text: '' };

    constructor(props: SelectProps) {
        super(props)
        this.defaultValue.text = this.props.placeholder || '请选择';
        let { value, text } = this.props.defaultValue || this.defaultValue;
        this.state = {
            value,
            text,
        }
    }
    public click = () => {
        return createElement({
            data: this.props.data,
            setValue: this.setValue,
            length: this.props.length || 1,
            type: this.props.type || '',
        });
    }
    public setValue = (data: Value[], isConfirm: boolean) => {
        // 点击确定按钮
        if (isConfirm) {
            this.props.onConfirm && this.props.onConfirm(data);
            let text: string[] = [];
            let value: Array<string | number> = [];
            data.map((item) => {
                text.push(item.text);
                value.push(item.value);
            })
            let textJoin = ' ';
            let valueJoin = ',';
            if (this.props.type === 'date') {
                textJoin = '-';
                valueJoin = '-';
            }
            this.setState({
                text: text.join(textJoin),
                value: value.join(valueJoin),
            })
        }else{
            this.props.onChange && this.props.onChange(data);
        }
    }
    public onChange = () => {
        // 用不到
    }
    public render (){
        let defaultValue = !(this.props.defaultValue || this.defaultValue).value && !this.state.value;
        let className = [this.props.className, defaultValue ? styles.defaultValue : ''].filter(item => item);
        return (
            <div className={ className.join(' ') } onClick={ this.click }>
                <select style={{ display: 'none' }} name={ this.props.name } data-error={ this.props.error } data-value={ this.state.value } onChange={ this.onChange } />
                { this.state.text }
            </div>
        )
    }
}
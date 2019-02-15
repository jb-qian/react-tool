import * as React from 'react';
import * as ReactDOM from 'react-dom';

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

    div.className = 'sq-select';
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
    public onChange = (e:any) => {
        // 用不到
        console.log(e);
    }
    public render (){
        let defaultValue = !(this.props.defaultValue || this.defaultValue).value && !this.state.value;
        let className = [this.props.className, defaultValue ? 'default' : ''].filter(item => item);
        return (
            <div className={ `${className.join(' ')}` } onClick={ this.click }>
                <select style={{ display: 'none' }} name={ this.props.name } data-error={ this.props.error } data-value={ this.state.value } onChange={ this.onChange } />
                { this.state.text }
            </div>
        )
    }
}
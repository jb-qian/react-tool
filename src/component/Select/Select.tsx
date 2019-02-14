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
    setValue: (item: Value[]) => void;
    length: number;
    type: string;
}
interface SelectProps {
    data: Value[];
    name: string;
    onChange?: (item: Value[]) => void;
    defaultValue?: Value;
    className?: string;
    length?: number;
    type?: string;
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
    constructor(props: SelectProps) {
        super(props)
        let { value, text } = this.props.defaultValue || this.props.data[0];
        this.state = {
            value,
            text,
        }
    }
    public click = () => {
        let length = this.props.length || 1;
        let selectType = 'select';
        if (this.props.type) {
            let type = this.props.type.split('-');
            if (type[0] === 'cities') {
                selectType = type[0];
                if (type[1] && Number(type[1]) > 0) {
                    length = Number(type[1]);
                }else{
                    return console.error('type格式错误，例：cities-3');
                }
            }
        }
        return createElement({
            data: this.props.data,
            setValue: this.setValue,
            length,
            type: selectType,
        });
    }
    public setValue = (data: Value[]) => {
        let text: string[] = [];
        let value: Array<string | number> = [];
        data.map((item, index) => {
            text.push(item.text);
            value.push(item.value);
        })
        this.setState({
            text: text.join(' '),
            value: value.join(','),
        })
        this.props.onChange && this.props.onChange(data);
    }
    public onChange = (e:any) => {
        // 用不到
        console.log(e);
    }
    public render (){
        let defaultValue = (this.props.defaultValue || this.props.data[0]).value;
        let className = [this.props.className, defaultValue === this.state.value ? 'default' : ''].filter(item => item);
        return (
            <div className={ `${className.join(' ')}` } onClick={ this.click }>
                <select style={{ display: 'none' }} name={ this.props.name } data-value={ this.state.value } onChange={ this.onChange } />
                { this.state.text }
            </div>
        )
    }
}
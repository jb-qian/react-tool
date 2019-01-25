import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Element from './Element';

export interface Value {
    text: string;
    value: string | number;
}
export interface Props {
    data: Value[];
    setValue: (item: object) => void;
}
interface SelectProps {
    data: Value[];
    name: string;
    onChange?: (item:Value) => void;
    defaultValue?: Value;
    className?: string;
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
        createElement({
            data: this.props.data,
            setValue: this.setValue,
        });
    }
    public setValue = (item: Value) => {
        this.setState({
            text: item.text,
            value: item.value,
        })
        this.props.onChange && this.props.onChange(item);
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
                <select style={{ display: 'none' }} name={ this.props.name } value={ this.state.value } onChange={ this.onChange }>
                    {
                        this.props.data.map((item, index) => {
                            return (
                                <option
                                    key={ `select-${index}` }
                                    value={ item.value }
                                >
                                    { item.text }
                                </option>
                            )
                        })
                    }
                </select>
                { this.state.text }
            </div>
        )
    }
}
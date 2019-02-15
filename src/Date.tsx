import * as React from 'react';

import Select from './component/Select/Select';

interface Value{
	text: string;
	value: string | number;
	children?: Value[] | undefined;
}
interface Props {
    begin: number;
    end: number;
    name: string;
    onChange?: (item: Value[]) => void;
    onConfirm?: (item: Value[]) => void;
    placeholder: string;
    defaultValue?: Value;
    className?: string;
    length?: number;
    error?: string;
}
interface State {
    date: Value[];
}

export default class Date extends React.Component<Props, State> {
    constructor(props: Props){
        super(props)
        let date = [];
        let { begin, end } = this.props;
        for (let i = begin; i <= end; i++) {
            date.push({
                value: i,
                text: `${i}`,
            })
        }
        this.state = {
            date,
        }
    }
    public render (){
        return (
            <Select
                data={ this.state.date }
                length={ 3 }
                type={ 'date' }
                { ...this.props }
            />
        )
    }
}
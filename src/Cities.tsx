import * as React from 'react';

import Select from './component/Select/Select';
import cities from './static/cities';

interface Value{
	text: string;
	value: string | number;
	children?: Value[] | undefined;
}
interface Props {
    name: string;
    onChange?: (item: Value[]) => void;
    onConfirm?: (item: Value[]) => void;
    placeholder: string;
    defaultValue?: Value;
    className?: string;
    length?: number;
    type?: string;
}
interface State {
    cities: Value[];
}

export default class Cities extends React.Component<Props, State> {
    constructor(props: Props){
        super(props)
        this.state = {
            cities,
        }
    }
    public render (){
        return (
            <Select
                data={ this.state.cities }
                length={ 3 }
                { ...this.props }
            />
        )
    }
}
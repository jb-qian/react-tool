import * as React from 'react'

import ListView from '../component/ListView/ListView';
import Loading from '../component/Loading/Loading';
import Tool from '../component/Tool/Tool';

const { Mounted } = Tool;

const cell = {
    height: 100,
    borderTop: '1px solid #eee',
    fontSize: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}

type Data = string[];

interface State {
    data: Data;
    loading: boolean;
}

const ajax = () => {
    return new Promise((res) => {
        setTimeout(() => {
            res({
                status: 0,
                data,
            });
        }, 300);
    })
}

function GetCell(data: Data = []) {
    for (let index = 0; index < 20; index++) {
        data.push(`${index} item`);
    }
    return data;
}

let data: Data = GetCell();

@Mounted
export default class List extends React.Component<{}, State>{
    constructor(props: {}){
        super(props)
        this.state = {
            data: [],
            loading: false,
        }
    }
    public ajax = async (callback?: Function) => {
        this.setState({
            loading: true,
        })
        let newData: any = await ajax();
        callback && callback();
        this.setState(prev => {
            let oldData = prev.data;
            return {
                data: [...oldData, ...newData.data],
                loading: false,
            }
        })
    }
    public componentDidMount (){
        this.ajax();
    }
    public isScrollToPageBottom = (callback: Function) => {
        this.ajax(callback);
    }
    public render (){
        return (
            <div>
                <ListView
                    data={ this.state.data }
                    rowRenderer={ (item, index) => {
                        return (
                            <div key={ `sq-list-view-${index}` } style={ cell }>{ item }</div>
                        )
                    } }
                    isScrollToPageBottom={ this.isScrollToPageBottom }
                />
                <Loading loading={ this.state.loading } />
            </div>
        )
    }
}
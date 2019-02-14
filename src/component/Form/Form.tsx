/*
 * @Author: 宋乾
 * @Date: 2019-01-24 14:40:15
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-02-14 18:22:09
 */
import * as React from 'react';

/**
 * @param
 * submit 提交表单
 */

interface Props{
    submit?: (json:object) => void;
}

export default class Form extends React.Component<Props> {
    constructor(props: Props){
        super(props)
    }
    public submit = (e:any) => {
        e.preventDefault();
        let json = {};
        for (const key in e.target) {
            if (e.target.hasOwnProperty(key)) {
                let target = e.target[key];
                let element = ['INPUT', 'TEXTAREA', 'SELECT'].indexOf(target.nodeName);
                if (element !== -1) {
                    if (target.nodeName === 'SELECT') {
                        json[target.name] = target.getAttribute('data-value');
                    }else{
                        json[target.name] = target.value;
                    }
                }
            }
        }
        this.props.submit && this.props.submit(json);
    }
    public render (){
        return (
            <form onSubmit={ this.submit }>
                { this.props.children }
            </form>
        )
    }
}
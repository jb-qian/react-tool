/*
 * @Author: 宋乾
 * @Date: 2019-01-24 14:40:15
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-04-15 23:28:32
 */
import * as React from 'react';

/**
 * @param submit 提交表单
 * @param toast 提示器
 * @param rules 验证规则
 */
interface Rules {
    [key: string]: (value: string) => string | undefined;
}
interface Props{
    submit?: (json:object) => void;
    toast?: any;
    rules?: Rules;
}

export default class Form extends React.Component<Props> {
    constructor(props: Props){
        super(props)
    }
    public submit = (e: any) => {
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
                    let text = target.getAttribute('data-error');
                    let rules = this.props.rules || {};
                    let rule = rules[target.name];
                    // 自定义校验
                    if (rule) {
                        let text = rule(json[target.name]);
                        if (text){
                            return this.props.toast && this.props.toast({
                                text,
                            })
                        }
                    }
                    // 手机号验证
                    if (target.getAttribute('data-type') === 'mobile') {
                        let mobile = json[target.name];
                        let re = /^1\d{10}$/;
                        if (!re.test(mobile) && !text) {
                            return this.props.toast && this.props.toast({
                                text: `请输入${mobile ? '正确' : ''}手机号`,
                            })
                        }
                    }
                    if (text && !json[target.name]) {
                        return this.props.toast && this.props.toast({
                            text,
                        })
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
/*
 * @Author: 宋乾
 * @Date: 2019-01-18 16:38:49
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-02-19 17:34:26
 */
import * as React from 'react';

/**
 * loading 状态
 * text 文字内容
 */

interface Props {
    text?: string;
    loading: boolean;
}

export default class Loading extends React.Component<Props> {
    constructor(props: Props){
        super(props)
    }
    public render (){
        if (this.props.loading) {
            return (
                <div className="sq-loading">
                    <div className="sq-loading-box">
                        <div className="sq-loading-icon">icon</div>
                        <div className="sq-loading-text">{ this.props.text || '加载中' }</div>
                    </div>
                </div>
            )
        }
        return (
            <div style={{ display: 'none' }}>loading</div>
        )
    }
}
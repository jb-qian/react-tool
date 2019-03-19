/*
 * @Author: 宋乾
 * @Date: 2019-01-18 16:38:49
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-03-19 11:44:46
 */
import * as React from 'react';
import * as styles from '../../less/loading.less';

/**
 * @param loading 状态
 * @param text 文字内容
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
                <div className={ styles.loading }>
                    <div className={ styles.box }>
                        <div className={ styles.icon } />
                        <div className={ styles.text }>{ this.props.text || '加载中' }</div>
                    </div>
                </div>
            )
        }
        return (
            <div style={{ display: 'none' }} />
        )
    }
}
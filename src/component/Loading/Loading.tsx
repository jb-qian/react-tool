import * as React from 'react';

export default class Loading extends React.Component {
    public render (){
        return (
            <div className="sq-loading">
                <div className="sq-loading-box">
                    <div className="sq-loading-icon">icon</div>
                    <div className="sq-loading-text">{ '加载中' }</div>
                </div>
            </div>
        )
    }
}
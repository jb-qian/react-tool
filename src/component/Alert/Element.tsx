import * as React from 'react';

interface Props {
    default?: () => void;
    title: string;
    primary?: () => void;
    noDefault?: boolean;
    noPrimary?: boolean;
    willUnmount: () => void;
}

interface State {
    name?: string;
    className: string;
}

export default class Element extends React.Component<Props, State>{

    public confirm:any;

    constructor(props: Props){
        super(props)
        this.state = {
            className: '',
        }
    }
    public default = () => {
        this.clone();
        if (this.props.default) {
            this.props.default();
        }
    }
    public primary = () => {
        this.clone();
        if (this.props.primary) {
            this.props.primary();
        }
    }
    public clone = () => {
        this.confirm.addEventListener('transitionend', this.transitionend);
        this.setState({
            className: '',
        })
    }
    /**
     * 动画结束
     */
    public transitionend = () => {
        this.confirm.removeEventListener('transitionend', this.transitionend);
        this.props.willUnmount();
    }
    public componentDidMount (){
        setTimeout(() => {
            this.setState({
                className: 'active',
            })
        }, 0);
    }
    public render (){
        return (
            <div ref={ e => this.confirm = e } className={ `sq-confirm ${this.state.className}` }>
                <div className="sq-content">
                    <div className="sq-title">{ this.props.title || '缺少标题' }</div>
                    <div className="sq-subtitle">{ '是否退出登录？' }</div>
                </div>
                <div className="sq-btns-content brt">
                {
                    !this.props.noDefault && <div className="sq-btn brr" onClick={ this.default }>取消</div>
                }
                {
                    !this.props.noPrimary && <div className="sq-btn" onClick={ this.primary }>确定</div>
                }
                </div>
            </div>
        )
    }
}
import {
    connect
} from 'react-redux';

export interface Props {
    name: string;
    change: () => void;
}

//需要渲染什么数据
function mapStateToProps(state: Props) {
    let {
        name
    } = state;
    return {
        name
    }
}
// 需要触发什么行为
function mapDispatchToProps(dispatch: Function) {
    return {
        change: () => dispatch({
            type: 'change'
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps);
import {
    connect
} from 'react-redux';

export interface Props {
    number: number;
    name: string;
    add: () => void;
    remove: () => void;
    ajax: () => void;
}

function ajax(action: any) {
    return function (dispatch: Function) {
        return setTimeout(() => {
            dispatch(action);
        }, 1000);
    };
}

//需要渲染什么数据
function mapStateToProps(state: Props) {
    return {
        ...state,
    }
}
// 需要触发什么行为
function mapDispatchToProps(dispatch: Function) {
    return {
        add: () => dispatch({
            type: 'add'
        }),
        remove: () => dispatch({
            type: 'remove'
        }),
        ajax: () => dispatch(ajax({
            type: 'ajax'
        })),
    }
}

export default connect(mapStateToProps, mapDispatchToProps);
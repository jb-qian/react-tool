import * as React from 'react'

import connect, { Props } from '../redux/containers/number';

class SongQian extends React.Component<Props>{
    componentDidMount (){
        // do...
    }
    render (){
        let { add, remove, number, ajax, name } = this.props;
        return (
            <div style={{ padding: 20 }}>
                <div style={{ marginBottom: 10 }}>{ name } { number }</div>
                <div style={{ padding: 10, border: '1px solid #e5e5e5', marginBottom: 10 }} onClick={ add }>add</div>
                <div style={{ padding: 10, border: '1px solid #e5e5e5', marginBottom: 10 }} onClick={ remove }>remove</div>
                <div style={{ padding: 10, border: '1px solid #e5e5e5', marginBottom: 10 }} onClick={ ajax }>ajax</div>
            </div>
        )
    }
}

export default connect(SongQian);
import * as React from 'react'

import { Link } from 'react-router-dom';

import connect, { Props } from '../redux/containers/name';

const styles = {
    li: {
        marginBottom: 10,
        textDecoration: 'underline',
        textIndent: '2em',
        color: '-webkit-link'
    },
    title: {
        marginBottom: 30,
        fontSize: 20,
    }
}

class Index extends React.Component<Props>{
    public render (){
        return (
            <div style={{ padding: 20 }}>
                <div style={ styles.title }>功能介绍</div>
                <ul>
                    <li style={ styles.li }>
                        <Link to={ '/app' }>App</Link>
                    </li>
                    <li style={ styles.li }>
                        <Link to={ '/list' }>ListView</Link>
                    </li>
                    <li style={ styles.li }>
                        <Link to={ '/songqian' }>{ this.props.name }的简历</Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default connect(Index);

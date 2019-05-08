import * as React from 'react'

import { Link } from 'react-router-dom';

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

export default class Index extends React.Component{
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
                </ul>
            </div>
        )
    }
}
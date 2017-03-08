import React from 'react'

import Article from '../../components/Article'

export default class newArticle extends React.Component {
    constructor (props) {
        super(props)
        
    }
    render () {
        return (
            <div>
                <Article new={true} />
            </div>
        )
    }
}  
import React from 'react'
import Article from 'components/Article'

export default class Index extends React.Component {
    constructor (props) {
        super(props)
    }
    render () {
        return (
            <div>
                <Article slug={this.props.params.slug}/>
            </div>
        )
    }
}
import React from 'react'

import { article } from '../../data/article'

export default class Article extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            article: {}
        }
    }
    componentDidMount () {
        article(this.props.params.slug)
            .then(e => {
                this.setState({
                    article: e.article
                })
            })
    }
    render () {
        const {article} = this.state
        return (
            <div>
                <h2 className="title">{article.title}</h2>
                <section  dangerouslySetInnerHTML={{__html: article.content}}>
                </section>
            </div>
        )
    }
}
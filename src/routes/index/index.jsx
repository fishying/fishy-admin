import React from 'react'
import { Button, Layout, Menu, ArticleList, Notification } from 'components'
import { GetAll } from 'data/article'
export default class react extends React.Component {
    constructor (props) {
        super(props)
        this.GetAll = this.GetAll.bind(this)
        this.state = {
            article: [],
            meta: {}
        }
    }
    componentDidMount () {
        this.GetAll()
    }

    GetAll (page = 1) {
        GetAll()
            .then(e => {
                this.setState({
                    article: e.article,
                    meta: e.meta
                })
            })
            .catch(msg => {
                Notification.error(msg.message)
            })
    }

    render () {
        const { article } = this.state
        return (
            <div>
                <div className="card">
                    <h2 className="title">文章</h2>
                </div>
                <ArticleList article={article}/>
                <div className="list-dian"></div>
            </div>
        )
    }
}
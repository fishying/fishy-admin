import React from 'react'
import { Button, Layout, Menu, ArticleList, Notification, Modal, AddArticle } from 'components'
import { GetAll } from 'data/article'
export default class react extends React.Component {
    constructor (props) {
        super(props)
        this.GetAll = this.GetAll.bind(this)
        this.addArticle = this.addArticle.bind(this)
        this.state = {
            article: [],
            meta: {},
            visible: false,
            openModal: false,
        }
    }
    componentDidMount () {
        this.GetAll()
    }

    GetAll (page = 1) {
        GetAll()
            .then(e => {
                this.setState({
                    article: e.article ? e.article : [],
                    meta: e.meta
                })
            })
            .catch(msg => {
                Notification.error(msg.message)
            })
    }

    addArticle () {
        return (
            <AddArticle
                onOk={() => { this.setState({openModal: true})}}
                visible={this.state.visible}
                onUpdate={() => this.GetAll()}
                onClose={() => {
                    this.setState({
                        visible: false
                    })
                }}
            />
        )
    }

    render () {
        const { article } = this.state
        return (
            <div>
                <div className="card title">
                    <h2 className="title">文章</h2>
                    <p className="add">
                        <a onClick={() => {this.setState({visible: true})}}>
                            <i className="icon ion-android-add"></i>
                            新建文章
                        </a>
                    </p>
                </div>
                <ArticleList onUpdate={() => this.GetAll()} article={article}/>
                <div className="list-dian"></div>
                { this.addArticle() }
            </div>
        )
    }
}
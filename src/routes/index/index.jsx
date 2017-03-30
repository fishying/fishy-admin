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
                    article: e.article,
                    meta: e.meta
                })
            })
            .catch(msg => {
                Notification.error(msg.message)
            })
    }

    addArticle () {
        return (
            <Modal.View
                visible={this.state.visible}
                onOk={ () => { this.setState({openModal: true}) }}
            >
                <AddArticle onUpdate={() => this.GetAll()} openModal={this.state.openModal} onClose={() => {this.setState({visible: false, openModal: false})}}/>
            </Modal.View>
        )
    }

    render () {
        const { article } = this.state
        return (
            <div>
                <div className="card title">
                    <h2 className="title">文章</h2>
                    <p className="add">
                        <Button onClick={() => {this.setState({visible: true})}}>新建文章</Button>
                    </p>
                </div>
                <ArticleList onUpdate={() => this.GetAll()} article={article}/>
                <div className="list-dian"></div>
                { this.addArticle() }
            </div>
        )
    }
}
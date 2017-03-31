import React from 'react'
import { GetAll, Get } from 'data/tag'
import { Button, Layout, Menu, ArticleList, Modal } from 'components'
import { Map } from 'immutable'
import './style/main.less'
const tagDefault = {
    cover: '',
    description: '',
    slug: '',
    name: ''
}
export default class react extends React.Component {
    constructor (props) {
        super(props)

        this.renderList = this.renderList.bind(this)
        this.renderModal = this.renderModal.bind(this)
        this.okFun = this.okFun.bind(this)
        this.clickList = this.clickList.bind(this)

        this.state = {
            tag: [],
            visible: false,
            id: null,
            onTag: Map(tagDefault)
        }
    }
    componentWillMount () {
        GetAll()
            .then(msg => {
                this.setState({
                    tag: msg.tag ? msg.tag : []
                })
            })
    }

    okFun () {
        if (this.state.id) {
            Get(this.state.id)
                .then(msg => {
                    this.setState({
                        onTag: Map(msg.tag)
                    })
                })
        }
    }

    clickList (id) {
        this.setState({
            visible: true,
            id: id
        })
    }

    renderModal () {
        const { visible, onTag } = this.state
        const { okFun } = this
        return (
            <Modal
                visible={visible}
                title={onTag.name}
                onOk={okFun}
                className="modal-tag-post"
                onClose={() => {this.setState({visible: false})}}
            >
                <div className="article-post">
                    <input className="input" type="text"/>
                    <div className="input-group">
                        <input className="input" type="text"/>
                        <input className="input" type="text"/>
                        <input className="input" type="text"/>
                    </div>
                </div>
            </Modal>
        )
    }

    renderList () {
        const { visible } = this.state
        const { clickList } = this
        return this.state.tag.map(tag => {
            return (
                <div key={tag._id} onClick={() => {clickList(tag._id)}} className="card item">
                    <p className="title">{ tag.name }</p>
                    <div className="info">
                        <p className="article">
                            <i className="icon ion-document-text"></i>
                            { tag.article.length }
                        </p>
                    </div>
                </div>
            )
        })
    }

    render () {
        const { renderList, renderModal } = this
        return (
            <div>
                <div className="card title">
                    <h2 className="title">标签</h2>
                    <p className="add">
                        <a onClick={() => {this.setState({visible: true})}}>
                            <i className="icon ion-android-add"></i>
                            新建标签
                        </a>
                    </p>
                </div>
                <div className="tag-list">
                    { renderList() }
                </div>
                <div className="list-dian"></div>
                { renderModal() }
            </div>
        )
    }
}
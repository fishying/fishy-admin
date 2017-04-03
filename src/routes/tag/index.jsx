import React from 'react'
import { GetAll, Get, Put } from 'data/tag'
import { Button, Layout, Menu, ArticleList, Modal, Input, Notification } from 'components'
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
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.onClose = this.onClose.bind(this)

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
                    let tag = Object.keys(msg.tag).forEach(type => {
                        msg.tag[type] = msg.tag[type] ? msg.tag[type] : ''
                    })
                    this.setState({
                        onTag: Map(msg.tag)
                    })
                })
        }
    }

    onClose () {
        this.setState({
            onTag: Map(tagDefault)
        })
    }

    handleChange (e, type) {
        this.setState({
            onTag: this.state.onTag.set(type, e.target.value)
        })
    }

    clickList (id) {
        this.setState({
            visible: true,
            id: id
        })
    }
    handleClick () {
        Put(this.state.id, this.state.onTag.toObject())
            .then(msg => {
                Notification.error(msg.message)
                this.setState({
                    visible: false
                })
            })
            .catch(msg => {
                Notification.error(msg.message)
            })
    }

    renderModal () {
        const { visible, onTag } = this.state
        const { okFun, onClose } = this
        return (
            <Modal
                visible={visible}
                title={onTag.get('name')}
                onOk={okFun}
                className="modal-tag-post"
                onClose={() => {this.setState({visible: false})}}
                afterClose={onClose}
            >
                <div className="article-post">
                    <label className="input">
                        <span className="title">名称:</span>
                        <Input value={onTag.get('name')} className="input" onChange={(e) => {this.handleChange(e, 'name')}}/>
                    </label>
                    <div className="input-group">
                        <label className="input">
                            <span className="title">slug:</span>
                            <Input value={onTag.get('slug')} className="input" onChange={(e) => {this.handleChange(e, 'slug')}}/>
                        </label>
                        <label className="input">
                            <span className="title">简介:</span>
                            <Input value={onTag.get('description')} className="input" onChange={(e) => {this.handleChange(e, 'description')}}/>
                        </label>
                        <label className="input">
                            <span className="title">头图:</span>
                            <Input value={onTag.get('cover')} className="input" onChange={(e) => {this.handleChange(e, 'cover')}}/>
                        </label>
                    </div>
                    <Button style={{ marginTop: 12, textAlign: 'right', float: 'right' }} onClick={this.handleClick} type="primary">更新</Button>
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
                    {/*
                        <p className="add">
                            <a onClick={() => {this.setState({visible: true})}}>
                                <i className="icon ion-android-add"></i>
                                新建标签
                            </a>
                        </p>
                    */}
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
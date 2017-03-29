import React, { Component } from 'react'
import SimpleMDE from 'react-simplemde-editor'
import './style/main.less'
import { Button, Modal, Popover } from 'components'
import { Get } from 'data/article'
import { Map } from 'immutable'
const PropTypes = React.PropTypes

export default class AddArticle extends Component {
    static propTypes = {
        onClose: PropTypes.func
    }

    static defaultProps = {
        onClose: () => {}
    }

    constructor (props) {
        super(props)

        this.closeSetting = this.closeSetting.bind(this)
        this.openSetting = this.openSetting.bind(this)
        this.initSetting = this.initSetting.bind(this)
        this.getArticle = this.getArticle.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onClose = this.onClose.bind(this)
        this.saveArticle = this.saveArticle.bind(this)

        this.state = {
            settingVis: false,
            article: Map({}),
            defaultProps: [],
            defaultTag: ''
        }
    }
    
    componentWillUpdate (state) {
        
    }
    
    getArticle () {
        Get(this.props.id)
            .then(e => {
                this.setState({
                    article: Map({...e.article}),
                    defaultTag: e.article.tag.length > 0 ? e.article.tag.map(e => e.name).join(',') : []
                })
            })
    }

    close () {
        this.props.onClose()
        this.setState({
            article: Map({})
        })
    }

    openSetting () {
        this.setState({
            settingVis: true
        })
    }
    
    closeSetting () {
        this.setState({
            settingVis: false
        })
    }

    handleChange (e, type) {
        if (type === 'defaultTag') {
            this.setState({
                [type]: e.target.value
            })
        } else {
            this.setState({
                article: this.state.article.set(type, e.target.value)
            })
        }
    }
    onClose () {
        this.props.onClose()
        this.close()
    }

    initSetting () {
        const { settingVis } = this.state
        return (
            <Modal.View
                className="modal-article-setting"
                visible={settingVis}
                onClose={() => {this.setState({settingVis: false})}}
            >
                <div onClick={() => {this.setState({settingVis: false})}}>test</div>
            </Modal.View>
        )
    }

    saveArticle () {
        let { article, defaultTag } = this.state
        let tag = defaultTag
            .split(',')
            .map(e => e.replace(/\s/g, ''))
            .filter(e => e.length > 0)
        console.log(tag)
        this.setState({
            article: article.set('tag', tag)
        }, () => {
            console.log(article.toObject())
        })
    }

    render () {
        const { visible } = this.props
        const { settingVis, article, defaultTag } = this.state
        const { initSetting, getArticle, onClose, saveArticle } = this
        let popup = (
            <ul>
                <li onClick={saveArticle}>保存</li>
            </ul>
        )
        return (
            <Modal.View
                visible={ visible }
                onClose={ onClose }
                onOk={ getArticle }
            >
                <div className="article-post">
                    <div className="header">
                        <div className="left">
                            <i className="icon ion-information-circled" onClick={() => this.setState({settingVis: true})}></i>
                            <i className="icon ion-upload"></i>
                        </div>
                        <div className="article-info">
                            <div className="info">
                                <div className="tag">
                                    <i className="icon ion-ios-pricetag"></i>
                                    <input value={defaultTag} type="text" onChange={e => this.handleChange(e, 'defaultTag')} placeholder="用,隔开" className="text"/>
                                </div>
                            </div>
                            <div className="title">
                                <input value={article.get('title')} onChange={e => this.handleChange(e, 'title')}  placeholder="文章标题"/>
                            </div>
                        </div>
                        <div className="right">
                            <Popover popup={ popup }>
                                <i className="icon ion-android-more-horizontal"></i>
                            </Popover>
                            <i className="icon ion-android-close" onClick={onClose}></i>
                        </div>
                    </div>
                    <div className="container">
                        <div className="md">
                            <textarea value={article.get('md')} onChange={e => this.handleChange(e, 'md')}  placeholder="文章内容" className="md" name="" id="" cols="30"></textarea>
                        </div>
                    </div>
                    { initSetting() }
                </div>
            </Modal.View>
        )
    }
} 
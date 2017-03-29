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
        this.state = {
            settingVis: false,
            article: Map({}),
            defaultProps: []
        }
    }
    
    componentWillUpdate (state) {
        
    }
    
    getArticle () {
        Get(this.props.id)
            .then(e => {
                this.setState({
                    article: Map({...e.article}),
                    defaultTag: e.article.tag.length > 0 ? e.article.tag.map(e => e.name) : []
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
        this.setState({
            article: this.state.article.set(type, e.target.value)
        })
    }
    onClose () {
        this.props.onClose()
        this.close()
    }
    initSetting () {
        const { settingVis } = this.state
        return (
            <Modal.View
                className="test"
                visible={settingVis}
                onClose={() => {this.setState({settingVis: false})}}
            >
                test
            </Modal.View>
        )
    }

    render () {
        const { visible } = this.props
        const { settingVis, article } = this.state
        const { initSetting, getArticle, onClose } = this
        let popup = (
            <ul>
                <li>发布</li>
                <li>保存</li>
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
                                    <input placeholder="用,隔开" type="text" className="text"/>
                                </div>
                            </div>
                            <div className="title">
                                <input value={article.get('title')} type="text" onChange={e => this.handleChange(e, 'title')}  placeholder="文章标题"/>
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
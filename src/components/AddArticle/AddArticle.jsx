import React, { Component } from 'react'
// import SimpleMDE from 'simplemde'
import './style/main.less'
import { Button, Modal, Popover, Switch, Notification } from 'components'
import { Get, Put, Add, Del } from 'data/article'
import { Map } from 'immutable'
import moment from 'moment'
moment.locale('zh-cn')
const PropTypes = React.PropTypes

const defaultArticle = {
    content: '',
    tag: '',
    slug: '',
    md: '',
    enabled: false,
    title: '',
    cover: '',
    page: false,
    ismd: true
}
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
        this.delArticle = this.delArticle.bind(this)
        // this.simpleMDEDecorator = this.simpleMDEDecorator.bind(this)

        this.state = {
            settingVis: false,
            article: Map({...defaultArticle}),
            defaultProps: [],
            defaultTag: '',
            articleOpen: false
        }
    }

    componentWillReceiveProps (state) {
        if (state.id) {
            this.getArticle()
        }
    }
    /*
    simpleMDEDecorator = (componentBackingInstance) => {
        if (componentBackingInstance) {
            let options = {
                element: componentBackingInstance,
                status: false,
                toolbar: false
            }
            let simplemde = new SimpleMDE(options)
        }
    }
    */
    getArticle () {
        this.setState({
            articleOpen: true
        }, () => {
            Get(this.props.id)
                .then(e => {
                    this.setState({
                        article: Map({...e.article, cover: e.article.cover === null ? '' : e.article.cover }),
                        defaultTag: e.article.tag.length > 0 ? e.article.tag.map(e => e.name).join(',') : ''
                    })
                })
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
                [type]: e
            })
        } else {
            this.setState({
                article: this.state.article.set(type, e)
            })
        }
    }

    onClose () {
        this.setState({
            article: Map({...defaultArticle}),
            articleOpen: false
        }, () => {
            this.props.onUpdate()
            this.props.onClose()
        })
    }
    delArticle () {
        const { onClose } = this.props
        Modal.Conform({
            title:'删除文章',
            content:'是否确定删除文章？',
            onOk: () => {
                Del(this.props.id)
                    .then(msg => {
                        Notification.success(msg.message)
                        this.props.onUpdate()
                        this.closeSetting()
                        onClose()
                    })
                    .catch(msg => {
                        Notification.error(msg.message)
                    })
            }
        })
    }

    initSetting () {
        const { settingVis, article } = this.state
        const { id } = this.props
        return (
            <Modal.View
                className="modal-article-info"
                visible={settingVis}
                onClose={() => {this.setState({settingVis: false})}}
            >
                <div className="article-info">
                    <header>
                        <i className="icon ion-ios-information-outline"></i>
                        <p className="title">文章设置</p>
                    </header>
                    <div className="content">
                        <div className="list">
                            <div className="lab">创建时间：</div>
                            <div className="info">{ moment(article.get('create_at')).format('lll') }</div>
                        </div>
                        <div className="list">
                            <div className="lab">更新时间：</div>
                            <div className="info">{ moment(article.get('update_at')).format('lll') }</div>
                        </div>
                        <div className="list">
                            <div className="lab">Slug：</div>
                            <div className="info">
                                <input type="text" value={article.get('slug')} onChange={e => this.handleChange(e.target.value, 'slug')}/>
                            </div>
                        </div>
                        <div className="list">
                            <div className="lab">文章封面图：</div>
                            <div className="info">
                                <input type="text" value={article.get('cover')} onChange={e => this.handleChange(e.target.value, 'cover')}/>
                            </div>
                        </div>
                        <div className="list">
                            <div className="lab">是否公开：</div>
                            <div className="info">
                                <Switch
                                    defaultChecked={article.get('enabled')}
                                    onChange={e => this.handleChange(e, 'enabled')}
                                />
                                </div>
                        </div>
                        <div className="list">
                            <div className="lab">是否为md：</div>
                            <div className="info">
                                <Switch
                                    defaultChecked={article.get('ismd')}
                                    onChange={e => this.handleChange(e, 'ismd')}
                                />
                                </div>
                        </div>
                        <div className="list">
                            <div className="lab">是否为page：</div>
                            <div className="info">
                                <Switch
                                    defaultChecked={article.get('page')}
                                    onChange={e => this.handleChange(e, 'page')}
                                />
                                </div>
                        </div>
                    </div>
                    <div className="btn-group">
                        <Button onClick={() => {this.setState({settingVis: false})}}>关闭</Button>
                        {
                            id ? <Button type="danger" onClick={this.delArticle}>删除</Button> : ''
                        }
                    </div>
                </div>
            </Modal.View>
        )
    }

    saveArticle () {
        let { article, defaultTag } = this.state
        let { id, onClose } = this.props
        let tag = defaultTag
            .split(',')
            .map(e => e.replace(/\s/g, ''))
            .filter(e => e.length > 0)
        this.setState({
            article: article.set('tag', tag)
        }, () => {
            if (id) {
                Put(this.props.id, this.state.article.toObject())
                    .then(msg => {
                        Notification.success(msg.message)
                        onClose()
                    })
                    .catch(msg => {
                        Notification.error(msg.message)
                    })
            } else {
                Add(this.state.article.toObject())
                    .then(msg => {
                        Notification.success(msg.message)
                        onClose()
                    })
                    .catch(msg => {
                        Notification.error(msg.message)
                    })
            }
        })
    }

    render () {
        const { visible, id } = this.props
        const { settingVis, article, defaultTag } = this.state
        const { initSetting, getArticle, onClose, saveArticle, AddArticle } = this
        let popup = (
            <ul>
                {
                    id ? (
                        <li onClick={saveArticle}>保存</li>
                    ) : (
                        <li onClick={ saveArticle }>发布</li>
                    )
                }
            </ul>
        )
        return (
            <Modal.View
                visible={this.props.visible}
                onOk={this.props.onOk}
                afterClose={onClose}
            >
                <div className="article-post">
                    <div className="header">
                        <div className="left">
                            <i className="icon ion-ios-information-outline" onClick={() => this.setState({settingVis: true})}></i>
                            <i className="icon ion-ios-cloud-upload-outline"></i>
                            <a href="https://stackedit.io/editor" target="_blank"><i className="icon ion-social-markdown"></i></a>
                        </div>
                        <div className="article-info">
                            <div className="info">
                                <div className="tag">
                                    <i className="icon ion-ios-pricetag"></i>
                                    <input value={defaultTag} type="text" onChange={e => this.handleChange(e.target.value, 'defaultTag')} placeholder="用,隔开" className="text"/>
                                </div>
                            </div>
                            <div className="title">
                                <input value={article.get('title')} type="text" onChange={e => this.handleChange(e.target.value, 'title')}  placeholder="文章标题"/>
                            </div>
                        </div>
                        <div className="right">
                            <Popover popup={ popup }>
                                <i className="icon ion-android-more-horizontal"></i>
                            </Popover>
                            <i className="icon ion-android-close" onClick={this.props.onClose}></i>
                        </div>
                    </div>
                    <div className="container">
                        <div className="md">
                            <textarea value={article.get('md')} onChange={e => this.handleChange(e.target.value, 'md')}  placeholder="文章内容" className="md thin-scroll" name="" id="" cols="30"></textarea>
                        </div>
                    </div>
                    { initSetting() }
                </div>
            </Modal.View>
        )
    }
} 
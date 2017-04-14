import React, { Component } from 'react'
import { Button, Input, Notification } from 'components'
import './style/site.less'
import Dragula from 'react-dragula'
import { Map } from 'immutable'
import { Get, Put } from 'data/setting'
import Nav from './nav'
const settingDefault = {
    cover: '',
    description: '',
    keywords: '',
    navigation: [],
    title: '',
    url: '',
    logo: ''
}
export default class Site extends Component {
    constructor (props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.putArticle = this.putArticle.bind(this)
        this.dragulaDecorator = this.dragulaDecorator.bind(this)

        this.state = {
            setting: Map(settingDefault)
        }
    }
    dragulaDecorator = (componentBackingInstance) => {
        if (componentBackingInstance) {
            let options = { }
            Dragula([componentBackingInstance], options)
        }
    }
    componentWillMount () {
        let setting = {}
        Get()
            .then(msg => {
                Object.keys(msg.setting).forEach(type => {
                    setting[type] = msg.setting[type] === null ? '' : msg.setting[type]
                })
                this.setState({
                    setting: Map(setting)
                })
            })
    }

    putArticle () {
        const { setting } = this.state
        Put(setting.get('_id'), setting.toObject())
            .then(msg => {
                Notification.success(msg.message)
            })
            .catch(msg => {
                Notification.error(msg.message)
            })
    }

    handleChange (e, type) {
        if (type === 'defaultTag') {
            this.setState({
                [type]: e
            })
        } else {
            this.setState({
                setting: this.state.setting.set(type, e)
            })
        }
    }

    render () {
        const { setting } = this.state
        const { putArticle } = this
        return (
            <div>
                <div className="card title">
                    <h2 className="title">网站设置</h2>
                </div>
                <div className="card site">
                    <label className="input">
                        <span className="title">头图:</span>
                        <Input
                            className="input"
                            type="text"
                            value={setting.get('cover')}
                            onChange={e => { this.handleChange(e.target.value, 'cover') }}
                        />
                    </label>
                    <label className="input">
                        <span className="title">标题:</span>
                        <Input
                            className="input"
                            type="text"
                            value={setting.get('title')}
                            onChange={e => { this.handleChange(e.target.value, 'title') }}
                        />
                    </label>
                    <label className="input">
                        <span className="title">关键词:</span>
                        <Input
                            className="input"
                            type="text"
                            value={setting.get('keywords')}
                            onChange={e => { this.handleChange(e.target.value, 'keywords') }}
                        />
                    </label>
                    <label className="input">
                        <span className="title">简介:</span>
                        <Input
                            className="input"
                            value={setting.get('description')}
                            onChange={e => { this.handleChange(e.target.value, 'description') }}
                        />
                    </label>
                    <label className="input">
                        <span className="title">logo:</span>
                        <Input
                            className="input"
                            type="text"
                            value={setting.get('logo')}
                            onChange={e => { this.handleChange(e.target.value, 'logo') }}
                        />
                    </label>
                    <label className="input">
                        <span className="title">url:</span>
                        <Input
                            className="input"
                            type="text"
                            value={setting.get('url')}
                            onChange={e => { this.handleChange(e.target.value, 'url') }}
                        />
                    </label>
                    <div className="btns">
                        <Button onClick={ putArticle }>更新</Button>
                    </div>
                    <Nav nav={setting.get('navigation')} onChange={(data) => {this.setState({setting:setting.set('navigation', data)})}}></Nav>
                </div>
            </div>
        )
    }
}
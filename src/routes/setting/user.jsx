import React from 'react'
import * as ReactDOM from 'react-dom'
import { Map } from 'immutable'
import { Button, Input, Notification } from 'components'
import { Get, Put } from 'data/user'
import './style/site.less'

const userDefault = {
    name: '',
    slug: '',
    cover: '',
    avatar: '',
    email: '',
    description: '',
    website: ''
}

const Component = React.Component
export default class Site extends Component {
    constructor (props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.putArticle = this.putArticle.bind(this)

        this.state = {
            user: Map(userDefault)
        }
    }
    componentWillMount () {
        let user = {}
        Get()
            .then(msg => {
                Object.keys(msg.user).forEach(type => {
                    user[type] = msg.user[type] === null ? '' : msg.user[type]
                })
                this.setState({
                    user: Map(user)
                })
            })
    }

    putArticle () {
        const { user } = this.state
        Put(user.toObject())
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
                user: this.state.user.set(type, e)
            })
        }
    }
    render () {
        const { user } = this.state
        const { putArticle } = this
        return (
            <div>
                <div className="card title">
                    <h2 className="title">管理员设置</h2>
                </div>
                <div className="card site">
                    <label className="input">
                        <span className="title">名称:</span>
                        <Input
                            className="input"
                            type="text"
                            value={user.get('name')}
                            onChange={e => { this.handleChange(e.target.value, 'name') }}
                        />
                    </label>
                    <label className="input">
                        <span className="title">slug:</span>
                        <Input
                            className="input"
                            type="text"
                            value={user.get('slug')}
                            onChange={e => { this.handleChange(e.target.value, 'slug') }}
                        />
                    </label>
                    <label className="input">
                        <span className="title">头像:</span>
                        <Input
                            className="input"
                            type="text"
                            value={user.get('avatar')}
                            onChange={e => { this.handleChange(e.target.value, 'avatar') }}
                        />
                    </label>
                    <label className="input">
                        <span className="title">头图:</span>
                        <Input
                            className="input"
                            type="text"
                            value={user.get('cover')}
                            onChange={e => { this.handleChange(e.target.value, 'cover') }}
                        />
                    </label>
                    <label className="input">
                        <span className="title">介绍:</span>
                        <Input
                            className="input"
                            type="text"
                            value={user.get('description')}
                            onChange={e => { this.handleChange(e.target.value, 'description') }}
                        />
                    </label>
                    <label className="input">
                        <span className="title">站点:</span>
                        <Input
                            className="input"
                            type="text"
                            value={user.get('website')}
                            onChange={e => { this.handleChange(e.target.value, 'website') }}
                        />
                    </label>
                    <div className="btns">
                        <Button onClick={putArticle}>更新</Button>
                    </div>
                </div>
            </div>
        )
    }
}
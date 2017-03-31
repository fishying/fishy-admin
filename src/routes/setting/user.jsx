import React from 'react'
import { Map } from 'immutable'
import { Button } from 'components'
import { Get, Put } from 'data/user'
import './style/site.less'

const userDefault = {
    avatar: '',
    cover: '',
    email: '',
    website: ''
}

const Component = React.Component
export default class Site extends Component {
    constructor (props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.putArticle = this.putArticle.bind(this)

        this.state = {
            user: Map({...userDefault})
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
                    user: Map({...user})
                })
            })
    }

    putArticle () {
        const { user } = this.state
        Put(user.get('_id'), user.toObject())
            .then(msg => {
                console.log(msg)
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
                    <label>
                        <p className="title">管理员头像：</p>
                        <input
                            type="text"
                            value={user.get('avatar')}
                            onChange={e => { this.handleChange(e.target.value, 'avatar') }}
                        />
                    </label>
                    <label>
                        <p className="title">管理员图片：</p>
                        <input
                            type="text"
                            value={user.get('cover')}
                            onChange={e => { this.handleChange(e.target.value, 'cover') }}
                        />
                    </label>
                    <label>
                        <p className="title">管理员图片：</p>
                        <input type="text"/>
                    </label>
                    <label>
                        <p className="title">管理员介绍：</p>
                        <textarea name="" id="" cols="30" rows="10"></textarea>
                    </label>
                    <div className="btns">
                        <Button>更新</Button>
                    </div>
                </div>
            </div>
        )
    }
}
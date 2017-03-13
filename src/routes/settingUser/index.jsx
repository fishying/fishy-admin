import React from 'react'
import { Input, Button, message } from 'antd'

import { view, update } from 'data/user'

import { Map } from 'immutable'
export default class settingGloble extends React.Component {
    constructor (props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.updateSetting = this.updateSetting.bind(this)

        this.state = {
            user: null,
            loading: false
        }
    }

    componentDidMount () {
        view()
            .then(e => {
                console.log(e)
                this.setState({
                    user: Map(e.user)
                })
            })
    }

    handleChange (e, value) {
        this.setState({
            user: this.state.user.set(value, e.target.value)
        })
    }

    createInput (name, id) {
        return (
            <lable key={id}>
                <h2 className="title">{name}</h2>
                <Input defaultValue={this.state.user.get(id)} placeholder={name} onChange={e => this.handleChange(e, id)} />
            </lable>
        )
    }

    updateSetting () {
        this.setState({
            confirmLoading: true
        })
        update(this.state.user.toObject())
            .then(e => {
                message.success(e.message)
                this.setState({
                    confirmLoading: false
                })
            })
    }

    render () {
        let { user, loading } = this.state 
        let inputArr = [
            {
                name: '用户名称（登陆名称）',
                id: 'name'
            },
            {
                name: '用户slug（网址）',
                id: 'slug'
            },
            {
                name: '用户介绍',
                id: 'description'
            },
            {
                name: '用户email',
                id: 'email'
            },
            {
                name: '用户头像',
                id: 'avatar'
            },
            {
                name: '用户头图',
                id: 'cover'
            },
            {
                name: 'website',
                id: 'website'
            }
        ]
        return (
            user ? 
            <div className="setting-globel">
                {
                    inputArr.map(i => {
                        return (
                            this.createInput(i.name, i.id)
                        )
                    })
                }
                <div style={{ marginTop: 24 }}>
                    <Button loading={loading} onClick={this.updateSetting} type="primary">更新</Button>
                </div>
            </div>
            : 
            <div></div>
        )
    }
}
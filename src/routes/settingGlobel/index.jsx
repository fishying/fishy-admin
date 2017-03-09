import React from 'react'
import { Input, Button, message } from 'antd'

import { all, update } from '../../data/setting'

import { Map } from 'immutable'

import './index.less'

export default class settingGloble extends React.Component {
    constructor (props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.updateSetting = this.updateSetting.bind(this)

        this.state = {
            setting: null,
            loading: false
        }
    }

    componentDidMount () {
        all()
            .then(e => {
                console.log(e)
                this.setState({
                    setting: Map(e.setting)
                })
            })
    }

    handleChange (e, value) {
        this.setState({
            setting: this.state.setting.set(value, e.target.value)
        })
    }

    createInput (name, id) {
        return (
            <lable key={id}>
                <h2 className="title">{name}</h2>
                <Input defaultValue={this.state.setting.get(id)} placeholder={name} onChange={e => this.handleChange(e, id)} />
            </lable>
        )
    }

    updateSetting () {
        this.setState({
            confirmLoading: true
        })
        update(this.state.setting.get('_id'), this.state.setting.toObject())
            .then(e => {
                message.success(e.message)
                this.setState({
                    confirmLoading: false
                })
            })
    }

    render () {
        let { setting, loading } = this.state 
        let inputArr = [
            {
                name: '网站标题',
                id: 'title'
            },
            {
                name: '网站介绍',
                id: 'profile'
            },
            {
                name: '网站url',
                id: 'url'
            },
            {
                name: '网站logo',
                id: 'logo'
            },
            {
                name: '网站头图',
                id: 'cover'
            }
        ]
        return (
            setting ? 
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
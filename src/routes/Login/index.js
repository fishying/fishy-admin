import React, { Component } from 'react'
import { Input, Button, notification } from 'antd'
import axios from 'axios'

import './style.less'

class Login extends Component {
    constructor (props) {
        super(props)
        this.state = {
            value: '',
            loading: false
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick () {
        this.setState({loading: true})
        let username = this.refs.username.refs.input.value
        let password = this.refs.password.refs.input.value
        axios({
            method: 'post',
            url: '/api/login',
            headers: {'Content-Type': 'application/json'},
            data: {
                username: username,
                password: password
            }
        })
            .then(data => {
                this.setState({loading: false})
                if (data.data.success) {
                    notification.info({
                        message: data.data.message
                    })
                } else {
                    notification.error({
                        message: data.data.message
                    })
                }
            })
            .catch((err) => {
                console.log(err)
                this.setState({loading: false})
            })
    }
    render() {
        return (
            <div className="login">
                <h2 className="title">登陆</h2>
                <Input size="large" placeholder="账号" ref="username" onPressEnter={this.handleClick}/>
                <Input type="password" size="large" ref="password" placeholder="密码" onPressEnter={this.handleClick}/>
                <Button type="ghost" onClick={this.handleClick} loading={this.state.loading}>Primary</Button>
            </div>
        )
    }
}
export default Login
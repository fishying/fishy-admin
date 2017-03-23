import React from 'react'
import { Button, Layout, Menu, ArticleList, Notification } from 'components'
export default class react extends React.Component {
    componentDidMount () {
        Notification.error('absfasf')
        Notification.success('absfasf')
    }
    render () {
        return (
            <div className="card">
                <h2 className="title">文章</h2>
                <ArticleList />
            </div>
        )
    }
}
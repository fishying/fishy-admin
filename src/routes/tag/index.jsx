import React from 'react'
import { Button, Layout, Menu, ArticleList } from 'components'
export default class react extends React.Component {
    render () {
        return (
            <div className="card">
                <h2 className="title">标签</h2>
                <ArticleList />
            </div>
        )
    }
}
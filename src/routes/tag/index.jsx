import React from 'react'
import { Button, Layout, Menu, ArticleList } from 'components'
export default class react extends React.Component {
    render () {
        return (
            <div>
                <div className="card title">
                    <h2 className="title">标签</h2>
                </div>
                <ArticleList/>
                <div className="list-dian"></div>
            </div>
        )
    }
}
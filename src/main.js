import React from 'react'
import ReactDOM from 'react-dom'

import Index from './routes/index/index.jsx'
import Article from './routes/article'
import newArticle from './routes/newarticle'
import tagList from './routes/tagList'
import upload from './routes/upload'

import settingGlobel from './routes/settingGlobel'
import settingUser from './routes/settingUser'

import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import Default from './components/Default/Default.jsx'

import './styles/main.less'

import 'antd/dist/antd.css'

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" breadcrumbName="主页" component={Default}>
            <IndexRoute component={Index}/>
            <Route path="tag" breadcrumbName="所有标签"  component={tagList}/>
            <Route path="article/:slug" breadcrumbName="文章：:slug"  component={Article}/>
            <Route path="new/article" breadcrumbName="新建文章" component={newArticle}/>
            <Route path="setting/globel" breadcrumbName="网站设置" component={settingGlobel}/>
            <Route path="setting/user" breadcrumbName="用户设置" component={settingUser}/>
            <Route path="upload" breadcrumbName="上传" component={upload}/>
        </Route>
    </Router>
), document.getElementById('root'))

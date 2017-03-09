import React from 'react'
import ReactDOM from 'react-dom'

import Index from './routes/index/index.jsx'
import Article from './routes/article'
import newArticle from './routes/newarticle'
import tagList from './routes/tagList'

import settingGlobel from './routes/settingGlobel'

import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import Default from './components/Default/Default.jsx'

import './styles/main.less'

import 'antd/dist/antd.css'

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" breadcrumbName="主页" component={Default}>
            <IndexRoute component={Index}/>
            <Route path="tag" breadcrumbName="所有标签"  component={tagList}/>
            <Route path="article/:slug" breadcrumbName="文章：:slug"  component={Article}/>
            <Route path="new/article" breadcrumbName="新建文章" component={newArticle}/>
            <Route path="setting/globel" breadcrumbName="网站设置" component={settingGlobel}/>
        </Route>
    </Router>
), document.getElementById('root'))

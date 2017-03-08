import React from 'react'
import ReactDOM from 'react-dom'

import Index from './routes/index/index.jsx'
import Article from './routes/article'
import newArticle from './routes/newarticle'
import tagList from './routes/tagList'

import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import Default from './components/Default/Default.jsx'

import './styles/main.less'

import 'antd/dist/antd.css'

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={Default}>
            <IndexRoute component={Index}/>
            <Route path="tag" component={tagList}/>
            <Route path="article/:slug" component={Article}/>
            <Route path="new/article" component={newArticle}/>
        </Route>
    </Router>
), document.getElementById('root'))

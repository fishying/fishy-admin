import React from 'react'
import ReactDOM from 'react-dom'

import Index from './routes/index/index.jsx'
import tagList from './routes/tagList/tagList.jsx'

import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import Default from './components/Default/Default.jsx'

import './styles/main.less'

import 'antd/dist/antd.css'

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={Default}>
            <IndexRoute component={Index}/>
            <Route path="tag" component={tagList}/>
        </Route>
    </Router>
), document.getElementById('root'))

import React from 'react'
import ReactDOM from 'react-dom'

import Index from './routes/index/index.jsx'

import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import './styles/main.less'

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" breadcrumbName="主页" component={Index}>
            <IndexRoute component={Index}/>
        </Route>
    </Router>
), document.getElementById('root'))

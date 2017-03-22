import React from 'react'
import ReactDOM from 'react-dom'

import Default from './layouts/default.jsx'

import Index from './routes/index/index.jsx'

import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import './styles/main.less'

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" name="文章" component={Default}>
            <IndexRoute component={Index}/>
        </Route>
    </Router>
), document.getElementById('root'))

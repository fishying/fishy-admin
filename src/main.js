import React from 'react'
import ReactDOM from 'react-dom'

import Default from './layouts/default.jsx'

import Index from './routes/index/index.jsx'
import Tag from './routes/tag/index.jsx'

import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import './styles/main.less'

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={Default}>
            <IndexRoute name="文章" component={Index}/>
            <Route path="tag" name="标签" component={Tag}/>
        </Route>
    </Router>
), document.getElementById('root'))

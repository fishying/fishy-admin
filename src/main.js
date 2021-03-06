import React from 'react'
import ReactDOM from 'react-dom'

import Default from './layouts/default.jsx'

import Index from './routes/index'
import Tag from './routes/tag'
import Site from './routes/setting/site.jsx'
import User from './routes/setting/user.jsx'

import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router'

import './styles/main.less'
let h
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development' ) {
    h = browserHistory
} else {
    h = hashHistory
}
ReactDOM.render((
    <Router history={h}>
        <Route path="/" component={Default}>
        <IndexRoute name="文章" component={Index}/>
            <Route path="tag" name="标签" component={Tag}/>
            <Route path="setting/site" name="网站" component={Site}/>
            <Route path="setting/user" name="用户" component={User}/>
        </Route>
    </Router>
), document.getElementById('root'))

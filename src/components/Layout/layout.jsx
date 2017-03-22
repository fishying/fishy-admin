import React from 'react'
import './style/main.less'

import classNames from 'classnames'

function generator (props) {
    return (Basic) => {
        return class Component extends React.Component {
            constructor (props) {
                super(props)
            }
            render() {
                const { prefixCls } = props
                return <Basic prefixCls={prefixCls} {...this.props}/>
            }
        }
    }
}

class Basic extends React.Component {
    constructor (props) {
        super(props)
    }
    render () {
        const { prefixCls, children, className, style } = this.props
        let isSider = false
        React.Children.forEach(children, (element) => {
            if (element && element.type && element.type.__ANT_LAYOUT_SIDER) {
                isSider = true
            }
        })
        const classs = classNames(prefixCls, {
            'layout-has-sider': isSider
        }, className)
        return (
            <div className={classs} style={style}>{children}</div>
        )
    }
}

const Layout = generator({
    prefixCls: 'layout',
})(Basic)

const Header = generator({
    prefixCls: 'layout-header',
})(Basic)

const Content = generator({
    prefixCls: 'layout-content',
})(Basic)

Layout.Header = Header
Layout.Content = Content

export default Layout
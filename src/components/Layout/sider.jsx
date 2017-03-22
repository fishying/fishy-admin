import React from 'react'
import classNames from 'classnames'

class Sider extends React.Component {
    static __ANT_LAYOUT_SIDER = true

    constructor (props) {
        super(props)
    }
    render () {
        const { prefixCls, children, className, style} = this.props
        let classs = classNames(prefixCls, className)
        return (
            <div className={classs} style={style}>{children}</div>
        )
    }
}

Sider.propTypes = {
    prefixCls: React.PropTypes.string
}

Sider.defaultProps = {
    prefixCls:  'layout-sider'
}

export default Sider
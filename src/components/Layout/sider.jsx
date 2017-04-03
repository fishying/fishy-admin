import React from 'react'
import classNames from 'classnames'

export default class Sider extends React.Component {
    static __ANT_LAYOUT_SIDER = true

    static propTypes = {
        prefixCls: React.PropTypes.string
    }

    static defaultProps = {
        prefixCls:  'layout-sider'
    }
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
import React from 'react'
import classNames from 'classnames'

class Item extends React.Component {
    static _MENU = true

    constructor (props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick () {
        this.props.onChange(this.props['data-key'])
    }
    render () {
        const { children, prefixCls, className, active } = this.props
        const classs = classNames(prefixCls, className, {
            [`${prefixCls}-active`]: active
        })
        return (
            <li className={classs} onClick={this.handleClick}>{children}</li>
        )
    }
}
Item.defaultProps = {
    prefixCls: 'menu-item'
}

export default Item
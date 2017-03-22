import React from 'react'
import classNames from 'classnames'

class Group extends React.Component {
    static _MENU = true
    constructor (props) {
        super(props)
    }
    render () {
        const {title, style, prefixCls, className, active, selectedKeys, onChange } = this.props
        const titleDom = title ? <div className={`${prefixCls}-title`}>{title}</div> : ''
        const classs = classNames(prefixCls, className, {
            [`${prefixCls}-active`]: active
        })
        const children =  React.Children.map(this.props.children, menus => {
            if (menus && menus.type && menus.type._MENU) {
                return React.cloneElement(menus, Object.assign({}, menus.props, {
                    active: selectedKeys.indexOf(menus.key) === -1 ? false : true,
                    onChange: onChange,
                    'data-key': menus.key
                }))
            } else {
                return menus
            }
        })
        return (
            <li style={style} className={classs}>
                {titleDom}
                <ul className="menu">
                    {children}
                </ul>
            </li>
        )
    }
}
Group.propTypes = {
    prefixCls: React.PropTypes.string,
    title: React.PropTypes.string
}

Group.defaultProps = {
    prefixCls: 'menu-group'
}

export default Group
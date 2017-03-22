import React from 'react'
import classNames from 'classnames'
import './style/main.less'
import assign from 'object-assign'

class Menu extends React.Component {
    constructor (props) {
        super(props)
        this.onChange = this.onChange.bind(this)
        this.state = {
            selectedKeys: []
        }
    }

    componentWillMount () {
        const { defaultSelectedKeys } = this.props
        this.setState({
            selectedKeys: defaultSelectedKeys
        })
    }

    onChange (e) {
        this.setState({
            selectedKeys: [e]
        })
    }

    render () {
        const { className, prefixCls } = this.props
        const { selectedKeys } = this.state
        const classs = classNames(prefixCls, className)
        const children =  React.Children.map(this.props.children, menus => {
            if (menus && menus.type && menus.type._MENU) {
                return React.cloneElement(menus, Object.assign({}, menus.props, {
                    active: selectedKeys.indexOf(menus.key) === -1 ? false : true,
                    onChange: this.onChange,
                    selectedKeys: selectedKeys,
                    'data-key': menus.key
                }))
            } else {
                return menus
            }
        })
        return (
            <ul className={classs}>
                {children}
            </ul>
        )
    }
}
Menu.propsTypes = {
    prefixCls: React.PropTypes.string,
    defaultSelectedKeys: React.PropTypes.array,
    selectedKeys: React.PropTypes.array
}

Menu.defaultProps = {
    prefixCls: 'menu',
    defaultSelectedKeys: [],
    selectedKeys: []
}

export default Menu
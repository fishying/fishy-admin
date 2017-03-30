import React from 'react'
import './style/button.less'
import classnames from 'classnames'

function trim (str, is_global) {
    let result
    result = str.replace(/(^\s+)|(\s+$)/g, '')
    if(is_global) {
        result = result.replace(/\s/g, '')
    }
    return result
}

class Button extends React.Component {
    constructor (props) {
        super(props)
    }
    render () {
        const {type, size, prefixCls, onClick} = this.props
        const context = <span>{trim(this.props.children)}</span>
        const className = classnames(prefixCls, {
            [`${prefixCls}-${type}`]: type,
            [`${prefixCls}-${size}`]: size
        })
        return (
            <button className={className} onClick={ onClick }>{context}</button>
        )
    }
}

Button.propTypes = {
    prefixCls: React.PropTypes.string,
    type: React.PropTypes.string,
    size: React.PropTypes.string,
    onClick: React.PropTypes.func
}
Button.defaultProps = {
    type: '',
    size: '',
    prefixCls:  'btn',
    onClick: () => {}
}
export default Button
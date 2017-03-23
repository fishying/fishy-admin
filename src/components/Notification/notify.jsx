import React from 'react'
import classNames from 'classnames'

import './style/main.less'

export default class Notify extends React.Component {
    static test = 1
    
    static propTypes = {
        type: React.PropTypes.string,
        message: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
            React.PropTypes.element
        ]).isRequired
    }
    static defaultProps = {
        type: 'info'
    }

    constructor (props) {
        super(props)
    }

    componentDidMount () {
        this.render
    }
    render () {
        const iconClass = {
            success: 'ion-checkmark-circled',
            info: 'ion-information-circled',
            warning: 'ion-help-circled',
            error: 'ion-close-circled'
        }
        const { prefixCls, className, type, message } = this.props
        const classs = classNames(`${prefixCls}-notify`, className, `${prefixCls}-${type}`)
        return (
            <div className={classs}>
                <div className={`${prefixCls}-icon`}>
                    <i className={`icon ${iconClass[type]}`}></i>
                </div>
                <div className={`${prefixCls}-content`}>
                    <h2>{ message }</h2>
                </div>
                <div className={`${prefixCls}-icon ${prefixCls}-icon-close`}>
                    <i className="icon ion-android-close"></i>
                </div>
            </div>
        )
    }
}
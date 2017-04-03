import React from 'react'
import classNames from 'classnames'
import ReactDOM from 'react-dom'

import './style/main.less'

const PropTypes = React.PropTypes

export default class Notify extends React.Component {
    static test = 1
    
    static propTypes = {
        type: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
        message: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.element
        ]).isRequired,
        onClose: PropTypes.func,
        duration: PropTypes.number
    }
    static defaultProps = {
        type: 'info',
        duration: 5
    }

    constructor (props) {
        super(props)
        this.close = this.close.bind(this)
        this.clearCloseTimer = this.clearCloseTimer.bind(this)
    }

    componentDidMount () {
        this.closeTimer = setTimeout(() => {
            this.close()
        }, this.props.duration * 1000)
    }

    componentWillUnmount() {
        this.clearCloseTimer()
    }

    clearCloseTimer() {
        if (this.closeTimer) {
            clearTimeout(this.closeTimer)
            this.closeTimer = null
        }
    }

    close () {
        this.clearCloseTimer()
        this.props.onClose()
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
                <div className={`${prefixCls}-icon ${prefixCls}-icon-close`} onClick={this.close}>
                    <i className="icon ion-android-close"></i>
                </div>
            </div>
        )
    }
}
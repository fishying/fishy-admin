import React, { Component, PropTypes }from 'react'
import ReactDOM from 'react-dom'
import { RenderInBody } from '../index'
import Animate from 'rc-animate'
import './style/main.less'
import classNames from 'classnames'

export default class Model extends Component {
    static propTypes = {
        prefixCls: PropTypes.string,
        visible: PropTypes.bool,
        onClose: PropTypes.func,
        onOk: PropTypes.func,
        afterClose: PropTypes.func
    }

    static defaultProps = {
        prefixCls: 'modal-view',
        visible: false
    }

    constructor (props) {
        super(props)
        this.onClose = this.onClose.bind(this)
        this.onKeyClose = this.onKeyClose.bind(this)
        this.afterClose = this.afterClose.bind(this)
        this.state = {
            visible: this.props.visible
        }
    }
    componentDidUpdate (state) {
        if (this.props.visible && this.props.visible !== state.visible) {
            this.onOk()
        }
    }
    /*
    componentDidUpdate () {
        const props = this.props
        if (props.visible) {
            document.addEventListener('keydown', this.onKeyClose)
        } else {
            document.removeEventListener('keydown', this.onKeyClose)
        }
    }
    */
    onKeyClose (e) {
        if (e.keyCode && e.keyCode === 27 ) {
            this.onClose()
        }
    }
    afterClose () {
        if (!this.props.visible) {
            this.props.afterClose ? this.props.afterClose() : () => {}
        }
    }
    onClose () {
        this.props.onClose ? this.props.onClose() : () => {}
    }

    onOk () {
        this.props.onOk ? this.props.onOk() : () => {}
    }

    render () {
        const { prefixCls, children, title, visible, className } = this.props
        let classnames = classNames(prefixCls, className)
        let content
        if (visible) {
            content = (
                <div className={classnames} ref="wrap">
                    <div className={`${prefixCls}-wrap thin-scroll`}>
                        { children }
                    </div>
                </div>
            )
        }
        return (
            <RenderInBody
                ref="wrap"
            >
                <Animate
                    component="div"
                    transitionName={'model-view'}
                    onEnd={this.afterClose}
                >
                    { content }
                </Animate>
            </RenderInBody>
        )
    }
}
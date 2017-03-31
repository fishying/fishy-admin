import React, { Component }from 'react'
import ReactDOM from 'react-dom'
import { RenderInBody } from '../index'
import Animate from 'rc-animate'
import classNames from 'classnames'
import './style/main.less'

const PropTypes = React.PropTypes
export default class Model extends Component {
    static propTypes = {
        prefixCls: PropTypes.string,
        title: PropTypes.string,
        visible: PropTypes.bool,
        onClose: PropTypes.func,
        onOk: PropTypes.func
    }

    static defaultProps = {
        prefixCls: 'modal',
        visible: false,
        onClose: () => {}
    }
    constructor (props) {
        super(props)
        this.onClose = this.onClose.bind(this)
        this.onKeyClose = this.onKeyClose.bind(this)
        this.state = {
            visible: this.props.visible
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
    componentWillReceiveProps (state) {
        if (state.visible && this.props.visible !== state.visible) {
            this.onOk()
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
                <div className={classnames}>
                    <div onClick={this.onClose} className={`${prefixCls}-mask`}></div>
                    <div className={`${prefixCls}-wrap`}>
                        <div className={`${prefixCls}-content thin-scroll`}>
                            <div className={`${prefixCls}-header`}>
                                <h2 className="title">{ title }</h2>
                                <i onClick={this.onClose} className={`${prefixCls}-icon ion-android-close`}></i>
                            </div>
                            { children }
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <RenderInBody>
                <Animate
                    component="div"
                    transitionName={'model'}
                >
                    { content }
                </Animate>
            </RenderInBody>
        )
    }
}
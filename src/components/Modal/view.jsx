import React, { Component }from 'react'
import ReactDOM from 'react-dom'
import { RenderInBody } from '../index'
import Animate from 'rc-animate'
import './style/main.less'

const PropTypes = React.PropTypes
export default class Model extends Component {
    static propTypes = {
        prefixCls: PropTypes.string,
        visible: PropTypes.bool,
        onClose: PropTypes.func,
        onOk: PropTypes.func
    }

    static defaultProps = {
        prefixCls: 'modal-view',
        visible: false
    }

    constructor (props) {
        super(props)
        this.onClose = this.onClose.bind(this)
        this.onKeyClose = this.onKeyClose.bind(this)
        this.state = {
            visible: this.props.visible
        }
    }
    componentDidUpdate () {
        const props = this.props
        if (props.visible) {
            document.addEventListener('keydown', this.onKeyClose)
        } else {
            document.removeEventListener('keydown', this.onKeyClose)
        }
    }
    onKeyClose (e) {
        if (e.keyCode && e.keyCode === 27 ) {
            this.onClose()
        }
    }
    onClose () {
        this.props.onClose ? this.props.onClose() : () => {}
    }

    onOk () {
        this.props.onOk ? this.props.onOk() : () => {}
    }

    render () {
        const { prefixCls, children, title, visible } = this.props
        let content
        if (visible) {
            content = (
                <div className={prefixCls} ref="wrap">
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
                >
                    { content }
                </Animate>
            </RenderInBody>
        )
    }
}
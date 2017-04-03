import React, { Component }from 'react'
import ReactDOM from 'react-dom'
import { RenderInBody, Button } from '../index'
import Animate from 'rc-animate'
import './style/main.less'

const PropTypes = React.PropTypes
class Confirm extends Component {
    static propTypes = {
        prefixCls: PropTypes.string,
        title: PropTypes.string,
        onClose: PropTypes.func,
        onOk: PropTypes.func
    }

    static defaultProps = {
        prefixCls: 'confirm',
        onClose: () => {}
    }
    constructor (props) {
        super(props)
        this.onClose = this.onClose.bind(this)
        this.onOk = this.onOk.bind(this)
        this.onKeyClose = this.onKeyClose.bind(this)
        this.destroy = this.destroy.bind(this)
        this.state = {
            visible: false
        }
    }
    componentDidMount () {
        if (this.state.visible === false) {
            this.setState({
                visible: true
            })
        }
    }

    onKeyClose (e) {
        if (e.keyCode && e.keyCode === 27 ) {
            this.onClose()
        }
    }

    onClose () {
        this.setState({
            visible: false
        })
        this.props.onClose ? this.props.onClose() : () => {}
    }

    onOk () {
        this.setState({
            visible: false
        })
        this.props.onOk ? this.props.onOk() : () => {}
    }
    destroy () {
        if (!this.state.visible) {
            ReactDOM.unmountComponentAtNode(this.props.root)
            document.body.removeChild(this.props.root)
        }
    }
    render () {
        const { prefixCls, children, title, content } = this.props
        const { visible } = this.state
        let child
        if (visible) {
            child = (<div className={prefixCls}>
                <div onClick={this.onClose} className={`${prefixCls}-mask`}></div>
                <div className={`${prefixCls}-wrap`}>
                    <div className={`${prefixCls}-content`}>
                        <div className={`${prefixCls}-body`}>
                            <i className="icon ion-ios-help"></i>
                            <span className={`${prefixCls}-title`}>{title}</span>
                            <div className={`${prefixCls}-info`}>{content}</div>
                        </div>
                        <div className={`${prefixCls}-btns`}>
                            <Button onClick={this.onClose}>取消</Button>
                            <Button onClick={this.onOk} type="primary">确定</Button>
                        </div>
                    </div>
                </div>
            </div>)
        }
        return (
            <Animate
                component="div"
                transitionName={'confirm'}
                onEnd={this.destroy}
            >
                { child }
            </Animate>
        )
    }
}
export default function confirm (config) {
    let div = document.createElement('div')
    document.body.appendChild(div)
    ReactDOM.render(
        <Confirm
            {...config}
            root={div}
        />
    , div)
}
import React, { Component } from 'react'
import { RenderInBody } from '../index'
import Animate from 'rc-animate'
import Trigger from 'rc-trigger'
import './style/main.less'
const PropTypes = React.PropTypes
export default class Popover extends Component {
    static propTypes = {
        prefixCls: PropTypes.string,
        visible: PropTypes.bool,
    }
    static defaultProps = {
        prefixCls: 'popover',
        visible: false,
        onClose: () => {}
    }
    constructor (props) {
        super(props)
    }

    render () {
        const { visible, children, popup } = this.props
        let content
        if (visible) {
            content = (
                <div>test</div>
            )
        }
        return (
            <Animate
                component="span"
                transitionName={'model'}
            >
                <Trigger 
                    action={['click']}
                    prefixCls="popover"
                    popup={popup}
                    popupAlign={{
                        points: ['tr', 'br'],
                        offset: [0, 3]
                    }}
                >
                    { children }
                </Trigger>
            </Animate>
        )
    }
}
import React from 'react'
import classNames from 'classnames'
import './style/main.less'
const PropTypes = React.PropTypes
const Component = React.Component
function noop () {}
export default class Switch extends Component {
    static propTypes = {
        prefixCls: PropTypes.string,
        disabled: PropTypes.bool,
        onChange: PropTypes.func
    }
    static defaultProps = {
        prefixCls: 'switch',
        visible: false,
        onClose: () => {},
        onChange: noop,
        defaultChecked: false
    }
    constructor (props) {
        super(props)
        this.toggle = this.toggle.bind(this)
        this.setChecked = this.setChecked.bind(this)
        this.state = {
            checked: props.defaultChecked
        }
    }
    setChecked (checked) {
        this.setState({
            checked,
        })
        this.props.onChange(checked)
    }
    toggle() {
        const checked = !this.state.checked
        this.setChecked(checked)
    }
    render () {
        const { className, prefixCls, disabled, checkedChildren, unCheckedChildren } = this.props
        const checked = this.state.checked
        const switchClassName = classNames({
            [className]: !!className,
            [prefixCls]: true,
            [`${prefixCls}-checked`]: checked,
            [`${prefixCls}-disabled`]: disabled,
        })
        return (
            <span
                className={switchClassName}
                tabIndex="0"
                ref="node"
                onKeyDown={this.handleKeyDown}
                onClick={disabled ? this.noop : this.toggle}
                onMouseUp={this.handleMouseUp}
            >
                <span className={`${prefixCls}-inner`}>
                    {checked ? checkedChildren : unCheckedChildren}
                </span>
            </span>
        )
    }
}
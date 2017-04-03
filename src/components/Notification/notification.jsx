import React from 'react'
import Notify from './notify'
import ReactDOM from 'react-dom'
const PropTypes = React.PropTypes
import Animate from 'rc-animate'

const info = ['success', 'info', 'warning', 'error']

let seed = 0
const now = Date.now()
var properties = null
class Notification extends React.Component {
    static propTypes = {
        prefixCls: PropTypes.string,
        style: PropTypes.object,
        onClose: PropTypes.func
    }
    static defaultProps = {
        prefixCls: 'notification',
        style: {
            bottom: 20,
            left: 20
        },
        onClose: () => {}
    }

    constructor (props) {
        super(props)
        this.remove = this.remove.bind(this)
        this.state = {
            notifysArr: []
        }
    }
    
    remove (key) {
        this.setState(State => {
            return {
                notifysArr: State.notifysArr.filter(notify => notify.key !== key),
            }
        })
        this.props.onClose()
    }

    add (prop) {
        const { notifysArr } = this.state
        let arr = notifysArr
        seed++
        let key = `${now}-${seed}`
        arr.push({
            ...prop,
            key: key
        })
        this.setState({
            notifysArr: arr
        })
    }

    render () {
        const { prefixCls, style } = this.props
        const { notifysArr } = this.state
        const Notifys = notifysArr.map(notify => {
            return (
                <Notify {...notify} onClose={() => this.remove(notify.key)} prefixCls={prefixCls}/>
            )
        })
        return (
            <div className={`${prefixCls}`} style={style}>
                <Animate
                    component="div"
                    transitionName={'notify'}
                >
                    { Notifys }
                </Animate>
            </div>
        )
    }
}

Notification.newNotification = () => {
    let div

    let { props } = properties || {}

    if (!properties) {
        div = document.createElement('div')
        document.body.appendChild(div)
        const notification = ReactDOM.render(
            <Notification  {...props}/>
        , div)
        properties = notification
        return properties
    } else {
        return properties
    }
}
info.forEach(e => {
    Notification[e] = (type) => {
        let prop
        if (typeof type === 'string') {
            prop = {
                type: e,
                message: type
            }
        } else {
            prop = type
        }
        Notification.pushNotify(prop)
    }
})
Notification.pushNotify = (type) => {
    Notification
        .newNotification()
        .add(type)
}
export default Notification
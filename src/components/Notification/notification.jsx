import React from 'react'
import Notify from './notify'
import ReactDOM from 'react-dom'

const info = ['success', 'info', 'warning', 'error']
let seed = 0
const now = Date.now()
var properties = null
class Notification extends React.Component {
    static propTypes = {
        prefixCls: React.PropTypes.string
    }
    static defaultProps = {
        prefixCls: 't-notification'
    }

    constructor (props) {
        super(props)
        this.state = {
            notifysArr: []
        }
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
        const { prefixCls } = this.props
        const { notifysArr } = this.state
        const Notifys = notifysArr.map(notify => {
            return (
                <Notify {...notify} {...this.props}/>
            )
        })
        return (
            <div className={`${prefixCls}`}>
                { Notifys }
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
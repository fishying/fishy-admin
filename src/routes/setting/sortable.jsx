import React from 'react'
import SortablePlain from 'sortablejs'

export default class Sortable extends React.Component {
    componentDidMount() {
        const props = { ...this.props }

        var start
        var nextNode

        props.onStart = (e) => {
            start = getIndex(e.item)
            nextNode = e.item.nextElementSibling

            if(this.props.onStart) return this.props.onStart(e, start)
        }

        'onUpdate onAdd onRemove'.split(' ').forEach(key => {
            props[key] = (e) => {
                try {
                    if(e.type == 'update') e.from.insertBefore(e.item, nextNode)
                    if(this.props[key]) return this.props[key](e)
                } catch(err) {
                // nothing
                }
            }
        })

        this.sort = new SortablePlain(this.refs.main, props)
    }

    componentWillUnmount() {
        this.sort && this.sort.destroy && this.sort.destroy()
    }

    render() {
        const params = this.props.params || {}

        return <div {...params} ref='main' children={this.props.children} />
    }
}

function getIndex(elem) {
    return Array.prototype.indexOf.call(elem.parentNode.childNodes, elem)
}
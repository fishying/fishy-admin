import React, { Component, PropTypes } from 'react'
import Dragula from 'react-dragula'
import Sortable from 'sortablejs'
import { List, Map } from 'immutable'
import { Input } from 'components'

export default class Nav extends Component {
    static propTypes = {
        onChange: PropTypes.func,
        nav: PropTypes.array
    }
    static defaultProps = {
        onChange: () => {}
    }
    constructor (props) {
        super(props)
        this.listRender = this.listRender.bind(this)
        this.addArr = this.addArr.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.sortableContainersDecorator = this.sortableContainersDecorator.bind(this)
        this.state = {
            nav: List([])
        }
    }
    componentWillReceiveProps (state) {
        this.setState({
            nav: List(state.nav)
        })
    }
    sortableContainersDecorator = (componentBackingInstance) => {
        // check if backing instance not null
        if (componentBackingInstance) {
            let options = {
                handle: '.list.t',
                onUpdate: (e) => {
                    this.handleMove(e)
                }
            }
            Sortable.create(componentBackingInstance, options)
        }
    }
    addArr () {
        this.setState({
            nav: this.state.nav.push({name: this.refs.name.value, url: this.refs.url.value})
        }, () => {
            this.props.onChange(this.state.nav.toArray())
        })
    }
    handleChange (e, index, type) {
        let data = this.state.nav.get(index)
        data[type] = e
        this.setState({
            nav: this.state.nav.set(index, this.state.nav.get(index))
        })
    }
    listRender () {
        console.log(1)
        return this.state.nav.map((list, i) => {
            return (
                <div key={list.name} className="list t">
                    <Input
                        value={list.name}
                        className="input"
                        type="text"
                        onChange={e => {this.handleChange(e.target.value, i, 'name')}}
                    />
                    <Input
                        value={list.url}
                        className="input"
                        type="text"
                        onChange={e => {this.handleChange(e.target.value, i, 'url')}}
                    />
                    <i className="icon ion-trash-b"></i>
                </div>
            )
        })
    }
    handleMove (e) {
        this.setState({
            nav: List(moveArray(this.state.nav.toArray(), e.oldIndex, e.newIndex))
        }, () => {
            this.props.onChange(this.state.nav.toArray())
        })
    }
    render () {
        return (
            <div className="nav">  
                <div ref={this.sortableContainersDecorator}>
                    {this.listRender()}
                </div>
                <div className="list add">
                    <input
                        className="input"
                        type="text"
                        ref="name"
                    />
                    <input
                        className="input"
                        type="text"
                        ref="url"
                    />
                    <i className="icon ion-plus-circled" onClick={this.addArr}></i>
                </div>
            </div>
        )
    }
}

function moveArray(arr, oldIndex, newIndex) {
    let newArr = [...arr]

    const old = newArr.splice(oldIndex, 1)[0]
    newArr.splice(newIndex, 0, old)
    return newArr
}
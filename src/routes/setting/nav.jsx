import React, { Component, PropTypes } from 'react'
import Dragula from 'react-dragula'
import Sortable from 'sortablejs'
import { List, Map } from 'immutable'
import { Input, Button } from 'components'

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
        this.onClick = this.onClick.bind(this)
        this.delArr = this.delArr.bind(this)

        this.state = {
            nav: List([])
        }
    }
    componentWillMount (state) {
        if (this.props.nav) {
            this.setState({
                nav: List(this.props.nav.map(e => Map({...e, key: Math.random()})))
            })
        }
    }
    sortableContainersDecorator = (componentBackingInstance) => {
        // check if backing instance not null
        if (componentBackingInstance) {
            let options = {
                animation: 150,
                handle: '.list.t',
                filter: '.icon, input',
                onEnd: (e) => {
                    this.handleMove(e)
                }
            }
            Sortable.create(componentBackingInstance, options)
        }
    }
    delArr (index) {
        this.setState({
            nav: this.state.nav.splice(index, 1)
        }, () => {
            console.log(this.state.nav.toArray())
        })
    }
    addArr () {
        this.setState({
            nav: this.state.nav.push(Map({name: this.refs.name.value, url: this.refs.url.value, key: Math.random()}))
        }, () => {
            this.refs.name.value = ''
            this.refs.url.value = ''
        })
    }
    handleChange (e, index, type) {
        this.setState({
            nav: this.state.nav.set(index, this.state.nav.get(index).set(type, e))
        })
    }
    onClick () {
        this.props.onChange(this.state.nav.toArray().map(e => e.toObject()))
        this.props.onClose()
    }
    listRender () {
        return this.state.nav.map((list, i) => {
            return (
                <div key={list.get('key')} className="list t" draggable="true">
                    <span className="drag-handle">☰</span>
                    <Input
                        value={list.get('name')}
                        className="input"
                        onChange={e => {this.handleChange(e.target.value, i, 'name')}}
                    />
                    <Input
                        value={list.get('url')}
                        className="input"
                        onChange={e => {this.handleChange(e.target.value, i, 'url')}}
                    />
                    <i className="icon ion-android-close" onClick={() => {this.delArr(i)}}></i>
                </div>
            )
        })
    }
    handleMove (e) {
        this.setState({
            nav: List(moveArray(this.state.nav.toArray(), e.oldIndex, e.newIndex))
        })
    }
    render () {
        return (
            <div className="nav">  
                <div ref={this.sortableContainersDecorator}>
                    {this.listRender()}
                </div>
                <div className="list add">
                    <span className="drag-handle"></span>
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
                    <i className="icon ion-android-add add" onClick={this.addArr}></i>
                </div>
                <Button type="primary" onClick={this.onClick}>确定</Button>
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
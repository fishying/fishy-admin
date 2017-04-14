import React, { Component, PropTypes } from 'react'
import Dragula from 'react-dragula'
import Sortable from 'sortablejs'
import { List } from 'immutable'
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
        console.log(this.state.nav)
        this.setState({
            nav: this.state.nav.push({name: this.refs.name.value, url: this.refs.url.value})
        }, () => {
            this.props.onChange(this.state.nav.toArray())
        })
    }

    handleChange (e, index, type) {
        if (type === 'defaultTag') {
            this.setState({
                nav: e
            })
        } else {
            this.setState({
                setting: this.state.setting.set(type, e)
            })
        }
    }
    listRender () {
        return this.props.nav.map((list, i) => {
            return (
                <div key={list.name} className="list t">
                    <Input
                        value={list.name}
                        className="input"
                        type="text"
                        onChange={e => {console.log(e)}}
                    />
                    <Input
                        value={list.url}
                        className="input"
                        type="text"
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
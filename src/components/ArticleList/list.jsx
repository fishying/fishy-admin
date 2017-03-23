import React from 'react'
import './style/main.less'
import { GetAll } from 'data/article'
export default class List extends React.Component {
    constructor (props) {
        super(props)
    }
    componentWillMount () {
        /*GetAll()
            .then(e => {
                console.log(e)
            })*/
    }
    render () {
        return (
            <article className="list">
                <div className="box">
                    gasdfg
                </div>
            </article>
        )
    }
} 
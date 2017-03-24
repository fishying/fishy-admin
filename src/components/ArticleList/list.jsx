import React, { Component } from 'react'
import { Modal } from 'components'
import './style/main.less'
import { GetAll } from 'data/article'
import classNames from 'classnames'
import moment from 'moment'
moment.locale('zh-cn')
const PropTypes = React.PropTypes

export default class List extends Component {
    static propTypes = {
        article: PropTypes.array
    }
    static defaultProps = {
        article: []
    }
    constructor (props) {
        super(props)
        this.articleList = this.articleList.bind(this)
        this.state = {
            visible: false
        }
    }
    componentWillMount () {
        /*GetAll()
            .then(e => {
                console.log(e)
            })*/
    }

    articleList () {
        const { article } = this.props
        if (article.length) {
            return article.map(art => {
                console.log(art.tag)
                let classs = classNames('box', {
                    enabled: !art.enabled
                }, 'card')
                return (
                    <div className={classs} key={art._id} onClick={() => {this.setState({visible: true})}}>
                        <div className="article">
                            <p className="title">{ art.title }</p>
                            <div className="info">
                                <p className="time">
                                    <i className="icon ion-android-time"></i>{moment(art.create_at).format('llll')}
                                </p>
                                {
                                    art.tag.length === 0 || (
                                        <p className="tag">
                                            <i className="icon ion-ios-pricetag"></i>Tag: 
                                            {
                                                art.tag.map((e, length) => {
                                                    if (art.tag.length === length + 1) {
                                                        return <span key={e._id}>{e.name}</span>
                                                    } else {
                                                        return <span key={e._id}>{e.name} ,</span>
                                                    }
                                                })
                                            }
                                        </p>

                                    )
                                }
                            </div>
                        </div>
                    </div>
                )
            })
        } else {
            return (
                <div className="no-more">
                    <i className="icon ion-filing"></i>
                    <p className="text">Null</p>
                </div>
            )
        }
    }

    render () {
        return (
            <article className="list">
                { this.articleList() }
                <Modal.View
                    visible={this.state.visible}
                    onClose={() => {this.setState({visible: false})}}
                >
                    <div onClick={() => {this.setState({visible: false})}}>test</div>
                </Modal.View>
            </article>
        )
    }
} 
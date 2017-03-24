import React, { Component } from 'react'
import SimpleMDE from 'react-simplemde-editor'
import './style/main.less'
import { Button } from 'components'
const PropTypes = React.PropTypes

export default class AddArticle extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        onClose: PropTypes.func
    }

    static defaultProps = {
        onClose: () => {},
        visible: false
    }
    constructor (props) {
        super(props)
        this.mdChange = this.mdChange.bind(this)
    }
    mdChange () {

    }
    render () {
        const { visible, onClose } = this.props
        return (
            <div className="article-post">
                <header className="article">
                    <div className="content">
                        <span className="settings">
                            <i className="icon ion-ios-gear"></i>
                        </span>
                        <span className="push">发布</span>
                    </div>
                </header>
                <div className="close">
                    <i className="icon ion-android-close" onClick={onClose}></i>
                </div>
                <div className="container">
                    <div className="cover">
                        <i className="icon ion-image"></i>
                    </div>
                    <div className="title">
                        <input type="text" placeholder="文章标题"/>
                    </div>
                    <div className="md">
                        <SimpleMDE
                            value="test"
                            onChange={this.mdChange}
                            options={{
                                status: false,
                                spellChecker: false
                            }}
                        />
                    </div>
                </div>
            </div>
        )
    }
} 
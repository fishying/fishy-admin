import React, { Component } from 'react'
import SimpleMDE from 'react-simplemde-editor'
import './style/main.less'
import { Button, Modal } from 'components'
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
        this.closeSetting = this.closeSetting.bind(this)
        this.openSetting = this.openSetting.bind(this)
        this.state = {
            settingVis: false
        }
    }

    mdChange () {

    }
    
    openSetting () {
        console.log(1)
        this.setState({
            settingVis: true
        })
    }
    
    closeSetting () {
        this.setState({
            settingVis: false
        })
    }

    render () {
        const { visible, onClose } = this.props
        const { settingVis } = this.state
        const { openSetting, closeSetting } = this
        return (
            <div className="article-post">
                <div className="close">
                    <i className="icon ion-android-more-horizontal" onClick={openSetting}></i>
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
                        <textarea placeholder="文章内容" className="md" name="" id="" cols="30"></textarea>
                    </div>
                </div>
                <Modal
                    visible={settingVis}
                    onClose={closeSetting}
                >
                    test
                </Modal>
            </div>
        )
    }
} 
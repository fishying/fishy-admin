import React from 'react'
import { Button } from 'components'
import './style/site.less'
import { Map } from 'immutable'
import { Get, Put } from 'data/setting'
const Component = React.Component

const settingDefault = {
    cover: '',
    description: '',
    keywords: '',
    navigation: [],
    title: '',
    url: ''
}
export default class Site extends Component {
    constructor (props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.putArticle = this.putArticle.bind(this)

        this.state = {
            setting: Map({...settingDefault})
        }
    }
    componentWillMount () {
        let setting = {}
        Get()
            .then(msg => {
                Object.keys(msg.setting).forEach(type => {
                    setting[type] = msg.setting[type] === null ? '' : msg.setting[type]
                })
                this.setState({
                    setting: Map({...setting})
                })
            })
    }

    putArticle () {
        const { setting } = this.state
        Put(setting.get('_id'), setting.toObject())
            .then(msg => {
                console.log(msg)
            })
    }

    handleChange (e, type) {
        if (type === 'defaultTag') {
            this.setState({
                [type]: e
            })
        } else {
            this.setState({
                setting: this.state.setting.set(type, e)
            })
        }
    }

    render () {
        const { setting } = this.state
        const { putArticle } = this
        return (
            <div>
                <div className="card title">
                    <h2 className="title">网站设置</h2>
                </div>
                <div className="card site">
                    <lable>
                        <p className="title">网站图片：</p>
                        <input
                            type="text"
                            value={setting.get('cover')}
                            onChange={e => { this.handleChange(e.target.value, 'cover') }}
                        />
                    </lable>
                    <lable>
                        <p className="title">网站标题：</p>
                        <input
                            type="text"
                            value={setting.get('title')}
                            onChange={e => { this.handleChange(e.target.value, 'title') }}
                        />
                    </lable>
                    <lable>
                        <p className="title">网站介绍：</p>
                        <textarea
                            value={setting.get('description')}
                            onChange={e => { this.handleChange(e.target.value, 'description') }}
                        />
                    </lable>
                    <lable>
                        <p className="title">网站logo：</p>
                        <input
                            type="text"
                            value={setting.get('logo')}
                            onChange={e => { this.handleChange(e.target.value, 'logo') }}
                        />
                    </lable>
                    <div className="btns">
                        <Button onClick={ putArticle }>更新</Button>
                    </div>
                </div>
            </div>
        )
    }
}
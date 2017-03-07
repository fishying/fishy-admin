import React from 'react'
import { Input, Row, Col, Breadcrumb, Icon, Modal, Button, Tooltip } from 'antd'
import { Link } from 'react-router'
import { article } from '../../data/article'
import SimpleMDE from 'react-simplemde-editor'

import './md.css'

import './article.less'

export default class Article extends React.Component {
    constructor (props) {
        super(props)

        this.updateCode = this.updateCode.bind(this)
        this.handleChange = this.handleChange.bind(this)

        this.state = {
            article: null,
            visible: false,
            cover: null
        }
    }
    componentDidMount () {
        article(this.props.params.slug)
            .then(e => {
                this.setState({
                    article: e.article
                })
            })
    }

    handleChange (e, type) {
        let name = `article.${type}`
        this.setState({
            [name]: e.target.value
        })
        console.log(this.state.article)
    }

    /**
     * 文本编辑器change函数
     * 
     * @param {any} newCode 
     * 
     * @memberOf Article
     */
    updateCode (newCode) {
        this.setState({
            ['article.md']: newCode
        })
    }

    createInput (name) {
        return {
            onChange: (e) => this.handleChange(e, name),
            placeholder: name,
            defaultValue: this.state.article[name]
        }
    }

    render () {
        const { article } = this.state
        return article ? (
            <div>
                <Breadcrumb style={{ position: 'absolute', top: '-12px' }}>
                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                </Breadcrumb>
                <Icon
                    type="setting"
                    style={{ position: 'absolute', top: -12, right: 24, fontSize: 22, cursor: 'pointer' }}
                    onClick={() => this.setState({visible: true})}
                />
                <Input defaultValue={article.title} style={{ marginBottom: '12px', fontSize: '22px', height: '42px' }}/>
                <SimpleMDE
                    value={article.md}
                    onChange={this.updateCode}
                    options={{
                        status: false
                    }}
                />
                <Modal 
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={() => this.setState({visible: false})}
                    onCancel={() => this.setState({visible: false})}
                >
                    <div className="ant-row ant-form-item">
                        <img src={article.cover}/>
                        <Row style={{ marginBottom: 12 }}>
                            <Col span={4} 
                                style={{ lineHeight: '28px', textAlign: 'right', padding: '0 12px' }}
                            >
                                <Tooltip placement="topLeft" title="封面图">
                                    <label>cover:</label>
                                </Tooltip>
                            </Col>
                            <Col span={18}>
                                <Input {...this.createInput('cover')}/>
                            </Col>
                        </Row>
                    </div>
                </Modal>
                <div className="btn">
                    <Button type="primary">Primary</Button>
                </div>
            </div>
        ) : (
            <div></div>
        )
    }
}
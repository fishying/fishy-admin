import React from 'react'
import { Input, Row, Col, Breadcrumb, Icon, Modal, Button, Tooltip, Select, message } from 'antd'
import { Link } from 'react-router'
import { article, update, add } from '../../data/article'
import { index as tagAll } from '../../data/tag'
import { Map } from 'immutable'
import SimpleMDE from 'react-simplemde-editor'

const { Option } = Select


import './md.css'
import './index.less'

export default class Article extends React.Component {
    constructor (props) {
        super(props)

        this.updateCode = this.updateCode.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onTagChange = this.onTagChange.bind(this)
        this.createTag = this.createTag.bind(this)
        this.onTagFocus = this.onTagFocus.bind(this)
        this.updateArticle = this.updateArticle.bind(this)
        this.addArticle = this.addArticle.bind(this)
        
        this.state = {
            article: null,
            visible: false,
            cover: null,
            allTag: [],
            defaultTag: []
        }
    }
    componentDidMount () {
        if (!this.props.new) {
            article(this.props.slug)
                .then(e => {
                    this.setState({
                        article: Map({...e.article, tag: e.article.tag.map(e => e.name)}),
                        defaultTag: e.article.tag.length > 0 ? e.article.tag.map(e => e.name) : []
                    })
                })
        } else {
            this.setState({
                article: Map({
                    title: '',
                    slug: '',
                    cover: '',
                    tag: [],
                    md: ''
                }),
                defaultTag: []
            })
        }
    }

    updateArticle () {
        console.log(this.state.article.toObject())
        update(this.state.article.get('_id'), this.state.article.toObject())
            .then(e => {
                message.success(e.message, 2)
            })
            .catch(e => {
                console.log(e)
            })
    }

    addArticle () {
        add(this.state.article.toObject())
            .then(e => {
                message.success(e.message, 2)
            })
            .catch(e => {
                console.log(e)
            })
    }

    /**
     * input双向绑定
     * 
     * @param {any} e 
     * @param {any} type 
     * 
     * @memberOf Article
     */
    handleChange (e, type) {
        this.setState({
            article: this.state.article.set(type, e.target.value)
        })
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
            article: this.state.article.set('md', newCode)
        })
    }

    /**
     * 创建input
     * 
     * @param {any} name 
     * @returns 
     * 
     * @memberOf Article
     */
    createInput (name) {
        return {
            onChange: (e) => this.handleChange(e, name),
            placeholder: name,
            defaultValue: this.state.article.get(name)
        }
    }

    /**
     * 获得焦点的一些数据获取
     * 
     * @param {any} type 
     * 
     * @memberOf Article
     */
    onTagFocus () {
        tagAll()
            .then(e => {
                this.setState({
                    allTag: e.tag.map(e => e.name)
                })
            })
    }

    /**
     * 创建tag
     * 
     * @param {any} name 
     * @returns 
     * 
     * @memberOf Article
     */
    createTag () {
        return this.state.allTag.map(e => {
            return (<Option key={e}>{e}</Option>)
        })
    }
    
    /**
     * tag的绑定
     * 
     * @param {any} value 
     * 
     * @memberOf Article
     */
    onTagChange (value) {
        this.setState({
            article: this.state.article.set('tag', value)
        })
    }

    render () {
        const { article, defaultTag } = this.state
        let inputArr = [
            {
                name: 'cover',
                tool: '封面图'
            },
            {
                name: 'slug',
                tool: '地址'
            },
            {
                name: 'tag',
                tool: '标签'
            }
        ]
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
                <Input defaultValue={article.get('title')} onChange={e => this.handleChange(e, 'title')} style={{ marginBottom: '12px', fontSize: '22px', height: '42px' }}/>
                <SimpleMDE
                    value={article.get('md')}
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
                        <img src={article.get('cover')} style={{ width: '100%', marginBottom: 12 }}/>
                        {
                            inputArr.map((i) => {
                                let inputs
                                if (i.name === 'tag') {
                                    inputs = 
                                        <Select
                                            tags
                                            style={{ width: '100%' }}
                                            onChange={this.onTagChange}
                                            onFocus={this.onTagFocus}
                                            tokenSeparators={[',']}
                                            defaultValue={defaultTag}
                                        >
                                            {this.createTag()}
                                        </Select>
                                } else {
                                    inputs = <Input {...this.createInput(i.name)}/>
                                }
                                return (
                                    <Row key={i.name} style={{ marginBottom: 12 }}>
                                        <Col span={4} 
                                            style={{ lineHeight: '28px', textAlign: 'right', padding: '0 12px' }}
                                        >
                                            <Tooltip placement="topLeft" title={i.tool}>
                                                <label>{i.name}:</label>
                                            </Tooltip>
                                        </Col>
                                        <Col span={18}>
                                            {inputs}
                                        </Col>
                                    </Row>
                                )
                            })
                        }
                    </div>
                </Modal>
                {
                    this.props.new ? 
                    <div className="btn" style={{ marginTop: 14, }}>
                        <Button type="primary" style={{ marginRight: 12 }} onClick={this.addArticle}>立即发布</Button>
                        <Button type="danger">存为草稿</Button>
                    </div>
                     : 
                    <div className="btn" style={{ marginTop: 14, }}>
                        <Button type="primary" style={{ marginRight: 12 }} onClick={this.updateArticle}>更新</Button>
                        <Button type="danger">删除</Button>
                    </div>
                }
            </div>
        ) : (
            <div></div>
        )
    }
}
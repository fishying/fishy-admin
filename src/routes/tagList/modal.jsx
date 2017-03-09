import React from 'react'

import { Modal, Row, Col, Tooltip, Input, Spin, message } from 'antd'

import { one, update } from '../../data/tag'

import { Map } from 'immutable'

class tagModal extends React.Component {
    constructor (props) {
        super(props)
        this.handleOk = this.handleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.Open = this.Open.bind(this)

        this.handleChange = this.handleChange.bind(this)
        this.createTag = this.createTag.bind(this)

        this.state = {
            tagInfo: null
        }
    }

    handleOk () {
        this.setState({
            confirmLoading: true
        })
        update(this.props.id, this.state.tagInfo.toObject())
            .then(e => {
                message.success(e.message)
                this.setState({
                    confirmLoading: false
                })
                this.props.Ok()
            })
            .catch(e => {
                message.error(e.message)
                this.setState({
                    confirmLoading: false
                })
            })
        // this.props.Ok()
    }

    handleCancel () {
        this.props.Cancel()
    }

    Open () {
        this.setState({
            tagInfo: null
        }, () => {
            one(this.props.id)
                .then(e => {
                    this.setState({
                        tagInfo: Map(e.tag)
                    })
                })
                .catch(e => {
                    message.error(e.message)
                })
        })
    }

    createTag () {
        return this.state.allTag.map(e => {
            return (<Option key={e}>{e}</Option>)
        })
    }
    
    createInput (name) {
        return {
            onChange: (e) => this.handleChange(e, name),
            placeholder: name,
            defaultValue: this.state.tagInfo.get(name)
        }
    }

    handleChange (e, type) {
        this.setState({
            tagInfo: this.state.tagInfo.set(type, e.target.value)
        })
    }

    render () {
        const { tagInfo } = this.state
        let inputArr = [
            {
                name: 'cover',
                tool: '封面图'
            },
            {
                name: 'name',
                tool: '名称'
            },
            {
                name: 'profile',
                tool: '简介'
            },
            {
                name: 'slug',
                tool: '路径'
            }
        ]
        return (
            <div>
                <Modal 
                    title="test"
                    visible={this.props.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    key={this.props.id}
                    afterClose={this.props.afterClose}
                    confirmLoading={this.state.confirmLoading}
                >
                    {
                    tagInfo
                    ? 
                    <div className="ant-row ant-form-item">
                        <img src={tagInfo.get('cover')} style={{ width: '100%', marginBottom: 12 }}/>
                        {
                            inputArr.map((i) => {
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
                                            <Input {...this.createInput(i.name)}/>
                                        </Col>
                                    </Row>
                                )
                            })
                        }
                    </div>
                    : 
                    <div style={{ textAlign: 'center' }}>
                        <Spin />
                    </div>
                    }
                </Modal>
            </div>
        )
    }
}

tagModal.propTypes = {
    visible: React.PropTypes.bool
}

export default tagModal
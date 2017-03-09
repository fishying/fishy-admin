import React from 'react'
import { index } from '../../data/tag'

import { Table, Popconfirm, message } from 'antd'

import Modal from './modal.jsx'

const { Column } = Table

export default class Default extends React.Component {
    constructor (props) {
        super(props)
        this.onSelectChange = this.onSelectChange.bind(this)
        this.onModal = this.onModal.bind(this)
        this.onConfirm = this.onConfirm.bind(this)
        this.onOk = this.onOk.bind(this)
        this.onCancel = this.onCancel.bind(this)

        this.state = {
            tag: null,
            meta: null,
            loading: true,
            rowSelection: [],
            visible: false,
            id: null
            // columns: [...col]
        }
    }

    onModal (id) {
        this.setState({
            id: id,
            visible: true
        }, () => {
            this.refs.Modal.Open()
        })
    }
    

    onPaging (page) {
        this.setState({
            loading: true,
        })
        index(page)
            .then(e => {
                this.setState({
                    article: e.article,
                    loading: false,
                    meta: e.meta
                })
            })
    }

    onConfirm (id) {
        message.info(id)
    }

    onSelectChange (selectedRowKeys) {
        this.setState({
            selectedRowKeys
        })
    }

    componentDidMount () {
        index()
            .then(e => {
                this.setState({
                    tag: e.tag,
                    meta: e.meta,
                    loading: false
                })
            })
    }

    onOk () {
        this.setState({
            visible: false
        })
    }

    onCancel () {
        this.setState({
            visible: false
        })
    }

    render(){
        const {loading, tag, meta, visible, id} = this.state

        return tag ? (
            <div>
                <Table
                    dataSource={tag}
                    loading={loading}
                    rowKey="_id"
                    pagination={{
                        defaultCurrent: 1,
                        total: meta.tag.total,
                        defaultPageSize: 10,
                        onChange: e => this.onPaging(e)
                    }}
                >
                    <Column
                        title="名称"
                        dataIndex="name"
                        key="name"
                        render={(text, record) => (
                            <a 
                                onClick={
                                    () => {
                                        this.onModal(record._id)
                                    }
                                }
                            >
                                {text}
                            </a>
                        )}
                    />
                    <Column
                        title="路径"
                        dataIndex="slug"
                        key="slug"
                        render={(text) => (
                            <span>
                                /{text}
                            </span>
                        )}
                    />
                    <Column
                        title="文章个数"
                        dataIndex="article"
                        key="article"
                        render={(text) => (
                            <span>
                                {text.length}
                            </span>
                        )}
                    />
                    <Column
                        title="操作"
                        dataIndex=""
                        key="x"
                        render={(text, record) => (
                            <Popconfirm title="确定要删除嘛?" okText="确定" cancelText="取消" onConfirm={() => this.onConfirm(record._id)}>
                                <a href="#">Delete</a>
                            </Popconfirm>
                        )}
                    />
                </Table>
                <Modal
                    visible={visible}
                    id={id}
                    Ok={this.onOk}
                    Cancel={this.onCancel}
                    ref="Modal"
                ></Modal>
            </div>
        ) : (
            <div></div>
        )
    }
}
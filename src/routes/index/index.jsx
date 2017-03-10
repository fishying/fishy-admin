import React from 'react'
import { Table, Popconfirm, message, Column } from 'antd'

import { Link } from 'react-router'

import { index, del } from 'data/article'

export default class Default extends React.Component {
    constructor(props) {
        super(props)
        this.onSelectChange = this.onSelectChange.bind(this)
        this.onPaging = this.onPaging.bind(this)
        this.onConfirm = this.onConfirm.bind(this)
        this.onIndex = this.onIndex.bind(this)
        this.state = {
            article: null,
            selectedRowKeys: [],
            loading: true,
            meta: null,
            column: [
                {
                    title: '标题',
                    dataIndex: 'title',
                    key: 'title',
                    render: (text, record) => <Link to={`/article/${record.slug}`}>{text}</Link>,
                },
                {
                    title: '路径',
                    dataIndex: 'slug',
                    key: 'slug',
                    render: text => <span>/{text}</span>,
                },
                {
                    title: '时间',
                    dataIndex: 'create_at',
                    key: 'create_at',
                },
                {
                    title: '公开',
                    dataIndex: 'enabled',
                    key: 'enabled',
                    render: text => <span>{'' + text}</span>,
                },
                {
                    title: '操作',
                    dataIndex: '',
                    key: 'x',
                    render: (text, record) =>
                        <Popconfirm title="确定要删除嘛?" okText="确定" cancelText="取消" onConfirm={() => this.onConfirm(record._id)}>
                            <a href="#">Delete</a>
                        </Popconfirm>
                }
            ]
        }
    }

    onConfirm (id) {
        del(id)
            .then(e => {
                message.success(e.message)
                this.onIndex()
            })
    }

    componentDidMount () {
        this.onIndex()
    }

    onIndex () {
        this.setState({
            loading: true,
        })
        index()
            .then(e => {
                this.setState({
                    article: e.article,
                    loading: false,
                    meta: e.meta
                })
            })
            .catch(e => {
                message.error(e.message)
            })
    }

    /**
     * 列表的选择函数
     * 
     * @param {any} selectedRowKeys 
     * 
     * @memberOf Default
     */

    onSelectChange (selectedRowKeys) {
        this.setState({
            selectedRowKeys
        })
    }

    onPaging (page) {
        // this.onConfirm()
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
            .catch(e => {
                message.error(e.message)
            })
    }

    render(){
        const {selectedRowKeys, loading, meta, column} = this.state
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        }
        return this.state.article
         ?
            <div>
                <Table
                    loading={loading}
                    rowKey="_id"
                    rowSelection={rowSelection}
                    columns={column}
                    dataSource={this.state.article}
                    pagination={{
                        defaultCurrent: 1,
                        total: meta.article.total,
                        defaultPageSize: 10,
                        onChange: e => this.onPaging(e)
                    }}
                />
            </div>
        : 
            <Table
                loading={loading}
                rowKey="_id"
                rowSelection={rowSelection}
                columns={column}
                dataSource={this.state.article}
            />
    }
}
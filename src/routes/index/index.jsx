import React from 'react'
import { Table, Icon, Popconfirm, message } from 'antd'

import { Link } from 'react-router'

import { index } from '../../data/article'

function onConfirm (id) {
    message.info(id)
}

const columns = [
    {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        render: (text, record) => <Link to={`/article/${record.slug}`}>{text}</Link>,
    },
    {
        title: '时间',
        dataIndex: 'create_at',
        key: 'create_at',
    },
    {
        title: '操作',
        dataIndex: '',
        key: 'x',
        render: (text, record) =>
            <Popconfirm title="确定要删除嘛?" okText="确定" cancelText="取消" onConfirm={onConfirm.bind(this, record._id)}>
                <a href="#">Delete</a>
            </Popconfirm>
    }
]

export default class Default extends React.Component {
    constructor(props) {
        super(props)
        this.onSelectChange = this.onSelectChange.bind(this)
        this.state = {
            article: [],
            selectedRowKeys: [],
            loading: true
        }
    }
    // component插入节点的阶段
    componentDidMount () {
        index()
            .then(e => {
                this.setState({
                    article: e.article,
                    loading: false
                })
            })
    }
    onConfirm (id) {
        console.log(id)
    }
    // 删除提示框
    // 列表的选择函数
    onSelectChange (selectedRowKeys) {
        this.setState({selectedRowKeys})
    }
    render(){
        const {selectedRowKeys, loading} = this.state
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        }
        return (
            <div>
                <Table loading={loading} rowKey="_id" rowSelection={rowSelection} columns={columns} dataSource={this.state.article} pagination={false} />
            </div>
        )
    }
}
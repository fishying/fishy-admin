import React from 'react'
import { index } from '../../data/tag'

import { Table, Popconfirm, message } from 'antd'

const { Column } = Table

/*function onConfirm (id) {
    message.info(id)
}
*/
/* const col = [
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <span onClick={() => {this.onModel(record._id)}}>{text}</span>
    },
    {
        title: '文章数',
        dataIndex: 'article',
        key: 'article',
        render: (text) => <text>{text.length}</text>

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
]*/

export default class Default extends React.Component {
    constructor (props) {
        super(props)
        this.onSelectChange = this.onSelectChange.bind(this)
        this.onModel = this.onModel.bind(this)
        this.onConfirm = this.onConfirm.bind(this)
        // this.onPaging = this.onPaging.bind(this)
        this.state = {
            tag: null,
            meta: null,
            loading: true,
            rowSelection: [],
            // columns: [...col]
        }
    }

    onModel (id) {
        console.log(id)
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

    render(){
        const {loading, tag, meta} = this.state
        /*const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        }*/
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
                                        this.onModel(record._id)
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
            </div>
        ) : (
            <div></div>
        )
    }
}
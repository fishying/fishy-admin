import React from 'react'
import { Table, Icon } from 'antd'
import api from '../../data/article'
const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="#">{text}</a>,
}, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
}, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
}]

const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
}, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
}, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
}]
export default class Default extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            loading: false
        }
        api.index()
            .then(e => {
                this.state.data = e
            })
    }
    render(){
        console.log(this.state.data)
        return (
            <div>
                <div>{this.state.data}</div>
                <Table columns={columns} dataSource={data} />
            </div>
        )
    }
}
import React from 'react'

import { Upload, Icon, Modal } from 'antd'

export default class Up extends React.Component {
    constructor (props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            fileList: []
        }
    }
    handleChange (cbk) {
        console.log(cbk)
    }
    render () {
        let { fileList } = this.state
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        )
        return (
            <Upload
                name="avatar"
                action="/api/upload"
                listType="picture"
                fileList={fileList}
                onChange={this.handleChange}
            >
                {fileList.length >= 1 ? null : uploadButton}
            </Upload>
        )
    }
}
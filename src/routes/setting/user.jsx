import React from 'react'
import { Button } from 'components'
import './style/site.less'
const Component = React.Component
export default class Site extends Component {
    constructor (props) {
        super(props)
    }
    render () {
        return (
            <div>
                <div className="card title">
                    <h2 className="title">管理员设置</h2>
                </div>
                <div className="card site">
                    <lable>
                        <p className="title">管理员头像：</p>
                        <input type="text"/>
                    </lable>
                    <lable>
                        <p className="title">管理员图片：</p>
                        <input type="text"/>
                    </lable>
                    <lable>
                        <p className="title">管理员介绍：</p>
                        <textarea name="" id="" cols="30" rows="10"></textarea>
                    </lable>
                    <div className="btns">
                        <Button>更新</Button>
                    </div>
                </div>
            </div>
        )
    }
}
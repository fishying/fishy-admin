import React from 'react'
import { Button, Layout, Menu } from 'components'
export default class react extends React.Component {
    render () {
        const { route } = this.props
        
        return (
            <div>
                <Layout>
                    <Layout.Header>
                        <div className="logo">Fishy</div>
                        <div className="nav">Header</div>
                    </Layout.Header>
                    <Layout>
                        <Layout.Sider className="card" style={{ marginRight: '20px' }}>
                            <Menu
                                defaultSelectedKeys={[route.name]}
                            >
                                <Menu.Group key="safdaf" title="列表" style={{ margin: '20px 0' }}>
                                    <Menu.Item key="文章">
                                        <a>文章</a>
                                    </Menu.Item>
                                    <Menu.Item key="2">
                                        <a>标签</a>
                                    </Menu.Item>
                                </Menu.Group>
                            </Menu>
                        </Layout.Sider>
                        <Layout.Content className="card">
                            { this.props.children }
                        </Layout.Content>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
import React from 'react'
import { Link } from 'react-router'
import { Button, Layout, Menu } from 'components'
import Animate from 'rc-animate'
export default class react extends React.Component {
    render () {
        const { location, children } = this.props

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
                                defaultSelectedKeys={[location.pathname]}
                            >
                                <Menu.Group key="list" title="列表" style={{ margin: '20px 0' }}>
                                    <Menu.Item key="/">
                                        <Link to="/">文章</Link>
                                    </Menu.Item>
                                    <Menu.Item key="/tag">
                                        <Link to="/tag">标签</Link>
                                    </Menu.Item>
                                </Menu.Group>
                                <Menu.Group key="safdaf" title="设置" style={{ margin: '20px 0' }}>
                                    <Menu.Item key="/setting/site">
                                        <Link to="/setting/site">网站</Link>
                                    </Menu.Item>
                                    <Menu.Item key="/setting/user">
                                        <Link to="/setting/user">用户</Link>
                                    </Menu.Item>
                                </Menu.Group>
                            </Menu>
                        </Layout.Sider>
                        <Layout.Content>
                            <Animate
                                component="div"
                                transitionName={'content-card'}
                            >
                                {React.cloneElement(children, { key: location.pathname })}
                            </Animate>
                        </Layout.Content>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
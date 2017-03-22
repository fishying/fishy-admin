import React from 'react'
import { Link } from 'react-router'
import { Button, Layout, Menu } from 'components'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
export default class react extends React.Component {
    render () {
        const { location } = this.props

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
                                <Menu.Group key="safdaf" title="列表" style={{ margin: '20px 0' }}>
                                    <Menu.Item key="/">
                                        <Link to="/">文章</Link>
                                    </Menu.Item>
                                    <Menu.Item key="/tag">
                                        <Link to="/tag">标签</Link>
                                    </Menu.Item>
                                </Menu.Group>
                            </Menu>
                        </Layout.Sider>
                        <Layout.Content className="card">
                            <ReactCSSTransitionGroup transitionName="example">
                                { this.props.children }
                            </ReactCSSTransitionGroup>
                        </Layout.Content>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
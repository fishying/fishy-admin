import React from 'react'
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router'

const { Header, Sider, Content } = Layout;
import './Default.css'

export default class Default extends React.Component {
    state = {
        collapsed: false
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }
    render() {
        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Link to="/">
                                <Icon type="bars" />
                                <span className="nav-text">文章</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/tag">
                                <Icon type="tag-o" />
                                <span className="nav-text">标签</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                    <Icon
                        className="trigger"
                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.toggle}
                    />
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

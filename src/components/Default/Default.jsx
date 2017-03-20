import React from 'react'
import { Layout, Menu, Icon, Dropdown, Breadcrumb } from 'antd'
import { Link } from 'react-router'
const SubMenu = Menu.SubMenu
const { Header, Sider, Content, Footer } = Layout
import './Default.css'


const menu = (
    <Menu>
        <Menu.Item key="0">
            <Link to="/new/article">
                <Icon type="bars" />
                <span className="nav-text">文章</span>
            </Link>
        </Menu.Item>
    </Menu>
)

export default class Default extends React.Component {
    constructor (props) {
        super(props)
    }

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
                    <a href="/" className="logo" />
                    <Menu theme="dark" mode="inline" selectedKeys={[this.props.location.pathname]} defaultSelectedKeys={['/']}>
                        <Menu.Item key="/">
                            <Link to="/">
                                <Icon type="bars" />
                                <span className="nav-text">文章</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/tag">
                            <Link to="/tag">
                                <Icon type="tag-o" />
                                <span className="nav-text">标签</span>
                            </Link>
                        </Menu.Item>
                        <SubMenu key="sub1" title={<span><Icon type="setting" /><span>设置</span></span>}>
                            <Menu.Item key="/setting/globel">
                                <Link to="/setting/globel">
                                    <Icon type="global" />
                                    <span className="nav-text">网站</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/setting/user">
                                <Link to="/setting/user">
                                    <Icon type="user" />
                                    <span className="nav-text">用户</span>
                                </Link>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{ background: '#fff' }}>
                    <Header style={{ background: '#fff', padding: 0, borderBottom: '1px solid #e7e7e7', position: 'relative' }}>
                        <div className="left">
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            />
                        </div>
                        <div className="right">
                            <Dropdown overlay={menu} trigger={['click']}>
                                <Icon className="trigger" type="plus" />
                            </Dropdown>
                        </div>
                    </Header>
                    <Content style={{padding: 24,margin: 24, background: '#fff', position: 'relative' }}>
                        <Breadcrumb routes={this.props.routes} params={this.props.params}  style={{ position: 'absolute', top: '-12px' }}/>
                        {this.props.children}
                    </Content>
                    <Footer style={{ textAlign: 'center', background: '#fff' }}>
                        Ant Design ©2016 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}

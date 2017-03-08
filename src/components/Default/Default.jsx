import React from 'react'
import { Layout, Menu, Icon, Dropdown } from 'antd'
import { Link } from 'react-router'

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
    componentDidMount () {
        console.log(this.props)
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
                    <div className="logo" />
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

import React from 'react'
import { Outlet, Link, useRoutes, useParams, useNavigate } from 'react-router-dom'
import {
  LaptopOutlined,
  BugOutlined,
  UserOutlined,
  GithubOutlined,
  SunOutlined,
  CloudOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Breadcrumb, Layout, Menu, theme as ATheme } from 'antd'
import { changeThemeActionCreator } from '@/web/redux/theme/themeActions'
import { useDispatch } from 'react-redux'
import { useSelector } from '@/web/redux/hooks'

import styles from './index.module.styl'

const { Header, Content, Sider } = Layout

function HeaderMenuItem({ icon, title }) {
  return (
    <div>
      <span style={{ marginRight: '4px' }}>{icon}</span>
      <span>{title}</span>
    </div>
  )
}

const siders = [
  {
    key: '/',
    label: '应用',
    icon: React.createElement(LaptopOutlined),
  },
  {
    key: '/script',
    label: '脚本',
    icon: React.createElement(BugOutlined),
  },
]

const RootLayout = () => {
  const navigate = useNavigate()
  const {
    token: { colorBgContainer, borderRadiusLG, colorPrimaryBg },
  } = ATheme.useToken()
  const theme = useSelector((state) => state.theme.theme)
  const dispatch = useDispatch()

  const handleMenuClick = ({ item, key, keyPath, domEvent }, position) => {
    console.log('----', item, key, keyPath, domEvent)
    if (position === 'header') {
      if (key === 'github') {
        window.open('https://github.com/lumengxin/control-app')
      } else if (key === 'theme') {
        const t = theme === 'light' ? 'dark' : 'light'
        dispatch(changeThemeActionCreator(t))
        window.electronAPI.changeTheme(t)
      }
    } else {
      navigate(key)
    }
  }

  const headers = [
    {
      key: 'github',
      label: <HeaderMenuItem icon={<GithubOutlined />} title="代码" />,
    },
    {
      key: 'theme',
      label: <HeaderMenuItem icon={theme === 'light' ? <SunOutlined /> : <CloudOutlined />} title="主题" />,
    },
  ]

  return (
    <Layout className={styles['root-layout']}>
      <Header className={styles['header']}>
        <div className="demo-logo" />
        <Menu
          className={styles['header-menu']}
          mode="horizontal"
          items={headers}
          onClick={(data) => handleMenuClick(data, 'header')}
        />
      </Header>
      <Layout>
        <Sider width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={siders}
            onClick={(data) => handleMenuClick(data, 'aside')}
          />
          {/* <div className="setting">
            setting
          </div> */}
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              // background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default RootLayout

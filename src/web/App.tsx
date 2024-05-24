import React, { lazy, Suspense } from 'react'
import { ConfigProvider, theme as ATheme, Spin, Skeleton } from 'antd'
import routes from './routes'
import { RouterProvider } from 'react-router-dom'
import { useSelector } from './redux/hooks'

const themeConfig = {
  light: {
    algorithm: 'defaultAlgorithm',
    token: {
      colorPrimary: '#900021',
      colorBgContainer: '#f9f0ff',
    },
  },
  dark: {
    algorithm: 'darkAlgorithm',
  },
}

const App = () => {
  const theme = useSelector(state => state.theme.theme)

  return (
    <ConfigProvider
      theme={{
        // 1. 单独使用暗色算法
        algorithm: ATheme[themeConfig[theme]['algorithm']],
        token: theme === 'light' ? themeConfig[theme]['token'] : {},
      }}
    >
      <Suspense fallback={<div>load..</div>}>
        <RouterProvider router={routes} />
      </Suspense>
    </ConfigProvider>
  )
}

export default App

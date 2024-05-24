import * as React from 'react'
import RootLayout from '@layouts/root-layout'
import Home from '@pages/home'
import Script from '@pages/script'
import NoMatch from '@pages/404'

const router = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'script',
        element: <Script />,
      },
      { path: '*', element: <NoMatch /> },
    ],
  },
  {
    path: 'about',
    element: <div>About</div>,
  },
]

export default router

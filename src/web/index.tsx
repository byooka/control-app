import { createRoot } from 'react-dom/client'
import React, { lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
import rootStore from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'

const root = createRoot(document.querySelector('#root') as Element)
root.render(
  <React.StrictMode>
    <Provider store={rootStore.store}>
      <PersistGate persistor={rootStore.persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)

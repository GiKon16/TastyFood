import React from 'react'
import '@/styles/globals.css'
import { ConfigProvider } from 'antd'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from "../redux/store"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={ store }>
      <ConfigProvider
        theme={{
            token: {
                colorPrimary: "#e69600",
            },
        }}>
        <Component {...pageProps} />
      </ConfigProvider>
    </Provider>
  )
}

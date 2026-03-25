'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../lib/store'

export default function StoreProvider({ children, }: { children: React.ReactNode }) {

  const store = useRef<AppStore>()

  if (!store.current) {
    // Create the store instance the first time this renders
    store.current = makeStore()
  }

  return <Provider store={store.current}>{children}</Provider>
}
'use client'

import {
  Suspense, lazy, useEffect, useState,
} from 'react'
import { QueryClient, QueryClientProvider, isServer } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

declare global {
  interface Window {
    toggleDevtools: () => void
  }
}

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined

const getQueryClient = () => {
  if (isServer) return makeQueryClient()
  if (!browserQueryClient) browserQueryClient = makeQueryClient()
  return browserQueryClient
}

const ReactQueryDevtoolsProduction = lazy(async () => {
  return import('@tanstack/react-query-devtools/production').then((d) => {
    return {
      default: d.ReactQueryDevtools,
    }
  })
})

const Providers = ({ children }: Children) => {
  const queryClient = getQueryClient()
  const [showDevtools, setShowDevtools] = useState(false)

  useEffect(() => {
    window.toggleDevtools = () => { setShowDevtools((old) => { return !old }) }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
      {showDevtools && (
        <Suspense fallback={null}>
          <ReactQueryDevtoolsProduction />
        </Suspense>
      )}
    </QueryClientProvider>
  )
}

export default Providers

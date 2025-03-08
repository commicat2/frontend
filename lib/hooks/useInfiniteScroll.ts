import { useCallback, useEffect, useRef } from 'react'

const useInfiniteScroll = ({ requirement, action }: { requirement: boolean, action: () => unknown }) => {
  const lastFetchRef = useRef(0)

  const handleScrollCallback = useCallback(async () => {
    if (requirement && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1) {
      const now = Date.now()
      if (now - lastFetchRef.current > 500) {
        const result = action()
        if (result instanceof Promise) await result
        lastFetchRef.current = now
      }
    }
  }, [requirement, action])

  useEffect(() => {
    window.addEventListener('scroll', handleScrollCallback)
    return () => { window.removeEventListener('scroll', handleScrollCallback) }
  }, [handleScrollCallback])
}

export default useInfiniteScroll

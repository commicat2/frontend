'use client'

import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useLayoutEffect, useState } from 'react'
import styles from './SearchBar.module.css'

const SearchBar = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [keyword, setKeyword] = useState('')
  const [isFocus, setIsFocus] = useState(false)

  useLayoutEffect(() => { setKeyword(searchParams.get('keyword') || '') }, [searchParams])

  const handleSubmit = useCallback((e: CommonFormEvent) => {
    e.preventDefault()
    const { value } = e.target.keyword
    router.push(`/${value ? `search/?keyword=${value}` : ''}`)
  }, [router])

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="search"
        id="keyword"
        aria-label="keyword"
        value={keyword}
        onFocus={() => { setIsFocus(true) }}
        onBlur={() => { setIsFocus(false) }}
        onChange={(e) => { setKeyword(e.target.value) }}
        maxLength={25}
      />
      <button className={styles.icon} type="submit">
        {!isFocus ? (
          <Image fill sizes="100%" src="/icon-search.png" alt="Search" />
        ) : (
          <Image fill sizes="100%" src="/icon-search2.png" alt="Search" />
        )}
      </button>
    </form>
  )
}

export default SearchBar

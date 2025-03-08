'use client'

import { useRouter } from 'next/navigation'
import { useLayoutEffect, useState } from 'react'
import Select, { SingleValue } from 'react-select'
import { checkIsCreator } from 'lib/api/queryFunctions'
import CreatorRequests from './CreatorRequests'
import ClientRequests from './ClientRequests'
import styles from './index.module.css'

const RequestsMain = () => {
  const router = useRouter()
  const [isCreator, setIsCreator] = useState(false)
  const [option, setOption] = useState<SingleValue<{ value: number; label: string; }>>({ value: 2, label: '클라이언트' })

  useLayoutEffect(() => {
    const creatorCheck = async () => {
      try {
        const { is_creator } = await checkIsCreator()
        if (is_creator) { setIsCreator(true); setOption({ value: 1, label: '크리에이터' }) }
      } catch { router.push('/sign-in') }
    }
    if (!localStorage.getItem('jas')) router.push('/sign-in')
    else creatorCheck()
  }, [router])

  return (
    <main>
      {!isCreator || (
        <div className={styles.selectContainer}>
          <Select
            className={styles.select}
            options={[
              { value: 1, label: '크리에이터' },
              { value: 2, label: '클라이언트' },
            ]}
            value={option}
            onChange={(selctedOption) => { setOption(selctedOption) }}
          />
        </div>
      )}
      {option?.value === 1 ? <CreatorRequests /> : <ClientRequests />}
    </main>
  )
}

export default RequestsMain

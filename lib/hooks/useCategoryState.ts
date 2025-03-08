import { useState } from 'react'
import { MultiValue } from 'react-select'
import { categoryToOptions } from 'lib/utils/common'

const useCategoryState = (initialCategories: string[], genre: Genre) => {
  const [categories, setCategories] = useState<SelectOption<CategoryKey, Category>[]>(
    categoryToOptions({ categories: initialCategories, genre }),
  )

  const handleCategoryChange = (options: MultiValue<SelectOption<CategoryKey, Category>>) => {
    setCategories(Array.from(options as SelectOption<CategoryKey, Category>[]))
  }

  return [categories, handleCategoryChange] as const
}

export default useCategoryState

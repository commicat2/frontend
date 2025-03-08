export const isValidEmail = (email: string) => {
  if (!email) return false
  const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
  return regex.test(email)
}
export const isValidPassword = (password: string) => {
  if (!password) return false
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+]{8,}$/
  return regex.test(password)
}
export const isValidEnglishNickname = (englishNickname: string) => {
  if (!englishNickname) return false
  const regex = /^[a-z0-9_]{2,15}$/
  return regex.test(englishNickname)
}
const isValidURL = (url: string) => {
  if (!url) return false
  const urlPattern = /^(https):\/\/[^ "]+$/
  return urlPattern.test(url)
}
export const isValidXLink = (xLink: string) => {
  if (!xLink) return false
  const regex = /x\.com/
  return regex.test(xLink) && isValidURL(xLink)
}
export const isPositiveInteger = (parameter: number) => {
  if (Number.isNaN(parameter) || parameter <= 0) return false
  return Number.isInteger(parameter)
}
export const isCategory = (category?: string) => {
  if (!category) return false
  const regex = /^[1-9A-Z]$/
  return regex.test(category)
}

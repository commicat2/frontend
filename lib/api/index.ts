import axios, { AxiosResponse } from 'axios'
import { jwtDecode } from 'jwt-decode'
import { JwtPayloadWithExp } from 'lib/JwtPayloads'

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

export const instance = axios.create({ baseURL })

export const authInstance = axios.create({ baseURL })

authInstance.interceptors.request.use(async (request) => {
  const unparsedJas = localStorage.getItem('jas')
  const jas = unparsedJas ? JSON.parse(unparsedJas) as string : ''
  const unparsedEcs = localStorage.getItem('ecs')
  const ecs = unparsedEcs ? JSON.parse(unparsedEcs) as string : ''

  if (!jas) return request

  request.headers.Authorization = `Bearer ${jas}`
  const decodedJwt = jwtDecode<JwtPayloadWithExp>(jas)
  const isExpired = Math.floor(Date.now() / 1000) >= decodedJwt.exp

  if (!isExpired) return request

  try {
    const response: AxiosResponse<Access> = await axios.post(`${baseURL}auth/jas/ecs/`, { refresh: ecs })
    const newJas: string = response.data.access
    localStorage.setItem('jas', JSON.stringify(newJas))
    request.headers.Authorization = `Bearer ${newJas}`
  } catch {
    localStorage.removeItem('jas')
    localStorage.removeItem('ecs')
  }

  return request
}, (error) => { return Promise.reject(error) })

import axios, { AxiosResponse } from 'axios'
import { jwtDecode } from 'jwt-decode'
import { instance, authInstance } from 'lib/api'
import { GENRE_MAP } from 'lib/constants'
import { JwtPayloadWithId } from 'lib/JwtPayloads'
import { createQueryString } from 'lib/utils/common'

const checkJas = () => {
  const unparsedJas = localStorage.getItem('jas')
  const jas = unparsedJas ? JSON.parse(unparsedJas) as string : ''
  if (!jas) throw new Error('유효한 토큰이 아닙니다.')
  const payload = jwtDecode<JwtPayloadWithId>(jas)
  if (!payload.user_id) throw new Error('유효한 토큰이 아닙니다.')
}

export const signUp = async (data: SignUpRequest) => {
  await instance.post('auth/sign-up/', data)
}
export const signIn = async (data: SignInRequest) => {
  const response: AxiosResponse<SignInResponse> = await instance.post('auth/sign-in/', data)
  return response.data
}
export const signInWithGoogle = async (data: GoogleSignInRequest) => {
  const response: AxiosResponse<SignInResponse> = await instance.post('auth/google/', data)
  return response.data
}
export const signOut = async (data: Ecs) => {
  await authInstance.post('auth/sign-out/', data)
}
export const disableAccount = async () => {
  checkJas()
  await authInstance.post('auth/disable-account/')
}
export const deleteAccount = async () => {
  checkJas()
  await authInstance.delete('auth/delete-account/')
}
export const checkAuthentication = async () => {
  checkJas()
  const response: AxiosResponse<Success & AuthProvider> = await authInstance.get('auth/check-authentication/')
  return response.data
}
export const checkPassword = async (data: Password) => {
  checkJas()
  await authInstance.post('auth/check-password/', data)
}
export const sendEmailVerification = async (data: Email) => {
  await instance.post('auth/send-email-verification/', data)
}
export const verifyEmail = async ({ uidb64, token }: UidbSlugs) => {
  const requestConfig = {
    headers: {
      'Cache-Control': 'max-age=0',
    },
  }
  const response: AxiosResponse<Success> = await instance.get(`auth/verify-email/${uidb64}/${token}/`, requestConfig)
  return response.data
}
export const sendPasswordReset = async (data: Email) => {
  await instance.post('auth/send-password-reset/', data)
}
export const confirmPasswordReset = async ({ uidb64, token }: UidbSlugs) => {
  const requestConfig = {
    headers: {
      'Cache-Control': 'max-age=0',
    },
  }
  const response: AxiosResponse<Success> = await instance.get(`auth/confirm-password-reset/${uidb64}/${token}/`, requestConfig)
  return response.data
}
export const updatePassword = async (data: UpdatePasswordRequest) => {
  await instance.patch('auth/update-password/', data)
}

export const checkHasUnread = async () => {
  checkJas()
  const response: AxiosResponse<CheckHasUnreadResponse> = await authInstance.get('check-has-unread/')
  return response.data
}
export const getNavInfo = async () => {
  checkJas()
  const response: AxiosResponse<GetNavInfoResponse> = await authInstance.get('nav-info/')
  return response.data
}
export const getBankInfo = async () => {
  checkJas()
  const response: AxiosResponse<GetBankInfoResponse> = await authInstance.get('bank-info/')
  return response.data
}

export const getUserSettings = async () => {
  checkJas()
  const response: AxiosResponse<GetUserSettingsResponse> = await authInstance.get('get-user-settings/')
  return response.data
}
export const updateProfileSettings = async ({ profileSettingsFormData }: UpdateProfileSettingsRequest) => {
  checkJas()
  const requestConfig = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }
  await authInstance.patch('update-profile-settings/', profileSettingsFormData, requestConfig)
}
export const updateAccountSettings = async ({
  accountSettingsFormData,
}: UpdateAccountSettingsRequest) => {
  checkJas()
  await authInstance.patch('update-account-settings/', { ...accountSettingsFormData })
}
export const updateCreatorSettings = async ({
  creatorSettingsFormData,
}: UpdateCreatorSettingsRequest) => {
  checkJas()
  await authInstance.patch('update-creator-settings/', { ...creatorSettingsFormData })
}

export const getPortfolio = async () => {
  checkJas()
  const response: AxiosResponse<PortfolioResponse> = await authInstance.get('portfolio/')
  return response.data
}
export const postPortfolio = async (data: PortfolioRequest) => {
  checkJas()
  await authInstance.post('portfolio/', data)
}
export const deletePortfolio = async () => {
  checkJas()
  await authInstance.delete('portfolio/')
}
export const getPublicPortfolio = async (id: number) => {
  const response: AxiosResponse<PublicPortfolioResponse> = await instance.get(`public-portfolio/${id}/`)
  return response.data
}

export const getNotifications = async ({ pageParam }: PageParam) => {
  checkJas()
  const response: AxiosResponse<GetNotificationsResponse> = await authInstance.get(`notifications/${pageParam ? `?cursor=${pageParam}` : ''}`)
  return response.data
}

export const checkIsCreator = async () => {
  checkJas()
  const response: AxiosResponse<CheckIsCreatorResponse> = await authInstance.get('check-is-creator/')
  return response.data
}
export const createRequest = async (data: CreateCommicatRequest, id: number) => {
  checkJas()
  await authInstance.post(`create-request/${id}/`, data)
}
export const getCreatorRequests = async () => {
  checkJas()
  const response: AxiosResponse<GetRequestsResponse> = await authInstance.get('requests/creator/')
  return response.data
}
export const getClientRequests = async () => {
  checkJas()
  const response: AxiosResponse<GetRequestsResponse> = await authInstance.get('requests/client/')
  return response.data
}
export const updateRequest = async (data: UpdateCommicatRequest) => {
  checkJas()
  await authInstance.patch(`update-request/${data.id}/`, data)
}
export const createWork = async (data: CreateWorkRequest) => {
  checkJas()
  const requestConfig = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }
  await authInstance.post('create-work/', data, requestConfig)
}

export const toggleFollowing = async (id: number) => {
  checkJas()
  const response: AxiosResponse<Success> = await authInstance.post(`toggle-following/${id}/`)
  return response.data
}
export const getFollowings = async ({ pageParam, follower }: PageParam & { follower: string }) => {
  checkJas()
  const queryString = createQueryString({ cursor: pageParam, follower })
  const response: AxiosResponse<GetFollowingsResponse> = await authInstance.get(`followings/?${queryString}`)
  return response.data
}

export const checkHasUnreadDm = async (id: number) => {
  checkJas()
  const response: AxiosResponse<CheckHasUnreadDmResponse> = await authInstance.get(`check-has-unread-dm/${id}/`)
  return response.data
}
export const createDmRoom = async (data: SendDirectMessageRequest, id: number) => {
  checkJas()
  await authInstance.post(`create-direct-message-room/${id}/`, data)
}
export const sendDirectMessage = async (data: SendDirectMessageRequest, id: number) => {
  checkJas()
  await authInstance.post(`send-direct-message/${id}/`, data)
}
export const getDirectMessageRooms = async ({ pageParam }: PageParam) => {
  checkJas()
  const response: AxiosResponse<GetDirectMessageRoomsResponse> = await authInstance.get(`direct-message-rooms/${pageParam ? `?cursor=${pageParam}` : ''}`)
  return response.data
}
export const getDirectMessages = async (id: number) => {
  checkJas()
  const response: AxiosResponse<DirectMessage[]> = await authInstance.get(`direct-messages/${id}/`)
  return response.data
}

export const getWorks = async ({
  pageParam, genre, category, keyword, hashtag,
}: GetWorksReqeust) => {
  const queryString = createQueryString({
    cursor: pageParam,
    genre: genre ? GENRE_MAP[genre] : undefined,
    category,
    keyword,
    hashtag,
  })
  const response: AxiosResponse<GetWorksResponse> = await instance.get(`works/?${queryString}`)
  return response.data
}

export const getWork = async (id: number) => {
  const requestConfig = {
    headers: {
      'Cache-Control': 'max-age=86400',
    },
  }
  const response: AxiosResponse<GetWorkDetailsResponse> = await instance.get(`work/${id}/`, requestConfig)
  return response.data
}
export const getEnglishNickname = async (id: number) => {
  const response: AxiosResponse<GetEnglishNicknameResponse> = await instance.get(`english-nickname/${id}/`)
  return response.data
}

export const getHashTags = async (genre: number, category: string) => {
  const response: AxiosResponse<string[]> = await instance.get(`work-hash-tags/${genre}/${category}/`)
  return response.data
}

export const getCreators = async ({
  pageParam, genre, category, seek_request, keyword,
}: GetCreatorsRequest) => {
  const queryString = createQueryString({
    cursor: pageParam, genre, category, seek_request, keyword,
  })
  const response: AxiosResponse<GetCreatorsResponse> = await instance.get(`creators/?${queryString}`)
  return response.data
}

export const getUsers = async ({ pageParam }: PageParam) => {
  const response: AxiosResponse<GetUsersResponse> = await instance.get(`users/${pageParam ? `?cursor=${pageParam}` : ''}`)
  return response.data
}

export const getHomePage = async (keyword?: string) => {
  const requestConfig = {
    headers: {
      'Cache-Control': 'max-age=21',
    },
  }
  const response: AxiosResponse<GetHomePageResponse> = await instance.get(`home/${keyword ? `?keyword=${keyword}` : ''}`, requestConfig)
  return response.data
}

export const checkIsMyFollowing = async (id: number) => {
  checkJas()
  const response: AxiosResponse<CheckIsFollowingsResponse> = await authInstance.get(`check-is-my-followings/${id}/`)
  return response.data
}
export const getProfilePage = async (englishNickname: string) => {
  const requestConfig = {
    headers: {
      'Cache-Control': 'max-age=0',
    },
  }
  const response: AxiosResponse<GetProfilePageResponse> = await instance.get(`profile/${englishNickname}/`, requestConfig)
  return response.data
}

export const downloadFile = async (url: string) => {
  checkJas()
  const response: AxiosResponse<BlobPart> = await axios.get(url, {
    responseType: 'blob',
    headers: {
      'Access-Control-Allow-Origin': 'https://www.commicat.com',
    },
  })
  return response.data
}

export const registerCreator = async (userId: number, data: RegisterCreatorRequest) => {
  const response: AxiosResponse<RegisterCreatorResponse> = await axios.post(`https://commicatniceapi.com/api/v1/register-creator/${userId}/`, data)
  return response.data
}

import {
  useInfiniteQuery,
  useMutation,
  useQuery,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import {
  signUp,
  signIn,
  signInWithGoogle,
  disableAccount,
  deleteAccount,
  checkPassword,
  sendPasswordReset,
  updatePassword,
  checkHasUnread,
  getNavInfo,
  getBankInfo,
  getUserSettings,
  updateProfileSettings,
  updateAccountSettings,
  updateCreatorSettings,
  getPortfolio,
  postPortfolio,
  deletePortfolio,
  getNotifications,
  createRequest,
  getCreatorRequests,
  getClientRequests,
  updateRequest,
  createWork,
  getFollowings,
  checkHasUnreadDm,
  createDmRoom,
  sendDirectMessage,
  getDirectMessageRooms,
  getDirectMessages,
  getWorks,
  getCreators,
  getUsers,
  registerCreator,
} from 'lib/api/queryFunctions'

export const useSignUp = () => {
  return useMutation<void, AxiosError<Message>, SignUpRequest>({
    mutationFn: (data) => { return signUp(data) },
  })
}
export const useSignIn = () => {
  return useMutation<SignInResponse, AxiosError<Message>, SignInRequest>({
    mutationFn: (data) => { return signIn(data) },
  })
}
export const useSignInWithGoogle = () => {
  return useMutation<SignInResponse, AxiosError<Message>, GoogleSignInRequest>({
    mutationFn: (data) => { return signInWithGoogle(data) },
  })
}
export const useDisableAccount = () => {
  return useMutation<void, AxiosError<Message>>({
    mutationFn: disableAccount,
  })
}
export const useDeleteAccount = () => {
  return useMutation<void, AxiosError<Message>>({
    mutationFn: deleteAccount,
  })
}
export const useCheckPassword = () => {
  return useMutation<void, AxiosError, Password>({
    mutationFn: (data) => { return checkPassword(data) },
  })
}
export const useSendPasswordReset = () => {
  return useMutation<void, AxiosError<Message>, Email>({
    mutationFn: (data) => { return sendPasswordReset(data) },
  })
}
export const useUpdatePassword = () => {
  return useMutation<void, AxiosError<Message>, UpdatePasswordRequest>({
    mutationFn: (data) => { return updatePassword(data) },
  })
}

export const useCheckHasUnread = () => {
  return useQuery({
    queryKey: ['checkHasUnread'],
    queryFn: checkHasUnread,
    retry: 0,
  })
}

export const useGetNavInfo = () => {
  return useQuery({
    queryKey: ['navInfo'],
    queryFn: getNavInfo,
    retry: 0,
  })
}
export const useGetBankInfo = () => {
  return useQuery<GetBankInfoResponse, AxiosError<Message>>({
    queryKey: ['bankInfo'],
    queryFn: getBankInfo,
  })
}

export const useGetUserSettings = () => {
  return useQuery({
    queryKey: ['getUserSettings'],
    queryFn: getUserSettings,
    retry: 0,
  })
}
export const useUpdateProfileSettings = () => {
  return useMutation<void, AxiosError<UpdateProfileSettingsError>, UpdateProfileSettingsRequest>({
    mutationFn: (data) => { return updateProfileSettings(data) },
  })
}
export const useUpdateAccountSettings = () => {
  return useMutation<void, AxiosError<Email>, UpdateAccountSettingsRequest>({
    mutationFn: (data) => { return updateAccountSettings(data) },
  })
}
export const useUpdateCreatorSettings = () => {
  return useMutation<void, AxiosError, UpdateCreatorSettingsRequest>({
    mutationFn: (data) => { return updateCreatorSettings(data) },
  })
}

export const useGetPortfolio = () => {
  return useQuery({
    queryKey: ['getPortfolio'],
    queryFn: getPortfolio,
  })
}
export const usePostPortfolio = () => {
  return useMutation<void, AxiosError<Message>, PortfolioRequest>({
    mutationFn: (data) => { return postPortfolio(data) },
  })
}
export const useDeletePortfolio = () => {
  return useMutation<void, AxiosError<Message>, void>({
    mutationFn: deletePortfolio,
  })
}

export const useGetNotifications = () => {
  return useInfiniteQuery({
    queryKey: ['notifications'],
    queryFn: ({ pageParam }) => { return getNotifications({ pageParam }) },
    initialPageParam: '',
    getNextPageParam: (lastPage) => {
      if (!lastPage?.next) return null
      return new URLSearchParams(lastPage.next.split('?')[1]).get('cursor')
    },
    getPreviousPageParam: (firstPage) => {
      if (!firstPage?.previous) return null
      return new URLSearchParams(firstPage.previous.split('?')[1]).get('cursor')
    },
    retry: 0,
  })
}

export const useCreateRequest = (id: number) => {
  return useMutation<void, AxiosError<Message>, CreateCommicatRequest>({
    mutationFn: (data) => { return createRequest(data, id) },
  })
}
export const useGetCreatorRequests = () => {
  return useQuery({
    queryKey: ['creatorRequests'],
    queryFn: getCreatorRequests,
  })
}
export const useGetClientRequests = () => {
  return useQuery({
    queryKey: ['clientRequests'],
    queryFn: getClientRequests,
  })
}
export const useUpdateRequest = () => {
  return useMutation<void, AxiosError<Message>, UpdateCommicatRequest>({
    mutationFn: (data) => { return updateRequest(data) },
  })
}
export const useCreateWork = () => {
  return useMutation<void, AxiosError<Message>, CreateWorkRequest>({
    mutationFn: (data) => { return createWork(data) },
  })
}

export const useGetFollowings = (follower: string) => {
  return useInfiniteQuery({
    queryKey: ['followings', follower],
    queryFn: ({ pageParam }) => { return getFollowings({ pageParam, follower }) },
    initialPageParam: '',
    getNextPageParam: (lastPage) => {
      if (!lastPage?.next) return null
      return new URLSearchParams(lastPage.next.split('?')[1]).get('cursor')
    },
    getPreviousPageParam: (firstPage) => {
      if (!firstPage?.previous) return null
      return new URLSearchParams(firstPage.previous.split('?')[1]).get('cursor')
    },
    retry: 0,
  })
}

export const useCheckHasUnreadDm = (id: number) => {
  return useQuery({
    queryKey: ['checkHasUnreadDm', id],
    queryFn: () => { return checkHasUnreadDm(id) },
  })
}
export const useGetDirectMessageRooms = () => {
  return useInfiniteQuery({
    queryKey: ['directMessageRooms'],
    queryFn: ({ pageParam }) => { return getDirectMessageRooms({ pageParam }) },
    initialPageParam: '',
    getNextPageParam: (lastPage) => {
      if (!lastPage?.next) return null
      return new URLSearchParams(lastPage.next.split('?')[1]).get('cursor')
    },
    getPreviousPageParam: (firstPage) => {
      if (!firstPage?.previous) return null
      return new URLSearchParams(firstPage.previous.split('?')[1]).get('cursor')
    },
    retry: 0,
  })
}
export const useGetDirectMessages = (id: number) => {
  return useQuery({
    queryKey: ['directMessages', id],
    queryFn: () => { return getDirectMessages(id) },
  })
}
export const useSendDirectMessage = (id: number) => {
  return useMutation<void, AxiosError<Message>, SendDirectMessageRequest>({
    mutationFn: (data) => { return sendDirectMessage(data, id) },
  })
}
export const useCreateDmRoom = (id: number) => {
  return useMutation<void, AxiosError<Message>, SendDirectMessageRequest>({
    mutationFn: (data) => { return createDmRoom(data, id) },
  })
}

export const useGetWorks = ({
  genre = 'image', category, keyword, hashtag,
}: GetWorksReqeust) => {
  return useInfiniteQuery({
    queryKey: ['works', genre, category, keyword, hashtag],
    queryFn: ({ pageParam }) => {
      return getWorks({
        pageParam, genre, category, keyword, hashtag,
      })
    },
    initialPageParam: '',
    getNextPageParam: (lastPage) => {
      if (!lastPage?.next) return null
      return new URLSearchParams(lastPage.next.split('?')[1]).get('cursor')
    },
    getPreviousPageParam: (firstPage) => {
      if (!firstPage?.previous) return null
      return new URLSearchParams(firstPage.previous.split('?')[1]).get('cursor')
    },
  })
}

export const useGetCreators = ({
  genre = 'all', category = '', seek_request = '', keyword = '',
}: GetCreatorsRequest) => {
  return useInfiniteQuery({
    queryKey: ['creators', genre, category, seek_request, keyword],
    queryFn: ({ pageParam }) => {
      return getCreators({
        pageParam, genre, category, seek_request, keyword,
      })
    },
    initialPageParam: '',
    getNextPageParam: (lastPage) => {
      if (!lastPage?.next) return undefined
      return new URLSearchParams(lastPage.next.split('?')[1]).get('cursor')
    },
    getPreviousPageParam: (firstPage) => {
      if (!firstPage?.previous) return undefined
      return new URLSearchParams(firstPage.previous.split('?')[1]).get('cursor')
    },
  })
}

export const useGetUsers = () => {
  return useInfiniteQuery({
    queryKey: ['users'],
    queryFn: ({ pageParam }) => { return getUsers({ pageParam }) },
    initialPageParam: '',
    getNextPageParam: (lastPage) => {
      if (!lastPage?.next) return null
      return new URLSearchParams(lastPage.next.split('?')[1]).get('cursor')
    },
    getPreviousPageParam: (firstPage) => {
      if (!firstPage?.previous) return null
      return new URLSearchParams(firstPage.previous.split('?')[1]).get('cursor')
    },
  })
}

export const useRegisterCreator = (userId: number) => {
  return useMutation<RegisterCreatorResponse, AxiosError<Message>, RegisterCreatorRequest>({
    mutationFn: (data) => { return registerCreator(userId, data) },
  })
}

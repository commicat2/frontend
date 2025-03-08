type Genre = 'all' | 'image' | 'audio' | 'video' | 'text' | 'other'
type GenreKr = '전체' | '이미지' | '오디오' | '비디오' | '텍스트' | '기타'
type GenreNumber = 1 | 2 | 3 | 4 | 5
type StatusNumber = 1 | 2 | 3 | 4 | 5
type GenreKey = '0' | '1' | '2' | '3' | '4' | '5'
type DefaultSelect = 'Select...'
type ImageCategory = '일러스트' | '2D 버츄얼' | '3D 버츄얼' | '리깅' | '디자인' | '원화' | 'CG' | 'GIF' | '피드백' | '만화' | '리터칭' | '사진' | '기타(이미지)'
type AudioCategory = '음악' | '음향' | '믹싱' | '보이스' | '더빙' | '기타(오디오)'
type VideoCategory = '영상편집' | '모션그래픽' | '애니메이션' | '기타(비디오)'
type TextCategory = '소설' | '시나리오' | '작사' | '번역' | '피드백' | '기타(텍스트)'
type OtherCategory = 'AI 컨텐츠' | '프로그래밍' | '코드 리뷰' | '기타'
type Category = '전체' | ImageCategory | AudioCategory | VideoCategory | TextCategory | OtherCategory | DefaultSelect
type CategoryKey = '' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'
type CategoryNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35
type DmOption = '비허용' | '작업중에만 허용' | '허용'
type DmNumber = 0 | 1 | 2
type BadgeOption = 'seekRequest' | 'seekRequestButton' | 'notSeekRequest' | 'copyrightTransfer' | 'hidden' | 'anonymous' | 'dm' | 'dmOptional' | 'image' | 'audio' | 'video' | 'text' | 'other' | 'detail' | 'accept' | 'reject'

// common
interface Children extends Readonly<{ children: React.ReactNode }> { }
interface ClassName extends Readonly<{ className?: string }> { }
interface SetState<T> extends React.Dispatch<React.SetStateAction<T>> { }
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }
interface SearchParams { searchParams: { [key: string]: string | undefined } }
interface PageParam { pageParam: string }
interface Access { access: string }
interface AuthProvider { auth_provider: string }
interface Slug { slug: string }
interface Id { id: number }
interface Email { email: string }
interface SetEmail { setEmail: SetState<string> }
interface Password { password: string }
interface Password2 { password2: string }
interface Ecs { ecs: string }
interface Jas { jas: string }
interface Success { success: boolean }
interface Message { message: string }
interface Keyword { keyword?: string }
interface MessageError { response?: { data?: { message?: string } } }
interface UidbSlugs { uidb64: string; token: string }
interface SelectOption<T, U> { value: T; label: U }
interface CommonFormEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement & {
    email: HTMLInputElement
    password: HTMLInputElement
    password2: HTMLInputElement
    option: HTMLInputElement
    content: HTMLInputElement
    keyword: HTMLInputElement
    amount: HTMLInputElement
    dec_name: HTMLInputElement
  }
}

interface AccountSettings {
  auth_provider: string
  email: string
  is_verified: boolean
  is_creator: boolean
  allow_send_email: boolean
  bank_account_name: string | null
  bank_account_bank_name: string | null
  bank_account_number: string | null
}
interface ProfileSettings {
  nickname: string | null
  english_nickname: string | null
  profile_pic: string | null
  profile_bg: string | null
  intro: string | null
  x_link: string | null
  show_x_link: boolean
}
interface CreatorSettings {
  allow_image_category: string[]
  allow_audio_category: string[]
  allow_video_category: string[]
  allow_text_category: string[]
  allow_other_category: string[]
  fee: number | string
  is_partner: boolean
  x_ad: boolean
  seek_request: boolean
  allow_copyright_transfer: boolean
  allow_hidden: boolean
  allow_hidden_only: boolean
  allow_anonymous: boolean
  allow_dm: DmNumber
  min_amount_image: number
  response_expiration_days_image: number
  complete_expiration_days_image: number
  response_total_days_image: number
  response_total_image: number
  complete_total_days_image: number
  complete_total_image: number
  expire_total_image: number
  min_amount_audio: number
  response_expiration_days_audio: number
  complete_expiration_days_audio: number
  response_total_days_audio: number
  response_total_audio: number
  complete_total_days_audio: number
  complete_total_audio: number
  expire_total_audio: number
  min_amount_video: number
  response_expiration_days_video: number
  complete_expiration_days_video: number
  response_total_days_video: number
  response_total_video: number
  complete_total_days_video: number
  complete_total_video: number
  expire_total_video: number
  min_amount_text: number
  response_expiration_days_text: number
  complete_expiration_days_text: number
  response_total_days_text: number
  response_total_text: number
  complete_total_days_text: number
  complete_total_text: number
  expire_total_text: number
  min_amount_other: number
  response_expiration_days_other: number
  complete_expiration_days_other: number
  response_total_days_other: number
  response_total_other: number
  complete_total_days_other: number
  complete_total_other: number
  expire_total_other: number
  portfolio: number | null
}

interface CreatorInput {
  allow_image_category: string[]
  allow_audio_category: string[]
  allow_video_category: string[]
  allow_text_category: string[]
  allow_other_category: string[]
  fee: number | string
  x_ad: boolean
  seek_request: boolean
  allow_copyright_transfer: boolean
  allow_hidden: boolean
  allow_hidden_only: boolean
  allow_anonymous: boolean
  allow_dm: DmNumber
  response_total_days_image: number
  response_total_image: number
  complete_total_days_image: number
  complete_total_image: number
  expire_total_image: number
  response_total_days_audio: number
  response_total_audio: number
  complete_total_days_audio: number
  complete_total_audio: number
  expire_total_audio: number
  response_total_days_video: number
  response_total_video: number
  complete_total_days_video: number
  complete_total_video: number
  expire_total_video: number
  response_total_days_text: number
  response_total_text: number
  complete_total_days_text: number
  complete_total_text: number
  expire_total_text: number
  response_total_days_other: number
  response_total_other: number
  complete_total_days_other: number
  complete_total_other: number
  expire_total_other: number
  min_amount_image: number | string
  response_expiration_days_image: number | string
  complete_expiration_days_image: number | string
  min_amount_audio: number | string
  response_expiration_days_audio: number | string
  complete_expiration_days_audio: number | string
  min_amount_video: number | string
  response_expiration_days_video: number | string
  complete_expiration_days_video: number | string
  min_amount_text: number | string
  response_expiration_days_text: number | string
  complete_expiration_days_text: number | string
  min_amount_other: number | string
  response_expiration_days_other: number | string
  complete_expiration_days_other: number | string
}

interface ProfileSettingFormEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement & {
    english_nickname?: { value: string }
    nickname?: { value: string }
    profile_pic?: { value: File }
    profile_bg?: { value: File }
    intro?: { value: string }
    x_link?: { value: string }
    show_x_link?: { value: boolean }
  }
}

// component
interface CommonInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  comment?: string
}
interface ModalComponentProps {
  title?: string
  content?: string
  closeModal: () => void
  returnResult: (param?: string) => void
}
interface CroppieOptions {
  width: number
  height: number
  name: string
  path: string
  option: string
}

// api
interface PaginationResponse<T> {
  next: string | null
  previous: string | null
  results: T[]
}
interface UidbSlugsResponse extends UidbSlugs, Success, Message { }
interface SignUpRequest extends Email, Password { }
interface SignInRequest extends Email, Password { }
interface SignInResponse extends Jas, Ecs { is_registered: boolean }
interface GoogleSignInRequest { access: string }
interface GoogleSignInResponse { credential: string }
interface UpdatePasswordRequest extends Password, UidbSlugs { }
interface ProfileSettingFormData extends FormData {
  nickname?: string | null
  english_nickname?: string | null
  profile_pic?: Blob | string
  profile_bg?: Blob | string
  intro?: string | null
  x_link?: string | null
  show_x_link?: boolean
}
interface AccountSettingFormData {
  email?: string
  allow_send_email?: boolean
  bank_account_name?: string
  bank_account_bank_name?: string
  bank_account_number?: string
}
interface CreatorSettingFormData {
  fee?: number
  seek_request?: boolean
  allow_hidden?: boolean
  allow_hidden_only?: boolean
  allow_anonymous?: boolean
  allow_copyright_transfer?: boolean
  allow_dm?: DmNumber
  x_ad?: boolean
  min_amount_image?: number
  response_expiration_days_image?: number
  complete_expiration_days_image?: number
  min_amount_audio?: number
  response_expiration_days_audio?: number
  complete_expiration_days_audio?: number
  min_amount_video?: number
  response_expiration_days_video?: number
  complete_expiration_days_video?: number
  min_amount_text?: number
  response_expiration_days_text?: number
  complete_expiration_days_text?: number
  min_amount_other?: number
  response_expiration_days_other?: number
  complete_expiration_days_other?: number
  allow_image_category?: string[]
  allow_audio_category?: string[]
  allow_video_category?: string[]
  allow_text_category?: string[]
  allow_other_category?: string[]
}
interface GetUserSettingsResponse extends AccountSettings {
  id: number
  profile: ProfileSettings
  creator_profile?: CreatorSettings
}
interface UpdateAccountSettingsRequest { accountSettingsFormData: AccountSettingFormData }
interface UpdateProfileSettingsRequest { profileSettingsFormData: ProfileSettingFormData }
interface UpdateCreatorSettingsRequest { creatorSettingsFormData: CreatorSettingFormData }
interface UpdateProfileSettingsError { english_nickname?: string, nickname?: string }
interface PortfolioRequest extends FormData {
  content?: string
  image1?: File
  image2?: File
  image3?: File
  image4?: File
  image5?: File
  image6?: File
  image7?: File
  image8?: File
  image9?: File
  image10?: File
}
interface PortfolioResponse {
  content: string
  image1?: string | null
  image2?: string | null
  image3?: string | null
  image4?: string | null
  image5?: string | null
  image6?: string | null
  image7?: string | null
  image8?: string | null
  image9?: string | null
  image10?: string | null
}
interface PublicPortfolioResponse {
  content: string
}
// checkHasUnread
interface CheckHasUnreadResponse {
  has_unread_notification: boolean
  has_unread_request: boolean
  has_unread_dm: boolean
}
// checkHasUnreadDm
interface CheckHasUnreadDmResponse {
  has_unread_dm: boolean
}
// checkIsCreator
interface CheckIsCreatorResponse {
  is_creator: boolean
}
// getNavInfo
interface GetNavInfoResponse {
  profile_pic: string | null
  english_nickname: string | null
  user: CheckHasUnreadResponse
}
// getBankInfo
interface GetBankInfoResponse {
  is_registered: boolean
  is_verified: boolean
  auth_provider: string
  bank_account_name: string | null
  bank_account_bank_name: string | null
  bank_account_number: string | null
}
// getNotifications
interface NotificationCard {
  id: number
  content: string
  dt_created: string
}
interface GetNotificationsResponse extends PaginationResponse<NotificationCard> { }
// getRequests
interface CommicatRequest {
  id: number
  genre: GenreNumber
  category: string
  content: string
  amount: number
  amount_excluding_fee: number
  copyright_transfer: boolean
  hidden: boolean
  anonymous: boolean
  status: number
  file1: string | null
  file2: string | null
  file3: string | null
  expiration_reason: string | null
  complete_expiration_days: number
  dt_expiration: string | null
  dt_created: string
  creator: {
    nickname: string
    english_nickname: string | null
  }
  client: {
    nickname: string | null
    english_nickname: string | null
    bank_account_name: string | null
  }
  work: number
}
interface GetRequestsResponse {
  1: CommicatRequest[]
  2: CommicatRequest[]
  3: CommicatRequest[]
  4: CommicatRequest[]
  5: CommicatRequest[]
}
// getDirectMessageRooms
interface DirectMessageRoom {
  id: number
  creator_profile: UserCard
  client_profile: UserCard
  last_message: string | null
  creator_unread: boolean
  client_unread: boolean
  dt_updated: string
}
interface GetDirectMessageRoomsResponse extends PaginationResponse<DirectMessageRoom> { }
// getDirectMessages
interface DirectMessage {
  id: number
  sender: number | null
  content: string
}
// sendDirectMessage
interface SendDirectMessageRequest {
  content: string
}
// getFollowings
interface GetFollowingsResponse extends PaginationResponse<CreatorCard> { }
// getWorks
interface WorkThumbnail {
  id: number
  sample_genre: number
  thumbnail: string | null
  thumbnail_playable?: string
}
interface WorkThumbnails {
  1: WorkThumbnail[]
  2: WorkThumbnail[]
  3: WorkThumbnail[]
  4: WorkThumbnail[]
  5: WorkThumbnail[]
}
interface GetWorksReqeust {
  pageParam?: string
  genre?: Genre
  category?: CategoryKey
  keyword?: string
  hashtag?: string
}
interface GetWorksResponse extends PaginationResponse<WorkThumbnail> { }
// getWork
interface WorkDetails {
  content: string
  genre: GenreNumber
  sample1: string | null
  sample2: string | null
  sample3: string | null
  text_sample: string | null
}
interface WorkCreator {
  id: number
  nickname: string
  profile_pic: string | null
  seek_request: boolean
}
interface WorkClient {
  id: number
  nickname: string | null
}
interface GetWorkDetailsResponse extends WorkDetails {
  creator: WorkCreator
  client: WorkClient
}
interface GetEnglishNicknameResponse {
  english_nickname: string | null
}
// getUsers
interface UserCard {
  pk: number
  english_nickname: string
  nickname: string
  profile_pic: string | null
}
interface GetUsersResponse extends PaginationResponse<UserCard> { }
// getCreators
interface CreatorCard extends UserCard {
  profile_bg: string | null
  intro: string | null
  creator_profile: {
    seek_request: boolean
    allow_copyright_transfer: boolean
    allow_hidden: boolean
    allow_anonymous: boolean
    allow_dm: DmNumber
    allow_image: boolean
    allow_audio: boolean
    allow_video: boolean
    allow_text: boolean
    allow_other: boolean
  }
}
interface GetCreatorsRequest {
  pageParam?: string
  genre?: Genre
  keyword?: string
  category?: CategoryKey
  seek_request?: string
}
interface GetCreatorsResponse extends PaginationResponse<CreatorCard> { }
// getHomePage
interface GetHomePageResponse {
  image_works: WorkThumbnail[]
  audio_works: WorkThumbnail[]
  video_works: WorkThumbnail[]
  text_works: WorkThumbnail[]
  other_works: WorkThumbnail[]
  creators: CreatorCard[]
  users: UserCard[]
}
// getProfilePage
interface GetProfilePageResponse {
  id: number
  profile: ProfileSettings
  creator_profile: CreatorSettings | null
  client_works: WorkThumbnails
  creator_works: WorkThumbnails
}
interface CheckIsFollowingsResponse {
  is_following: boolean
}
// createRequest
interface RequestInput {
  copyrightTransfer: boolean
  hidden: boolean
  anonymous: boolean
}
interface CreateCommicatRequest {
  genre: GenreNumber
  category: string
  content: string
  amount: number
  amount_excluding_fee: number
  copyright_transfer: boolean
  hidden: boolean
  anonymous: boolean
  status: number
  response_expiration_days: number
  complete_expiration_days: number
}
interface UpdateCommicatRequest {
  id: number
  status: number
  reject_reason?: string
  expiration_reason?: string
}

interface CreateWorkRequest {
  request_id: number
  genre: 1 | 2 | 3 | 4 | 5
  sample_genre: 1 | 2 | 3 | 4 | 5
  file1?: File
  file2?: File
  file3?: File
  thumbnail?: File
  sample1?: File
  sample2?: File
  sample3?: File
  text_sample?: string
  hash_tag1?: string
  hash_tag2?: string
  hash_tag3?: string
}

// registerCreator
interface RegisterCreatorResponse {
  token_version_id: string
  integrity_value: string
  site_code: string
  enc_jumin_id: string
  enc_name: string
}

interface RegisterCreatorRequest {
  cd: string
  ci: string
}

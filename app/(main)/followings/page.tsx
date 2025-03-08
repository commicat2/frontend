import FollowingsMain from 'components/pages/FollowingsMain'

export const metadata = { title: '팔로잉 | Commicat' }

const Page = ({ searchParams }: SearchParams) => { return <FollowingsMain follower={searchParams.follower || ''} /> }

export default Page

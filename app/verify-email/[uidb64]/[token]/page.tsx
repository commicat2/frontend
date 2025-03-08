import { verifyEmail } from 'lib/api/queryFunctions'
import VerifyEmailMain from 'components/pages/VerifyEmailMain'

export const metadata = { title: '이메일 인증 | Commicat' }
export const revalidate = 0

const Page = async ({ params }: { params: UidbSlugs }) => {
  const { uidb64, token } = params
  let success = false
  try {
    const data = await verifyEmail({ uidb64, token })
    if (data) success = data.success
  } catch { /* ignore error */ }

  return <VerifyEmailMain success={success} />
}

export default Page

import { confirmPasswordReset } from 'lib/api/queryFunctions'
import UpdatePasswordMain from 'components/pages/UpdatePasswordMain'

export const metadata = { title: '비밀번호 변경 | Commicat' }
export const revalidate = 0

const Page = async ({ params }: { params: UidbSlugs }) => {
  const { uidb64, token } = params
  let success = false
  try {
    const data = await confirmPasswordReset({ uidb64, token })
    if (data) success = data.success
  } catch { /* ignore error */ }

  return <UpdatePasswordMain success={success} uidb64={uidb64} token={token} />
}

export default Page

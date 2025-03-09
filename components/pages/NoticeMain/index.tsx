import NotFoundMain from 'components/pages/NotFoundMain'
import NoticeA from './NoticeA'
import NoticeB from './NoticeB'
import NoticeC from './NoticeC'
import NoticeD from './NoticeD'

const NoticeMain = ({
  id,
}: Id) => {
  let SelectedNotice
  if (id === 1) {
    SelectedNotice = NoticeA
  } else if (id === 2) {
    SelectedNotice = NoticeB
  } else if (id === 3) {
    SelectedNotice = NoticeC
  } else if (id === 4) {
    SelectedNotice = NoticeD
  } else {
    SelectedNotice = NotFoundMain
  }
  return <SelectedNotice />
}

export default NoticeMain

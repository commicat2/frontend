import Image from 'next/image'
import { getElapsedTime } from 'lib/utils/common'
import styles from './DmRoomList.module.css'

const DmRoomList = ({
  rooms, selectedId, setSelectedId, myId,
}: {
  rooms: DirectMessageRoom[], selectedId: number, setSelectedId: SetState<number>, myId: number
}) => {
  return (
    <>
      {rooms.map((room) => {
        const isMyRoom = room.creator_profile.pk === myId
        const unread = isMyRoom ? room.creator_unread : room.client_unread
        const profilePic = isMyRoom ? room.client_profile.profile_pic : room.creator_profile.profile_pic
        const nickname = isMyRoom ? room.client_profile.nickname : room.creator_profile.nickname
        return (
          <button
            key={room.id}
            className={`${styles.card} ${selectedId === room.id ? styles.selected : ''}`}
            type="button"
            onClick={() => { setSelectedId(room.id) }}
          >
            <div className={styles.profilePic}>
              <Image
                fill
                sizes="100%"
                priority
                src={profilePic || '/default_profile_pic.jpg'}
                alt="Profile"
              />
            </div>
            <div className={styles.right}>
              <p className={styles.nickname}>{nickname}</p>
              <p className={styles.message}>{room.last_message}</p>
            </div>
            <div className={styles.dtUpdated}>
              <p className={styles.dt}>{getElapsedTime(room.dt_updated) || '1분 전'}</p>
            </div>
            {selectedId !== room.id && unread && <div className={styles.unread}>N</div>}
          </button>
        )
      })}
    </>
  )
}

export default DmRoomList

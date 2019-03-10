import { useEffect } from 'react'

export const useAvatar = (avatar, username, userId, fetchAvatar) => {
  useEffect(
    () => {
      if ((avatar === undefined || avatar === null) && username && userId) {
        fetchAvatar(username, userId)
      }
    },
    [username, userId]
  )
}

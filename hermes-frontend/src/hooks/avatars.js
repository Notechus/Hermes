import { useEffect } from 'react'

export const useAvatar = (avatar, userId, fetchAvatar) => {
  useEffect(
    () => {
      if ((avatar === undefined || avatar === null) && userId) {
        fetchAvatar(userId)
      }
    },
    [userId]
  )
}

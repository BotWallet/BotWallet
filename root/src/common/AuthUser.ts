import {User} from '@app-models'

export const AuthUser = async (id: number) => {
  const uid = String(id)
  const user = await User.findById(uid)

  if (user) {
    return user
  }
  else {
    return false
  }
}

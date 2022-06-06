import User from '../models/user'

export const userExists = async (email = '') => {
  const user = await User.findOne({ where: { email } })
  if(user) {
    throw new Error(`This user already exists ${email}`)
  }
  return true
}
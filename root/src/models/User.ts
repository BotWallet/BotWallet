import mongoose, {Document} from 'mongoose'

export interface ICategory {
  name: string
  children: ICategory[]
}

export interface IUser extends Document {
  _id: string
  created: number
  username: string
  name: string
  lastActivity: number
  totalBalance: number
  category: ICategory[]
}

export const UserSchema = new mongoose.Schema(
  {
    _id: String,
    created: Number,
    username: String,
    name: String,
    lastActivity: Number,
    totalBalance: Number,
    category: [
      {
        id: String,
        name: String,
        children: Array,
      },
    ],
  },
)

export const User = mongoose.model<IUser>('User', UserSchema)


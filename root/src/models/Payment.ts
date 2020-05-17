import mongoose, {Document} from 'mongoose'

export interface IPayment extends Document {
  userId: string
  amount: number
  date: number
  category: string
}

export const PaymentSchema = new mongoose.Schema({
  userId: String,
  amount: Number,
  date: Number,
  category: String,
})

export const Payment = mongoose.model<IPayment>('Payment', PaymentSchema)

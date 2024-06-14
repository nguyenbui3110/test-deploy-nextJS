export interface IMyAccount {
  address: string
  id?: number
  fullName: string
  username: string
  introduction: string
  phoneNumber: string
  email: string
  city: string
  avatarUrl?: string
  createdAt?: string
  isDeleted?: boolean
  isHost?: boolean
}

export interface IMyAccountUpdate {
  fullName: string
  introduction: string
  phoneNumber: string
  email: string
  city: string
  address: string
  avatarUrl: string
}

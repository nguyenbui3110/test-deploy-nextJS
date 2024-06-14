export const DEFAULT_DATA_REVIEW = {
  rating: 3,
  content: '',
}

export interface IHostInfo {
  id: number
  userId: number
  name: string
  introduction: string
  avatarUrl: string
  address: string
  city: string
  joinedAt: string
  numberOfReviews: number
  rating: number
}

export interface IHostReview {
  content: string
  id: number
  rating: number
  reviewTime: string
  reviewerAvatarUrl: string
  reviewerId: number
  reviewerName: string
  userId: number
}

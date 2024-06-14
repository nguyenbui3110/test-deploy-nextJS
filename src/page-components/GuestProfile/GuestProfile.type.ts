export interface IGuestInfo {
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

export interface IGuestReview {
  content: string
  id: number
  rating: number
  reviewTime: string
  reviewerAvatarUrl: string
  reviewerId: number
  reviewerName: string
  userId: number
}

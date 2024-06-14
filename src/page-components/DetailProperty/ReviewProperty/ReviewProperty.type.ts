export interface IReviewProperty {
  id: number
  propertyId: number
  guestId: number
  userId: number
  guestName: string
  guestAvatarUrl: string
  cleanliness: number
  communication: number
  checkIn: number
  accuracy: number
  location: number
  value: number
  averageRating: number
  content: string
  reviewTime: string
}

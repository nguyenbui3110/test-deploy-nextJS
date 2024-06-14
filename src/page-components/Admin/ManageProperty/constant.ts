import { Attachments } from '@/src/page-components/DetailProperty/Attachments'
export interface PropertyType {
  id: number
  type: string
  bedCount: number
  bathroomCount: number
  maxGuestCount: number
  latitude: number
  longitude: number
  address: string
  city: string
  isFavorite: false
  hostId: number
  hostName: string
  rating: number
  numberOfReviews: number
  pricePerNight: number
  title: string
  description: string
  propertyImages: Attachments[]
  propertyUtilities: []
  status: string
  rejectionReason: string
}
interface Attachments {
  id: number
  url: string
  propertyId: number
}

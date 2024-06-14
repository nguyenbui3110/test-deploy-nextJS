export enum PropertyStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  AVAIABLE = 'Available',
  UNAVAIABLE = 'Unavailable',
}
export enum PropertyType {
  ROOM = 'Room',
  HOUSE = 'House',
  APARTMENT = 'Apartment',
  HOMESTAY = 'Homestay',
}

export interface IProperty {
  id: number
  type: PropertyType
  bedCount: number
  bathroomCount: number
  maxGuestCount: number
  latitude: number
  longitude: number
  address: string
  city: string
  isFavorite: boolean
  hostId: number
  hostName: string
  rating: number
  numberOfReviews: number
  title: string
  description: string
  propertyImages: IPropertyImage[]
  propertyUtilities: any[]
  status: PropertyStatus
  pricePerNight: number
  rejectionReason: string | null
}

export interface IPropertyDetail extends IProperty {
  description: string
}

export interface IPropertyImage {
  id: number
  url: string
  propertyId: number
}

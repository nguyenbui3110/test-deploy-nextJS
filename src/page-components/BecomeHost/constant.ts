export type FileObject = {
  name: string
  type: string
  size: number
}
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}
export function getStyles(name: string, utilities: readonly string[], theme) {
  return {
    fontWeight:
      utilities.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}
export const listUtilities = [
  'Wifi',
  'Tv',
  'Kitchen',
  'AirConditioning',
  'LaptopFriendlyWorkspace',
  'HotWater',
  'Breakfast',
  'RoomService',
  'Bar',
  'SwimmingPool',
  'Gym',
  'Spa',
  'BeachFront',
  'MountainView',
  'LakeView',
  'SeaView',
  'LandmarkView',
  'WheelchairAccessible',
  'Elevator',
  'SecurityCamera',
  'CamperFriendly',
]

export interface PropertyUtilitiesType {
  [key: string]: boolean | number
  isAirConditioning: boolean
  isBar: boolean
  isBeachFront: boolean
  isBreakfast: boolean
  isCamperFriendly: boolean
  isElevator: boolean
  isGym: boolean
  isHotWater: boolean
  isKitchen: boolean
  isLakeView: boolean
  isLandmarkView: boolean
  isLaptopFriendlyWorkspace: boolean
  isMountainView: boolean
  isRoomService: boolean
  isSeaView: boolean
  isSecurityCamera: boolean
  isSpa: boolean
  isSwimmingPool: boolean
  isTv: boolean
  isWheelchairAccessible: boolean
  isWifi: boolean
  propertyId: number
}
export interface PropertyInfoPost {
  type: 'Room' | 'HomeStay' | 'House' | 'Apartment'
  bedCount: number
  bedroomCount: number
  bathroomCount: number
  maxGuestCount: number
  title: string
  description: string
  latitude: number
  longitude: number
  address: string
  city: string
  propertyImages?: { url: string }[] | undefined
  propertyUtilities?: any
  status?: 'Pending'
  rejectionReason?: string
  paymentInfo?: {
    bankName: string
    accountNumber: string
    accountHolder: string
  }
  pricePerNight?: number
}

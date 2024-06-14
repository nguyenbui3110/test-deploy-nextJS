export interface IBookingOfGuest {
  id: number
  propertyId: number
  propertyName: string
  hostId: number
  hostName: string
  hostEmail: string
  hostPhoneNumber: string
  status: string
  checkInDate: string
  checkOutDate: string
  numberOfDays: number
  numberOfGuest: number
  note: string
  totalPrice: number
  checkInCode: null | string
}

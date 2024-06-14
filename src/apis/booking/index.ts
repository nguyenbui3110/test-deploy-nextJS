import { BACK_END_API_URL } from '@/src/constant'
import { http } from '@/src/library/http'
import { IBookingInfo } from '@/src/page-components/DetailProperty/constant'
import { IBookingOfGuest } from '@/src/page-components/GuestManageBookings/constant'

const BOOKING_PATH = `${BACK_END_API_URL}/api/bookings`

export const createBooking = (data) => {
  return http.post<{ data: IBookingInfo }>(`${BOOKING_PATH}`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
export const getListBookingOfproperty = (propertyId, fromDate, toDate) => {
  return http.get<{ data }>(
    `${BOOKING_PATH}/property/${propertyId}?fromDate=${fromDate}&toDate=${toDate}`
  )
}

export const getListBookingOfGuest = (guestId, currentPage) => {
  return http.get<{ data: IBookingOfGuest[]; totalPages: number }>(
    `${BOOKING_PATH}/guest/${guestId}?OrderBy=CreatedAt&IsDescending=true&PageSize=7&PageIndex=${currentPage}`
  )
}

export const updateStatusBooking = (bookingId, status) => {
  return http.put(`${BOOKING_PATH}/${bookingId}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  })
}

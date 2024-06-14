import { BACK_END_API_URL } from '@/src/constant'
import { http } from '@/src/library/http'
import { IBookingOfGuest } from '@/src/page-components/GuestManageBookings/constant'

const CANCELLATION_PATH = `${BACK_END_API_URL}/api/cancellations`

export const createCancellationTicket = (data) => {
  return http.post(`${CANCELLATION_PATH}`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

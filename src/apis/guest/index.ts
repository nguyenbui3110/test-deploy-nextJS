import {
  BACK_END_API_URL,
  DEFAULT_PAGE_SIZE_REVIEW_PROPERTY,
} from '@/src/constant'
import { http } from '@/src/library/http'
import { IGuestInfo } from '@/src/page-components/GuestProfile/GuestProfile.type'

const GUEST_PATH = `${BACK_END_API_URL}/api/guests`

export const getGuestInfo = (id) => {
  return http.get<{ data: IGuestInfo }>(`${GUEST_PATH}/${id}`)
}
export const CheckGuestStayedInPropertyOfHost = (guestId: number) => {
  return http.get<{ data: boolean }>(`${GUEST_PATH}/${guestId}/is-stayed`)
}

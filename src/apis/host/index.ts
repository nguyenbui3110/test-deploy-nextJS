import {
  BACK_END_API_URL,
  DEFAULT_PAGE_SIZE_REVIEW_PROPERTY,
} from '@/src/constant'
import { http } from '@/src/library/http'
import { IHostInfo } from '@/src/page-components/HostProfile/HostProfile.type'

const HOST_PATH = `${BACK_END_API_URL}/api/hosts`

export const getHostInfo = (id) => {
  return http.get<{ data: IHostInfo }>(`${HOST_PATH}/${id}`)
}

export const CheckHostRentedGuestYet = (hostId: number) => {
  return http.get<{ data: boolean }>(`${HOST_PATH}/${hostId}/is-stayed`)
}

export const getHostByUserId = (userId: number) => {
  return http.get<{ data: IHostInfo }>(`${HOST_PATH}/user/${userId}`)
}

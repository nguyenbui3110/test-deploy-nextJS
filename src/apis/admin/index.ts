import { BACK_END_API_URL } from '@/src/constant'
import { http } from '@/src/library/http'
import { AccountType } from '@/src/page-components/Admin/ManageAccount/constant'
import { PropertyType } from '@/src/page-components/Admin/ManageProperty/constant'

const USER_PATH = `${BACK_END_API_URL}/api/users`
const PROPERTY_PATH = `${BACK_END_API_URL}/api/properties`

export const getAllAccountsApi = (page: number, isHostOnly: string) => {
  if (isHostOnly === 'All') {
    return http.get<{ data: AccountType[]; totalPages: number }>(
      `${USER_PATH}?PageIndex=${page}&PageSize=5&IsDescending=true`
    )
  }
  return http.get<{ data: AccountType[]; totalPages: number }>(
    `${USER_PATH}?PageIndex=${page}&PageSize=5&IsDescending=true&IsHostOnly=true`
  )
}

export const getAllPropertysApi = (page: number, status: string) => {
  if (status === 'All') {
    return http.get<{ data: PropertyType[]; totalPages: number }>(
      `${PROPERTY_PATH}?OrderBy=Id&PageIndex=${page}&PageSize=6&IsDescending=true`
    )
  }
  return http.get<{ data: PropertyType[]; totalPages: number }>(
    `${PROPERTY_PATH}?OrderBy=Id&Status=${status}&PageIndex=${page}&PageSize=6&IsDescending=true`
  )
}

export const postConfirmProperty = (propertyId: number) => {
  return http.post(`${PROPERTY_PATH}/${propertyId}/confirm`)
}

export const postRejectdProperty = (
  propertyId: number,
  reason: { reason: string }
) => {
  return http.post(`${PROPERTY_PATH}/${propertyId}/reject`, {
    method: 'POST',
    body: JSON.stringify(reason),
  })
}

import { BACK_END_API_URL } from '@/src/constant'
import { http } from '@/src/library/http'
import {
  IMyAccount,
  IMyAccountUpdate,
} from '@/src/page-components/MyAccount/EditProfile/EditProfile.type'

const USER_PATH = `${BACK_END_API_URL}/api/users`

export const getInfoUserById = async (id: number) => {
  return http.get<{ data: IMyAccount }>(`${USER_PATH}/${id}`)
}

export const putUpdateInfoUser = async (id: number, data: IMyAccountUpdate) => {
  return http.put<{ data: IMyAccount }>(`${USER_PATH}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

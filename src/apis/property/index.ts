import {
  BACK_END_API_URL,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_SIZE_PROPERTY_FOR_RENT,
} from '@/src/constant'
import { http } from '@/src/library/http'
import { IFilterPamrams } from '@/src/page-components/Home/FilterProperties/FilterProperty.type'
import {
  IProperty,
  IPropertyDetail,
} from '@/src/page-components/Home/Properties/Properties.type'
import { getFilterParamsFromObject } from '@/src/utils/common'
import axios from 'axios'

const PROPERTY_PATH = `${BACK_END_API_URL}/api/properties`
const ATTACHMENT_PATH = `${BACK_END_API_URL}/api/attachments/upload-attachment`

export const getListProperty = (params: IFilterPamrams) => {
  const queryParams = getFilterParamsFromObject(params)
  return http.get<{ data: IProperty[]; totalPages: number }>(
    `${PROPERTY_PATH}?PageSize=${DEFAULT_PAGE_SIZE}&${queryParams}`
  )
}
export const getPropertyById = (id) => {
  return http.get<{ data: IPropertyDetail }>(`${PROPERTY_PATH}/${id}`)
}

export const getListPropertyOfHost = (hostId: number, pageIndex: number) => {
  return http.get<{ data: IProperty[]; totalPages: number }>(
    `${PROPERTY_PATH}/host/${hostId}?PageIndex=${pageIndex}&PageSize=${DEFAULT_PAGE_SIZE_PROPERTY_FOR_RENT}`
  )
}

export const checkUserStayedInProperty = (propertyId: number) => {
  return http.get<{ data: boolean }>(`${PROPERTY_PATH}/${propertyId}/is-stayed`)
}

export const postCreateProperty = (data) => {
  return http.post(`${PROPERTY_PATH}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}
export const deleteProperty = (id) => {
  return http.delete(`${PROPERTY_PATH}/${id}`)
}

// bank

export const getAllBanks = () => {
  return http.get<{ data }>(`https://api.vietqr.io/v2/banks`)
}

import { BACK_END_API_URL } from '@/src/constant'
import { http } from '@/src/library/http'
import { IProperty } from '@/src/page-components/Home/Properties/Properties.type'

const WISHLIST_PATH = `${BACK_END_API_URL}/api/wishlists`

export const postAddToWishlists = async (propertyId: number) => {
  return http.post(`${WISHLIST_PATH}/properties/${propertyId}`)
}
export const postRemoveWishlists = async (propertyId: number) => {
  return http.delete(`${WISHLIST_PATH}/properties/${propertyId}`)
}

export const getWishlists = async (page: number) => {
  return http.get<{ data: { data: IProperty[]; totalPages } }>(
    `${WISHLIST_PATH}?page=${page}`
  )
}

import {
  BACK_END_API_URL,
  DEFAULT_PAGE_SIZE_REVIEW_PROPERTY,
  DEFAULT_PAGE_SIZE_REVIEW_HOST_GUEST,
} from '@/src/constant'
import { http } from '@/src/library/http'
import { IReviewProperty } from '@/src/page-components/DetailProperty/ReviewProperty/ReviewProperty.type'
import { IGuestReview } from '@/src/page-components/GuestProfile/GuestProfile.type'
import { IHostReview } from '@/src/page-components/HostProfile/HostProfile.type'

const REVIEWS_PATH = `${BACK_END_API_URL}/api/reviews`

// GET
export const getPropertyReview = (id, page) => {
  return http.get<{ data: IReviewProperty[]; totalPages: number }>(
    `${REVIEWS_PATH}/property/${id}?OrderBy=CreatedAt&IsDescending=true&PageSize=${DEFAULT_PAGE_SIZE_REVIEW_PROPERTY}&PageIndex=${page}`
  )
}
export const getGuestReviews = (guestId: number, page: number) => {
  return http.get<{ data: IGuestReview[]; totalPages: number }>(
    `${REVIEWS_PATH}/guest/${guestId}?OrderBy=CreatedAt&IsDescending=true&PageSize=${DEFAULT_PAGE_SIZE_REVIEW_HOST_GUEST}&PageIndex=${page}`
  )
}

export const getHostReviews = (hostId: number, page: number) => {
  return http.get<{ data: IHostReview[]; totalPages: number }>(
    `${REVIEWS_PATH}/host/${hostId}?OrderBy=CreatedAt&IsDescending=true&PageSize=${DEFAULT_PAGE_SIZE_REVIEW_HOST_GUEST}&PageIndex=${page}`
  )
}

// POST
export const postCreateReviewGuest = (guestId, data) => {
  return http.post(`${REVIEWS_PATH}/guest/${guestId}`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
export const postCreateReviewHost = (hostId, data) => {
  return http.post(`${REVIEWS_PATH}/host/${hostId}`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
export const postCreateReviewProperty = (propertyId, data) => {
  return http.post(`${REVIEWS_PATH}/property/${propertyId}`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

// DELETE
export const deleteReviewGuest = (reviewId: number) => {
  return http.delete(`${REVIEWS_PATH}/guest/${reviewId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
export const deleteReviewHost = (reviewId: number) => {
  return http.delete(`${REVIEWS_PATH}/host/${reviewId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
export const deleteReviewProperty = (reviewId: number) => {
  return http.delete(`${REVIEWS_PATH}/property/${reviewId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

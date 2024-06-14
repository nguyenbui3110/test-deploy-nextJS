import { BACK_END_API_URL } from '@/src/constant'
import { http } from '@/src/library/http'

const PAYMENT_PATH = `${BACK_END_API_URL}/api/payment`

export const createBookingPayment = (data) => {
  return http.post<{ data: string }>(`${PAYMENT_PATH}/create-payment`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
export const postVNPayHookUrl = (data) => {
  return http.post(`${PAYMENT_PATH}/vnpay-hook-url`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

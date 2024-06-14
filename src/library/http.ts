import {
  BACK_END_API_URL,
  DEFAULT_LANGUAGE,
  NO_CONTENT,
  UNAUTHORIZED,
} from '@/src/constant'
import { routes } from '@/src/routes'
import Cookies from 'js-cookie'

const CURRENT_LOCALE = Cookies.get('locale') || DEFAULT_LANGUAGE

async function request<T = any>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const TOKEN = Cookies.get('jwt_token')
  const currentLocale = CURRENT_LOCALE

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options?.headers,
        'Content-Type': 'application/json',
        'Accept-Language': currentLocale,
        Authorization: `Bearer ${TOKEN}`,
      },
    })

    if (response.status === NO_CONTENT) return null as any
    const payload = await response.json()
    if (response.ok) {
      return payload
    }
    if (response.status === UNAUTHORIZED) {
      const refreshToken = Cookies.get('refresh_token')
      if (!refreshToken) {
        location.replace(routes.authenticate.generatePath())
        return Promise.reject(new Error('Unauthorized'))
      }
      const refreshResponse = await fetch(
        `${BACK_END_API_URL}/api/auth/refresh?refreshToken=${refreshToken}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TOKEN}`,
          },
          body: JSON.stringify({ refreshToken }),
        }
      )
      if (refreshResponse.ok) {
        const { accessToken, refreshToken } = await refreshResponse.json()
        Cookies.set('jwt_token', accessToken)
        Cookies.set('refresh_token', refreshToken)
        return request(url, options)
      }
      return Promise.reject(payload || new Error('Something went wrong'))
    }
    return Promise.reject(payload || new Error('Something went wrong'))
  } catch (error: any) {
    return Promise.reject(error || new Error('Something went wrong'))
  }
}

export const http = {
  get: <T>(url: string, options?: RequestInit) =>
    request<T>(url, { ...options, method: 'GET' }),
  post: <T>(url: string, options?: RequestInit) =>
    request<T>(url, { ...options, method: 'POST' }),
  put: <T>(url: string, options?: RequestInit) =>
    request<T>(url, { ...options, method: 'PUT' }),
  patch: <T>(url: string, options?: RequestInit) =>
    request<T>(url, { ...options, method: 'PATCH' }),
  delete: <T>(url: string, options?: RequestInit) =>
    request<T>(url, { ...options, method: 'DELETE' }),
}

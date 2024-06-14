import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

export const handleTrim = (value: string) => {
  if (typeof value === 'string') return value.trim()
  return value
}
export const handleSaveLogin = ({ accessToken, refreshToken, user }) => {
  Cookies.set('jwt_token', accessToken)
  Cookies.set('refresh_token', refreshToken)
  localStorage.setItem('user_login', JSON.stringify(user))
}
export const handleSaveLogout = () => {
  Cookies.remove('jwt_token')
  Cookies.remove('refresh_token')
  localStorage.removeItem('user_login')
}

export const getFilterParamsFromObject = (obj: any) => {
  const queryParams = []
  for (const key in obj) {
    if (Array.isArray(obj[key]) && obj[key]) {
      for (let i = 0; i < obj[key].length; i++) {
        queryParams.push(`Type=${obj[key][i]}`)
      }
    }
    if (obj[key] && !Array.isArray(obj[key])) {
      queryParams.push(`${key}=${obj[key]}`)
    }
  }
  return queryParams.join('&')
}
export const formatMoney = (number: number) => {
  return Math.floor(number)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

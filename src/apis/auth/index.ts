import { BACK_END_API_URL } from '@/src/constant'
import { http } from '@/src/library/http'
import {
  LoginRequest,
  LogoutRequest,
  RegisterRequest,
} from '@/src/page-components/Authenticate/Authenticate.type'

const AUTHENTICATE_PATH = `${BACK_END_API_URL}/api/auth`

export const postLogin = (loginRequest: LoginRequest) => {
  return http.post<{ accessToken; refreshToken; user }>(
    `${AUTHENTICATE_PATH}/login`,
    {
      method: 'POST',
      body: JSON.stringify(loginRequest),
    }
  )
}

export const postRegister = (registerRequest: RegisterRequest) => {
  return http.post(`${AUTHENTICATE_PATH}/register`, {
    method: 'POST',
    body: JSON.stringify(registerRequest),
  })
}

export const postLoginGoogle = (loginGoggleRequest) => {
  return http.post<{ accessToken; refreshToken; user }>(
    `${AUTHENTICATE_PATH}/google-login?accessToken=${loginGoggleRequest}`,
    {
      method: 'POST',
    }
  )
}

export const postLogout = (refreshToken) => {
  return http.post(
    `${AUTHENTICATE_PATH}/revoke-token?refreshToken=${refreshToken}`,
    {
      method: 'POST',
    }
  )
}

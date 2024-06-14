export enum AuthenticateType {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
}
export type LoginRequest = { identifier: string; password: string }
export type RegisterRequest = {
  username: string
  password: string
  email: string
  fullName: string
}


export type LogoutRequest = {
  refreshToken: string
}

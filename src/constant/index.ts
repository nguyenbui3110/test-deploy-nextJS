export const BACK_END_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL
export const API_CHAT = `${BACK_END_API_URL}/chathub`

export const THEME_DEFAULT = {
  typography: {
    fontFamily: 'Lexend',
  },
  palette: {
    primary: {
      light: '#4b7782',
      main: '#4b7782',
      dark: '#4b7782',
      contrastText: '#fff',
    },
  },
}
export const PRIMARY_COLOR = '#4b7782'

export const DEFAULT_PAGE = 1
export const DEFAULT_PAGE_SIZE = 12
export const DEFAULT_PAGE_SIZE_REVIEW_PROPERTY = 4
export const DEFAULT_PAGE_SIZE_REVIEW_HOST_GUEST = 6
export const DEFAULT_PAGE_SIZE_PROPERTY_FOR_RENT = 3
export const DEFAULT_LANGUAGE = 'en'
export const BAD_REQUEST = 400
export const NO_CONTENT = 204
export const UNAUTHORIZED = 401
export enum USER_ROLE {
  HOST = 'Host',
  GUEST = 'Guest',
}
export enum APP_ROLE {
  ADMIN = 'Admin',
  USER = 'User',
}
export enum STATUS_PROPERTY {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Radio',
}
export enum STATUS_BOOKING {
  Pending = 1,
  Confirmed = 2,
  CheckedIn = 3,
  Rejected = 4,
  CancelledBeforeCheckIn = 5,
  CancelledAfterCheckIn = 6,
  Completed = 7,
}

'use client'
import LoginForm from '@/src/page-components/Authenticate/Forms/LoginForm'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import BannerAuthenticatie from '@/src/assets/images/payment-failed.jpg'

import { AuthenticateType } from '@/src/page-components/Authenticate/Authenticate.type'
import RegisterForm from '@/src/page-components/Authenticate/Forms/RegisterForm'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Cookies from 'js-cookie'
import { routes } from '@/src/routes'
import { useRouter } from 'next/navigation'
import { createTheme, ThemeProvider } from '@mui/material'
import { THEME_DEFAULT } from '@/src/constant'

const clientID = process.env.NEXT_PUBLIC_CLIENT_GOOGLE_ID

const Authenticate = () => {
  const [authenticatetype, setAuthenticateType] = useState<AuthenticateType>(
    AuthenticateType.LOGIN
  )
  const theme = createTheme(THEME_DEFAULT)
  // const router = useRouter()
  // useEffect(() => {
  //   const token = Cookies.get('jwt_token')
  //   if (token) {
  //     router.push(routes.home.generatePath())
  //   }
  // }, [])
  return (
    <ThemeProvider theme={theme}>
      <div className="px-5 md:px-10 pb-5 md:pb-0 bg-gradient bg-no-repeat">
        <div className="mx-auto w-full max-w-7xl h-screen">
          <div className="">
            {/* <div className="grid items-center max-[991px]:justify-items-start grid-cols-1 md:grid-cols-2 gap-8 h-screen"> */}
            <div className="flex justify-center items-center h-screen">
              <GoogleOAuthProvider clientId={clientID}>
                {authenticatetype === AuthenticateType.LOGIN && (
                  <LoginForm setAuthenticateType={setAuthenticateType} />
                )}
                {authenticatetype === AuthenticateType.REGISTER && (
                  <RegisterForm setAuthenticateType={setAuthenticateType} />
                )}
              </GoogleOAuthProvider>
              {/* <div className="max-[991px]:mx-auto max-[991px]:max-w-[720px]">
                <Image
                  src={BannerAuthenticatie}
                  alt="banner-authenticate"
                  className="inline-block max-w-full rounded-lg"
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Authenticate

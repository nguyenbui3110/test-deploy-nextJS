import React, { useState } from 'react'
import { Formik } from 'formik'

import {
  Button,
  CircularProgress,
  Divider,
  IconButton,
  TextField,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import Link from 'next/link'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {
  LoginSchema,
  initialValues,
} from '@/src/helpers/AuthenticateSchema/LoginSchema'
import {
  AuthenticateType,
  LoginRequest,
} from '@/src/page-components/Authenticate/Authenticate.type'
import { postLogin } from '@/src/apis/auth'
import ButtonLoginGoogle from '@/src/page-components/Authenticate/ButtonLoginGoggle/ButtonLoginGoggle'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { routes } from '@/src/routes'
import { toast } from 'react-toastify'
import { handleSaveLogin } from '@/src/utils/common'
import { TOAST_MESSAGE } from '@/src/toast-message/ToastMessage'
import { APP_ROLE } from '@/src/constant'

interface ILoginFormProps {
  setAuthenticateType: React.Dispatch<React.SetStateAction<AuthenticateType>>
}

const Login = ({ setAuthenticateType }: ILoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const [disableButtonLogin, setDisableButtonLogin] = useState<boolean>(false)

  const router = useRouter()

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const handleFormSubmit = async (values) => {
    const loginRequest: LoginRequest = {
      identifier: values.username,
      password: values.password,
    }
    setDisableButtonLogin(true)
    try {
      const { accessToken, refreshToken, user, role } = await toast.promise(
        postLogin(loginRequest),
        {
          pending: TOAST_MESSAGE.login.pending,
          success: TOAST_MESSAGE.login.success,
          error: TOAST_MESSAGE.login.error,
        }
      )
      handleSaveLogin({ accessToken, refreshToken, user })
      console.log(user)
      if (role === APP_ROLE.ADMIN)
        router.push(routes.admin.manageStatistics.generatePath())
      else router.push(routes.home.generatePath())
    } catch (error) {
      toast.error(TOAST_MESSAGE.login.error)
    } finally {
      setDisableButtonLogin(false)
    }
  }

  return (
    <div className="p-6 max-[991px]:w-full rounded-2xl shadow-2xl bg-white">
      <div className="text-center">
        <Button variant="outlined" size="small" startIcon={<ArrowBackIcon />}>
          <Link href="/" className=" text-[#4b7782]">
            Về trang chủ
          </Link>
        </Button>
        <h3 className="mt-6 text-gray-600 font-bold text-2xl md:text-3xl">
          Đăng nhập với CultureStay 💕
        </h3>
        <div className="mx-auto mt-4 max-w-[480px] mb-5 md:mb-6 lg:mb-8 ">
          <div className="text-sm text-gray-600">
            Bạn chưa có tài khoản ? &nbsp;
            <span
              className="underline cursor-pointer text-gray-600"
              onClick={() => setAuthenticateType(AuthenticateType.REGISTER)}
            >
              Đăng kí ngay
            </span>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[400px]">
          <div className="mx-auto max-w-[400px] text-left mb-4">
            <Formik
              initialValues={initialValues}
              onSubmit={handleFormSubmit}
              validationSchema={LoginSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit} name="form-login" method="post">
                  <div className="relative">
                    <TextField
                      sx={{
                        fontFamily: 'Lexend',
                        width: `100%`,
                        marginBottom: '20px',
                      }}
                      id="username"
                      label="Username or Email"
                      variant="standard"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.username}
                      error={!!touched.username && !!errors.username}
                      helperText={
                        touched.username && (errors.username as string)
                      }
                    />
                  </div>
                  <div className="relative mb-2">
                    <TextField
                      sx={{
                        fontFamily: 'Lexend',
                        width: `100%`,
                        marginBottom: '20px',
                      }}
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      label="Password"
                      variant="standard"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      error={!!touched.password && !!errors.password}
                      helperText={
                        touched.password && (errors.password as string)
                      }
                    />
                    <IconButton
                      sx={{
                        position: 'absolute',
                        right: '0',
                        top: '10px',
                      }}
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </div>
                  <Button
                    sx={{
                      width: '100%',
                      height: '50px',
                    }}
                    variant="contained"
                    size="large"
                    type="submit"
                    disabled={disableButtonLogin}
                  >
                    Login
                  </Button>
                </form>
              )}
            </Formik>
            <Divider sx={{ mt: '8px', color: '#4b7782' }} />
            <ButtonLoginGoogle />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

import React, { useState } from 'react'
import { Formik } from 'formik'
import { Button, IconButton, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Link from 'next/link'
import {
  RegisterSchema,
  initialValues,
} from '@/src/helpers/AuthenticateSchema/RegisterSchema'
import {
  AuthenticateType,
  RegisterRequest,
} from '@/src/page-components/Authenticate/Authenticate.type'
import { postRegister } from '@/src/apis/auth'
import { toast } from 'react-toastify'

interface IRegisterFormProps {
  setAuthenticateType: React.Dispatch<React.SetStateAction<AuthenticateType>>
}

const RegisterForm = ({ setAuthenticateType }: IRegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show)

  const handleFormSubmit = async (values) => {
    const registerRequest: RegisterRequest = {
      fullName: values.fullName,
      username: values.username,
      email: values.email,
      password: values.password,
    }
    try {
      await toast.promise(postRegister(registerRequest), {
        pending: 'Đang đăng kí tài khoản',
        success: 'Tài khoản đã đã đăng kí thành công',
      })
      setAuthenticateType(AuthenticateType.LOGIN)
    } catch ({ title }) {
      toast.error(title)
    }
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }
  return (
    <div className="p-6 max-[991px]:w-full rounded-2xl shadow-2xl bg-white">
      <div className="text-center">
        <Button variant="outlined" size="small" startIcon={<ArrowBackIcon />}>
          <Link href="/" className=" text-[#4b7782]">
            Về trang chủ
          </Link>
        </Button>
        <h3 className="mt-6 text-gray-600  font-bold text-3xl md:text-3xl">
          Đăng kí với Culture Stay 💕
        </h3>
        <div className="mx-auto mt-4 max-w-[480px] mb-5 md:mb-6 lg:mb-8">
          <div className="text-sm  text-gray-600">
            Bạn đã có tài khoản ? &nbsp;
            <span
              className="underline text-gray-600 cursor-pointer"
              onClick={() => setAuthenticateType(AuthenticateType.LOGIN)}
            >
              Đăng nhập ngay
            </span>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[400px]">
          <div className="mx-auto max-w-[400px] text-left mb-4">
            <Formik
              initialValues={initialValues}
              onSubmit={handleFormSubmit}
              validationSchema={RegisterSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <form
                  onSubmit={handleSubmit}
                  name="form-register"
                  method="post"
                >
                  <div className="relative">
                    <TextField
                      sx={{
                        fontFamily: 'Lexend',
                        width: `100%`,
                        marginBottom: '20px',
                      }}
                      id="fullName"
                      label="Full Name"
                      variant="standard"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.fullName}
                      error={!!touched.fullName && !!errors.fullName}
                      helperText={
                        touched.fullName && (errors.fullName as string)
                      }
                    />
                  </div>
                  <div className="relative">
                    <TextField
                      sx={{
                        fontFamily: 'Lexend',
                        width: `100%`,
                        marginBottom: '20px',
                      }}
                      id="email"
                      label="Email"
                      variant="standard"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && (errors.email as string)}
                    />
                  </div>
                  <div className="relative">
                    <TextField
                      sx={{
                        fontFamily: 'Lexend',
                        width: `100%`,
                        marginBottom: '20px',
                      }}
                      id="username"
                      label="Username"
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
                  <div className="relative mb-2">
                    <TextField
                      sx={{
                        fontFamily: 'Lexend',
                        width: `100%`,
                        marginBottom: '20px',
                      }}
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      label="Confirm Password"
                      variant="standard"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.confirmPassword}
                      error={
                        !!touched.confirmPassword && !!errors.confirmPassword
                      }
                      helperText={
                        touched.confirmPassword &&
                        (errors.confirmPassword as string)
                      }
                    />
                    <IconButton
                      sx={{
                        position: 'absolute',
                        right: '0',
                        top: '10px',
                      }}
                      aria-label="toggle confirm password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </div>
                  <Button
                    sx={{
                      height: '50px',
                    }}
                    className="w-full"
                    variant="contained"
                    size="large"
                    type="submit"
                  >
                    Register
                  </Button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm

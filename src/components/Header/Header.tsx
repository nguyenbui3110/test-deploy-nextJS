'use client'
import React from 'react'

import Logo from '@/assets/images/culture-stay-logo.png'
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  TextField,
  Tooltip,
} from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import SearchIcon from '@mui/icons-material/Search'
import GiteIcon from '@mui/icons-material/Gite'
import MenuIcon from '@mui/icons-material/Menu'
import Image from 'next/image'
import { toast } from 'react-toastify'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { routes } from '@/src/routes'
import { useRouter } from 'next/navigation'
// import { postLogout } from '@/src/apis/auth'
import { handleSaveLogout } from '@/src/utils/common'
import { TOAST_MESSAGE } from '@/src/toast-message/ToastMessage'
import { PRIMARY_COLOR } from '@/src/constant'
import { useState,useEffect } from 'react'

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const router = useRouter()

  const handleLogout = async () => {
    try {
      // const refreshToken = Cookies.get('refresh_token')
      // await toast.promise(postLogout(refreshToken), {
      //   pending: TOAST_MESSAGE.logout.pending,
      //   success: TOAST_MESSAGE.logout.success,
      //   error: TOAST_MESSAGE.logout.error,
      // })
      const resolveAfter2Sec = new Promise((resolve) =>
        setTimeout(resolve, 2000)
      )
      toast
        .promise(resolveAfter2Sec, {
          pending: TOAST_MESSAGE.logout.pending,
          success: TOAST_MESSAGE.logout.success,
        })
        .then(() => {
          handleSaveLogout()
          router.push(routes.authenticate.generatePath())
        })
    } catch (error) {}
  }
  // const userLogin = JSON.parse(localStorage.getItem('user_login'))
  const [userLogin, setUserLogin] = useState(null)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserLogin = localStorage.getItem('user_login');
      if (storedUserLogin) {
        setUserLogin(JSON.parse(storedUserLogin));
      }
    }
  }, [])
  return (
    <header className="block h-[70px] sm:h-[80px] shadow-md fixed top-0 left-0 right-0 bg-[#4b7782] z-10">
      <div className="py-4 mx-auto w-full max-w-7xl flex items-center justify-between sm:h-full sm:py-0">
        <Link href="/">
          <Image
            src={Logo}
            alt=""
            className="inline-block"
            width={150}
            height={200}
          />
        </Link>
        <div className="flex items-center gap-8 text-white">
          <span
            className="flex items-center gap-2 border px-2 py-1 rounded-full cursor-pointer bg-white"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MenuIcon sx={{ color: '#4b7782' }} />
            <Avatar
              alt={userLogin?.fullName}
              sx={
                true
                  ? { width: 30, height: 30, bgcolor: PRIMARY_COLOR }
                  : { width: 30, height: 30 }
              }
              src={
                userLogin && userLogin.avatarUrl
                  ? `${userLogin?.avatarUrl}`
                  : ``
              }
            />
          </span>
          {userLogin && (
            <Menu
              className="rouned-lg"
              id="account-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                sx: {
                  borderRadius: 3,
                  mt: 1,
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleClose}>
                <Link
                  className="w-full text-gray-600"
                  href={routes.wishlist.generatePath()}
                >
                  Danh sách yêu thích
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link
                  className="w-full text-gray-600"
                  href={routes.guestManageBooking.generatePath()}
                >
                  Quản lý đặt phòng
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link
                  className="w-full text-gray-600"
                  href={routes.myAccount.generatePath()}
                >
                  Tài khoản
                </Link>
              </MenuItem>
              {userLogin?.isHost && (
                <MenuItem onClick={handleClose}>
                  <Link
                    className="w-full text-gray-600"
                    href={routes.hostManageProperty.generatePath()}
                  >
                    Quản lý phòng cho thuê
                  </Link>
                </MenuItem>
              )}
              <Divider />
              <MenuItem onClick={handleClose}>
                <Link className="w-full text-gray-600" href="/help">
                  Trung tâm trợ giúp
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <p className="w-full text-red-600" onClick={handleLogout}>
                  Đăng xuất
                </p>
              </MenuItem>
            </Menu>
          )}
          {!userLogin && (
            <Menu
              className="rouned-lg"
              id="account-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                sx: {
                  borderRadius: 3,
                  mt: 1,
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleClose}>
                <Link
                  className="w-full text-gray-600"
                  href={routes.authenticate.generatePath()}
                >
                  Đăng nhập
                </Link>
              </MenuItem>
              <Divider light />
              <MenuItem onClick={handleClose}>
                <Link className="w-full text-gray-600" href="/become-host">
                  Cho thuê chỗ ở qua AirCnc
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link className="w-full text-gray-600" href="/help">
                  Trung tâm trợ giúp
                </Link>
              </MenuItem>
            </Menu>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header

import React from 'react'
import Link from 'next/link'
import { routes } from '@/src/routes'

import FavoriteIcon from '@mui/icons-material/Favorite'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import BedroomParentIcon from '@mui/icons-material/BedroomParent'
import HelpCenterIcon from '@mui/icons-material/HelpCenter'
import GiteIcon from '@mui/icons-material/Gite'
import LocalActivityIcon from '@mui/icons-material/LocalActivity'
import PaidIcon from '@mui/icons-material/Paid'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import CakeIcon from '@mui/icons-material/Cake'
import { Avatar, Divider } from '@mui/material'
import { useEffect, useState } from 'react'
const Sidebar = () => {
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
    <div className="mt-0 fixed top-24 left-0 bottom-0  hover:overflow-y-auto custom-scrollbar bg-[#f0f2f5]">
      {userLogin && (
        <ul className="px-4">
          <li className="hover:bg-gray-200 pr-6 rounded-md hover:cursor-pointer">
            <Link
              href={routes.myAccount.generatePath()}
              className="flex items-center gap-4 p-4"
            >
              <Avatar src={userLogin.avatarUrl} />
              <span className="text-sm">{userLogin.fullName}</span>
            </Link>
          </li>
          <li className="hover:bg-gray-200 pr-6 rounded-md hover:cursor-pointer">
            <Link
              href={routes.wishlist.generatePath()}
              className="flex gap-4 p-4"
            >
              <FavoriteIcon sx={{ color: '#4b7782' }} />
              <span className="text-sm">Danh sách yêu thích</span>
            </Link>
          </li>
          <li className="hover:bg-gray-200 pr-6 rounded-md hover:cursor-pointer">
            <Link
              href={routes.guestManageBooking.generatePath()}
              className="flex gap-4 p-4"
            >
              <ReceiptLongIcon sx={{ color: '#4b7782' }} />
              <span className="text-sm">Quản lý đặt phòng</span>
            </Link>
          </li>
          {userLogin?.isHost && (
            <li className="hover:bg-gray-200 pr-6 rounded-md hover:cursor-pointer">
              <Link
                href={routes.hostManageProperty.generatePath()}
                className="flex gap-4 p-4"
              >
                <BedroomParentIcon sx={{ color: '#4b7782' }} />
                <span className="text-sm">Quản lý phòng cho thuê</span>
              </Link>
            </li>
          )}
          <li className="hover:bg-gray-200 pr-6 rounded-md hover:cursor-pointer">
            <Link href={'help-center'} className="flex gap-4 p-4">
              <HelpCenterIcon sx={{ color: '#4b7782' }} />
              <span className="text-sm">Trung tâm trợ giúp</span>
            </Link>
          </li>
          <Divider sx={{ my: '4px' }} />
          <li className="hover:bg-gray-200 pr-6 rounded-md hover:cursor-pointer">
            <Link href={'help-center'} className="flex gap-4 p-4">
              <LocalActivityIcon sx={{ color: '#4b7782' }} />
              <span className="text-sm">Hoạt động gần đây</span>
            </Link>
          </li>
          <li className="hover:bg-gray-200 pr-6 rounded-md hover:cursor-pointer">
            <Link href={'help-center'} className="flex gap-4 p-4">
              <PaidIcon sx={{ color: '#4b7782' }} />
              <span className="text-sm">Chiến dịch gây quỹ</span>
            </Link>
          </li>
          <li className="hover:bg-gray-200 pr-6 rounded-md hover:cursor-pointer">
            <Link href={'help-center'} className="flex gap-4 p-4">
              <AutoAwesomeIcon sx={{ color: '#4b7782' }} />
              <span className="text-sm">Hoạt động quảng cáo</span>
            </Link>
          </li>
          <li className="hover:bg-gray-200 pr-6 rounded-md hover:cursor-pointer">
            <Link
              href={routes.wishlist.generatePath()}
              className="flex gap-4 p-4"
            >
              <CakeIcon sx={{ color: '#4b7782' }} />
              <span className="text-sm">Sinh nhật</span>
            </Link>
          </li>
        </ul>
      )}
    </div>
  )
}

export default Sidebar

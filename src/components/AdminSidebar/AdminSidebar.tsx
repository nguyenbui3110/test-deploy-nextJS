'use client'
import { ReactNode, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css'
import {
  Avatar,
  Box,
  IconButton,
} from '@mui/material'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import PieChartOutlineIcon from '@mui/icons-material/PieChartOutline'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import Link from 'next/link'
import LogoutIcon from '@mui/icons-material/Logout'
import { routes } from '@/src/routes'
import { handleSaveLogout } from '@/src/utils/common'

interface PropsType {
  title: string
  to: string
  icon: ReactNode
  selected: string
  setSelected: React.Dispatch<React.SetStateAction<string>>
  onClick?: () => void
}

const Item = ({ title, to, icon, selected, setSelected }: PropsType) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
      style={{ color: 'red' }}
    >
      <p>{title}</p>
      <Link href={to} />
    </MenuItem>
  )
}

const AdminSidebar = () => {
  // const userLogin = useState(null)
  // const userLogin = JSON.parse(localStorage.getItem('user_login'))
  const [userLogin, setUserLogin] = useState(null)
  
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selected, setSelected] = useState('Dashboard')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserLogin = localStorage.getItem('user_login');
      if (storedUserLogin) {
        setUserLogin(JSON.parse(storedUserLogin));
      }
    }
  }, [])

  return (
    <Box
      sx={{
        height: '100vh',
        '& .pro-sidebar-inner': {
          background: `#4b7782 !important`,
        },
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important',
        },
        '& .pro-menu-item': {
          color: '#abb4c8  !important',
        },
        '& .pro-inner-item': {
          // padding: '5px 35px 5px 20px !important',
        },
        '& .pro-inner-item:hover': {
          color: '#868dfb !important',
        },
        '& .pro-menu-item.active': {
          color: '#fff !important',
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* Logo and menu icon */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: '10px 0 20px 0',
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <p className="font-bold text-gray-100">ADMIN</p>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon sx={{ color: '#fff' }} />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <Avatar
                  alt="profile-user"
                  src={userLogin?.avatarUrl}
                  style={{
                    cursor: 'pointer',
                    borderRadius: '50%',
                    width: 80,
                    height: 80,
                  }}
                />
              </Box>
              <Box textAlign="center">
                <p className="pt-2 font-bold text-gray-100">
                  {userLogin?.fullName}
                </p>
              </Box>
            </Box>
          )}
          {/* Menu Item */}
          <Box paddingLeft={isCollapsed ? undefined : '10%'}>
            <Item
              title="Doanh thu"
              to={routes.admin.manageStatistics.generatePath()}
              icon={<PieChartOutlineIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <p className="py-2 px-4 text-sm font-bold text-gray-100">Manage</p>
            <Item
              title="Tài khoản"
              to={routes.admin.manageAccounts.generatePath()}
              icon={<AccountBoxIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Đơn tạo phòng"
              to={routes.admin.manageProperty.generatePath()}
              icon={<MeetingRoomIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Đăng xuất"
              to={routes.authenticate.generatePath()}
              icon={<LogoutIcon />}
              selected={selected}
              setSelected={setSelected}
              onClick={() => handleSaveLogout()}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  )
}

Item.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  selected: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired,
}
export default AdminSidebar

'use client'
import MainLayout from '@/src/components/layouts/MainLayout'
import TableGuestManageBookings from '@/src/page-components/GuestManageBookings/TableGuestManageBookings'
import { routes } from '@/src/routes'
import { Breadcrumbs } from '@mui/material'
import Link from 'next/link'

import React from 'react'

const GuestManageBookings = () => {
  return (
    <MainLayout>
      <Breadcrumbs aria-label="breadcrumb" className="py-4">
        <Link
          className="hover:underline hover:text-cyan-600 cursor-pointer"
          href={routes.home.generatePath()}
        >
          Trang chủ
        </Link>
        <p className="text-cyan-600">Quản lý đơn đặt phòng</p>
      </Breadcrumbs>
      <TableGuestManageBookings />
    </MainLayout>
  )
}

export default GuestManageBookings

'use client'

import MainLayout from '@/src/components/layouts/MainLayout'
import FormCreateProperty from '@/src/page-components/BecomeHost/FormCreateProperty/FormCreateProperty'
import HostManagePropertyAndBooking from '@/src/page-components/HostManageProperty/TableManagePropertyAndBooking'
import { routes } from '@/src/routes'
import { Breadcrumbs, Button, Dialog } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const HostManageProperty = () => {
  const [open, setOpen] = useState(false)

  const [isRefresh, setIsRefresh] = useState<boolean>(false)

  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }
  const onCreateSuccess = () => {
    setOpen(false)
    setIsRefresh(true)
  }
  return (
    <MainLayout>
      <div className="flex justify-between items-center ">
        <Breadcrumbs aria-label="breadcrumb" className="py-4">
          <Link
            className="hover:underline hover:text-cyan-600 cursor-pointer"
            href={routes.home.generatePath()}
          >
            Trang chủ
          </Link>
          <p className="text-cyan-600">Quản lý phòng cho thuê</p>
        </Breadcrumbs>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Đăng phòng
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <div className="p-6 custom-scrollbar overflow-y-auto overflow-x-hidden">
            <FormCreateProperty onCreateSuccess={onCreateSuccess} />
          </div>
        </Dialog>
      </div>
      <HostManagePropertyAndBooking
        isRefresh={isRefresh}
        setIsRefresh={setIsRefresh}
      />
    </MainLayout>
  )
}
export default HostManageProperty

'use client'
import MainLayout from '@/src/components/layouts/MainLayout'
import { EditProfile } from '@/src/page-components/MyAccount/EditProfile'
import { SidebarSetting } from '@/src/page-components/MyAccount/SidebarSetting'
import React from 'react'

const MyAccount = () => {
  return (
    <MainLayout>
      <div className="flex gap-24">
        <SidebarSetting />
        <EditProfile />
      </div>
    </MainLayout>
  )
}

export default MyAccount

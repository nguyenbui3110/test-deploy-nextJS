import React from 'react'
import FolderSharedIcon from '@mui/icons-material/FolderShared'
import PersonIcon from '@mui/icons-material/Person'
import GppGoodIcon from '@mui/icons-material/GppGood'
import SummarizeIcon from '@mui/icons-material/Summarize'

const SidebarSetting = () => {
  return (
    <div className="w-[300px] text-gray-600">
      <h2 className="text-[#4b7782] text-xl font-semibold">Cài đặt</h2>
      <div className="p-4 my-4 shadow-lg rounded-md border bg-white">
        <div className="flex items-center gap-2">
          <FolderSharedIcon sx={{ color: 'gray' }} />
          <span className="text-gray-600">Trải nghiệm chung</span>
        </div>
        <p className="text-gray-600 font-semibold">Trung tâm Tài khoản</p>
        <p className="text-xs text-gray-400 py-4">
          Quản lý trải nghiệm kết nối và cài đặt tài khoản của bạn trên các công
          nghệ Meta.
        </p>
        <ul className="text-sm">
          <li className="flex gap-2 items-center py-2">
            <PersonIcon sx={{ color: '#969696', fontSize: '20px' }} />
            <span>Chi tiết Cá nhân</span>
          </li>
          <li className="flex gap-2 items-center py-2">
            <GppGoodIcon sx={{ color: '#969696', fontSize: '20px' }} />
            <span>Mật khẩu và Bảo mật</span>
          </li>
          <li className="flex gap-2 items-center py-2">
            <SummarizeIcon sx={{ color: '#969696', fontSize: '20px' }} />
            <span>Ưu tiên Quảng cáo</span>
          </li>
        </ul>
        <p className="text-sm text-gray-600 pt-2">
          Xem thêm trong Trung tâm Tài khoản
        </p>
      </div>
    </div>
  )
}

export default SidebarSetting

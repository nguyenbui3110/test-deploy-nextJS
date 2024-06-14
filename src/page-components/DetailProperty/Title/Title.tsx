import React from 'react'
import ShareIcon from '@mui/icons-material/Share'
import Button from '@mui/material/Button'
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot'
import PlaceIcon from '@mui/icons-material/Place'
import { Breadcrumbs } from '@mui/material'
import Link from 'next/link'
import { routes } from '@/src/routes'

interface ITitleProps {
  title: string
  address: string
  city: string
}

const Title = ({ title, address, city }: ITitleProps) => {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          href={routes.home.generatePath()}
          className="hover:underline hover:text-[#4b7782]"
        >
          Trang chủ
        </Link>
        <p color="">Chi tiết phòng</p>
      </Breadcrumbs>
      <div className="flex justify-between items-start py-4">
        <div className="flex-auto pr-12">
          <h1 className="font-bold text-2xl  text-gray-600 line-clamp-1">
            {title}
          </h1>
          <p className="text-gray-500 py-3 flex items-end gap-3">
            <PlaceIcon sx={{ color: '#c92327' }} />
            <span>
              {address} - {city}
            </span>
          </p>
        </div>
        <div className="flex min-w-[200px]">
          <Button variant="text">
            <ShareIcon />
            <p className="font-extralight underline">Chia sẻ</p>
          </Button>
          <Button variant="text">
            <TurnedInNotIcon />
            <p className="font-extralight underline">Lưu</p>
          </Button>
        </div>
      </div>
    </>
  )
}

export default Title

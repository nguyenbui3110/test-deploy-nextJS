import React from 'react'
import EmptyDataImage from '@/src/assets/images/empty_box.png'

import { Alert } from '@mui/material'
import Image from 'next/image'
const EmptyData = ({ title, description }) => {
  return (
    <div className="px-5 md:px-10">
      <div className="mx-auto w-full">
        <div className=" flex flex-col items-center justify-center gap-12">
          <Image src={EmptyDataImage} width={300} height={300} alt="Wishlistpage" />
          <div className="">
            <h1 className="font-bold text-cyan-700 mb-8 text-2xl text-center">
              {title}
            </h1>
            <Alert sx={{ mb: 2 }} severity="info" className="text-center">
              {description}
            </Alert>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmptyData

import React from 'react'
import ImageListMUI from '@mui/material/ImageList'

import { Gallery, Item } from 'react-photoswipe-gallery'
import { IPropertyImage } from '@/src/page-components/Home/Properties/Properties.type'
import ImageGallery from 'react-image-gallery'
interface IAttachmentProps {
  propertyImages: IPropertyImage[]
}
const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
]

const Attachments = ({ propertyImages }: IAttachmentProps) => {
  const listImageCustom = propertyImages?.map((item) => ({
    original: item.url,
    thumbnail: item.url,
  }))
  return (
    <div className="rounded-md max-w-[700px] pb-6 mx-auto shadow-md my-12">
      <ImageGallery items={listImageCustom} />
    </div>
  )
}

export default Attachments

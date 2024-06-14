import PropertyItem from '@/src/page-components/Home/Properties/PropertyItem/PropertyItem'
import React, { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { Pagination } from '@mui/material'
import { IProperty } from '@/src/page-components/Home/Properties/Properties.type'

import Skeleton from '@/src/page-components/Home/Properties/Skeleton/Skeleton'
import { IFilterPamrams } from '@/src/page-components/Home/FilterProperties/FilterProperty.type'
import Image from 'next/image'
import EmtyData from '@/src/assets/images/empty_box.png'
import FilterProperty from '@/src/page-components/Home/FilterProperties/FilterProperty'
import PostProperty from '@/src/page-components/Home/Post/PostProperty'
import { useEffect, useState } from 'react'
interface IPropertiesProps {
  filterParams: IFilterPamrams
  setFilterParams: Dispatch<SetStateAction<IFilterPamrams>>
  properties: IProperty[]
  isLoading: boolean
  getListPropertyAsync: (params: IFilterPamrams) => Promise<void>
}

const Properties = ({
  filterParams,
  setFilterParams,
  properties,
  isLoading,
  getListPropertyAsync,
}: IPropertiesProps) => {
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
  const handleChangePage = (event: ChangeEvent<unknown>, page: number) => {
    setFilterParams({ ...filterParams, PageIndex: page })
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className="flex flex-col items-center">
      {userLogin && (
        <PostProperty
          getListPropertyAsync={getListPropertyAsync}
          filterParams={filterParams}
        />
      )}

      <FilterProperty
        filterParams={filterParams}
        setFilterParams={setFilterParams}
        getListPropertyAsync={getListPropertyAsync}
      />
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 mt-5">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : properties.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 mt-5">
            {properties.map((property) => (
              <PropertyItem
                key={property.id}
                propertyId={property.id}
                title={property.title}
                propertyImages={property.propertyImages}
                numberOfReviews={property.numberOfReviews}
                rating={property.rating}
                isFavorite={property.isFavorite}
                hostId={property.hostId}
                detailProperty={property.description}
                pricePerNight={property.pricePerNight}
              />
            ))}
            <div className="py-8 flex items-center">
              <Pagination
                color="primary"
                count={filterParams.TotalPages}
                page={filterParams.PageIndex}
                onChange={handleChangePage}
                sx={{ mx: 'auto' }}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="px-5 md:px-10 py-12">
          <Image
            src={EmtyData}
            alt="empty-data"
            width={300}
            height={300}
            className="mx-auto"
          />
          <h1 className="font-bold text-cyan-700 mb-8 text-2xl text-center">
            Có vẻ như phòng bạn muốn tìm không tồn tại 💓
          </h1>
          <p className="text-center text-cyan-700">
            Hãy xóa bộ lọc và tìm kiếm những căn phòng tuyệt vời khác nhé!
          </p>
        </div>
      )}
    </div>
  )
}

export default Properties

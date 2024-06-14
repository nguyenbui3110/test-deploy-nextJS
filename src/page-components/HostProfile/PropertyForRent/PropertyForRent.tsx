// import { getHostProperties } from '@/services/HostService/hostService';
import { ChangeEvent, useEffect, useState } from 'react'
// import RoomItem from '../HomePage/RoomItem';
// import { PropertyType } from '@/@types/property';
import { Pagination } from '@mui/material'
import PropertyItem from '@/src/page-components/Home/Properties/PropertyItem/PropertyItem'
import { getListPropertyOfHost } from '@/src/apis/property'
import Skeleton from '@/src/page-components/Home/Properties/Skeleton/Skeleton'
import { IProperty } from '@/src/page-components/Home/Properties/Properties.type'
import { DEFAULT_PAGE } from '@/src/constant'

interface PropsType {
  hostId: number
}

const PropertyForRent = ({ hostId }: PropsType) => {
  const [listRooms, setListRooms] = useState<IProperty[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE)
  const [totalPages, setTotalPages] = useState<number>(DEFAULT_PAGE)

  useEffect(() => {
    getListPropertyOfHostAsyns()
  }, [hostId, currentPage])

  const getListPropertyOfHostAsyns = async () => {
    try {
      setIsLoading(true)
      const { data, totalPages } = await getListPropertyOfHost(
        hostId,
        currentPage
      )
      setListRooms(data)
      setTotalPages(totalPages)
    } catch (e) {
    } finally {
      setIsLoading(false)
    }
  }
  const handleChangePage = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }

  return (
    <div className="mt-2">
      <h2 className="font-semibold text-2xl text-[#4b7782] py-4">
        Danh sách phòng cho thuê
      </h2>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-6 mt-5">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-6 mt-5">
            {listRooms.map((room) => (
              <PropertyItem
                key={room.id}
                propertyId={room.id}
                title={room.title}
                propertyImages={room.propertyImages}
                numberOfReviews={room.numberOfReviews}
                rating={room.rating}
                isFavorite={room.isFavorite}
                hostId={room.hostId}
                detailProperty={room.description}
              />
            ))}
          </div>
          <div className="py-8">
            <Pagination
              color="primary"
              count={totalPages}
              page={currentPage}
              onChange={handleChangePage}
              sx={{ width: '100%', mx: 'auto' }}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default PropertyForRent

'use client'
import MainLayout from '@/src/components/layouts/MainLayout'
import { Attachments } from '@/src/page-components/DetailProperty/Attachments'
import { BookingProperty } from '@/src/page-components/DetailProperty/BookingProperty'
import { FormPostReview } from '@/src/page-components/DetailProperty/FormPostReview'
import { IntroduceProperty } from '@/src/page-components/DetailProperty/IntroduceProperty'
import { IntroduceHost } from '@/src/page-components/DetailProperty/IntrotruceHost'
import { LocationOnMap } from '@/src/page-components/DetailProperty/LocationOnMap'
import { ReviewProperty } from '@/src/page-components/DetailProperty/ReviewProperty'

import { Title } from '@/src/page-components/DetailProperty/Title'
import { IPropertyDetail } from '@/src/page-components/Home/Properties/Properties.type'
import { Divider } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { useParams } from 'next/navigation'
import { getPropertyById } from '@/src/apis/property'
import { IReviewProperty } from '@/src/page-components/DetailProperty/ReviewProperty/ReviewProperty.type'
import { getPropertyReview } from '@/src/apis/review'

const DetailProperty = () => {
  const { id } = useParams()

  const [propertyDetail, setPropertyDetail] = useState<IPropertyDetail>()
  const [listReview, setListReview] = useState<IReviewProperty[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)

  const handleChangePage = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }
  useEffect(() => {
    if (id) {
      getInfoProperty()
      getListReviewProperty(currentPage)
    }
  }, [id, currentPage])

  const getListReviewProperty = async (currentPage: number) => {
    try {
      const { data, totalPages } = await getPropertyReview(id, currentPage)
      setTotalPages(totalPages)
      setListReview(data)
    } catch ({ title }) {
      toast.error(title)
    }
  }

  const getInfoProperty = async () => {
    try {
      const { data } = await getPropertyById(+id)
      setPropertyDetail(data)
    } catch ({ title }) {
      toast.error(title)
    }
  }
  return (
    <MainLayout>
      {propertyDetail && (
        <main className="min-h-screen">
          <Attachments propertyImages={propertyDetail?.propertyImages} />
          <Title
            title={propertyDetail?.title}
            address={propertyDetail?.address}
            city={propertyDetail?.city}
          />
          <div className="lg:flex lg:items-start lg:justify-between mb-5 gap-16">
            <BookingProperty
              propertyId={+propertyDetail?.id}
              maxGuestCount={propertyDetail?.maxGuestCount}
              pricePerNight={propertyDetail?.pricePerNight}
            />
            <div className="flex flex-col gap-6 w-full lg:w-3/5">
              <IntroduceHost hostId={propertyDetail?.hostId} />
              <Divider />
              <IntroduceProperty
                bathroomCount={propertyDetail?.bathroomCount}
                bedCount={propertyDetail?.bedCount}
                description={propertyDetail?.description}
                numberOfReviews={propertyDetail?.numberOfReviews}
                maxGuestCount={propertyDetail?.maxGuestCount}
                rating={propertyDetail?.rating}
              />
            </div>
          </div>
          <FormPostReview
            propertyId={propertyDetail?.id}
            getListReviewProperty={getListReviewProperty}
          />
          <ReviewProperty
            propertyId={id as string}
            listReview={listReview}
            getListReviewProperty={getListReviewProperty}
            totalPages={totalPages}
            currentPage={currentPage}
            handleChangePage={handleChangePage}
          />
          <Divider className="py-4" />
          {propertyDetail && (
            <LocationOnMap
              latitude={propertyDetail.latitude}
              longitude={propertyDetail.longitude}
            />
          )}
        </main>
      )}
    </MainLayout>
  )
}
export default DetailProperty

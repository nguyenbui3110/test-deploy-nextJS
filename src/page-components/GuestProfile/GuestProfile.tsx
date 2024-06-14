'use client'
import { getGuestInfo } from '@/src/apis/guest'
import MainLayout from '@/src/components/layouts/MainLayout'
import { USER_ROLE } from '@/src/constant'
import { IGuestInfo } from '@/src/page-components/GuestProfile/GuestProfile.type'
import { GuestReview } from '@/src/page-components/GuestProfile/GuestReview'
import { GeneralInformation } from '@/src/page-components/HostProfile/GeneralInformation'
import { Introduce } from '@/src/page-components/HostProfile/Introduce'
import { Divider } from '@mui/material'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const GuestProfile = () => {
  const { id } = useParams()
  const [guestInfo, setGuestInfo] = useState<IGuestInfo>()

  const getGuestInfoAsync = async () => {
    try {
      const { data } = await getGuestInfo(+id)
      setGuestInfo(data)
    } catch (error) {}
  }
  useEffect(() => {
    getGuestInfoAsync()
  }, [id])
  console.log(guestInfo)

  return (
    <MainLayout>
      {guestInfo && (
        <div className="mx-auto w-full px-2 py-4 flex gap-12">
          <div className="grid">
            <Introduce
              name={guestInfo.name}
              introduction={guestInfo.introduction}
              address={guestInfo.address}
              city={guestInfo.city}
            />
            <Divider />
            <GuestReview
              guestId={+id}
              name={guestInfo.name}
              getGuestInfoAsync={getGuestInfoAsync}
            />
          </div>
          <GeneralInformation
            avatarUrl={guestInfo.avatarUrl}
            joinedAt={guestInfo.joinedAt}
            name={guestInfo.name}
            numberOfReviews={guestInfo.numberOfReviews}
            rating={guestInfo.rating}
            userRole={USER_ROLE.GUEST}
            userId={guestInfo.userId}
          />
        </div>
      )}
    </MainLayout>
  )
}

export default GuestProfile

'use client'
import { getHostInfo } from '@/src/apis/host'
import MainLayout from '@/src/components/layouts/MainLayout'
import { USER_ROLE } from '@/src/constant'

import { GeneralInformation } from '@/src/page-components/HostProfile/GeneralInformation'
import { IHostInfo } from '@/src/page-components/HostProfile/HostProfile.type'
import { HostReview } from '@/src/page-components/HostProfile/HostReview'
import { Introduce } from '@/src/page-components/HostProfile/Introduce'
import { PropertyForRent } from '@/src/page-components/HostProfile/PropertyForRent'
import { Divider } from '@mui/material'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const HostProfile = () => {
  const { id } = useParams()

  const [hostInfo, setHostInfo] = useState<IHostInfo>(null)
  const getHostInfoAsync = async () => {
    try {
      const { data } = await getHostInfo(+id)
      setHostInfo(data)
    } catch (error) {}
  }

  useEffect(() => {
    getHostInfoAsync()
  }, [id])

  return (
    <MainLayout>
      {hostInfo && (
        <div className="mx-auto w-full px-2 py-4 flex gap-12">
          <div className="grid">
            <Introduce
              name={hostInfo.name}
              introduction={hostInfo.introduction}
              address={hostInfo.address}
              city={hostInfo.city}
            />
            <Divider />
            <HostReview
              hostId={+id}
              name={hostInfo.name}
              getHostInfoAsync={getHostInfoAsync}
            />
            <Divider />
          </div>
          <GeneralInformation
            avatarUrl={hostInfo.avatarUrl}
            joinedAt={hostInfo.joinedAt}
            name={hostInfo.name}
            numberOfReviews={hostInfo.numberOfReviews}
            rating={hostInfo.rating}
            userRole={USER_ROLE.HOST}
            userId={hostInfo.userId}
          />
        </div>
      )}
      <PropertyForRent hostId={+id} />
    </MainLayout>
  )
}

export default HostProfile

'use client'
import { getListProperty } from '@/src/apis/property'
import { Contacts } from '@/src/components/Contacts'
import { Sidebar } from '@/src/components/Sidebar'
import HomePageLayout from '@/src/components/layouts/HomePageLayout'
import {
  DEFAULT_FILTER_PARAMS,
  IFilterPamrams,
} from '@/src/page-components/Home/FilterProperties/FilterProperty.type'
import Properties from '@/src/page-components/Home/Properties/Properties'
import { IProperty } from '@/src/page-components/Home/Properties/Properties.type'

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Home = () => {
  const [filterParams, setFilterParams] = useState<IFilterPamrams>(
    DEFAULT_FILTER_PARAMS
  )

  const [properties, setProperties] = useState<IProperty[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getListPropertyAsync = async (params: IFilterPamrams) => {
    try {
      setIsLoading(true)
      const { data, totalPages } = await getListProperty(params)
      setFilterParams({ ...filterParams, TotalPages: totalPages })
      setProperties(data)
    } catch (e) {
      toast.error(e.message)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getListPropertyAsync(filterParams)
  }, [filterParams.PageIndex])

  return (
    <HomePageLayout>
      <main className="">
        <Sidebar />
        <div className="flex items-center justify-center">
          <Properties
            filterParams={filterParams}
            setFilterParams={setFilterParams}
            properties={properties}
            isLoading={isLoading}
            getListPropertyAsync={getListPropertyAsync}
          />
        </div>
        <Contacts />
      </main>
    </HomePageLayout>
  )
}
export default Home

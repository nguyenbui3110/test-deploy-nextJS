import dynamic from 'next/dynamic'
import { Metadata } from 'next'
import Loading from '@/src/components/Loading/Loading'
const DynamicBookingResult = dynamic(
  () => import('@/src/page-components/BookingResult/BookingResult'),
  {
    ssr: false,
    loading: () => <Loading />,
  }
)
  
const IndexPage = async (props) => {
  return <DynamicBookingResult {...props.searchParams} />
}

export default IndexPage

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Booking Result',
    description: 'Booking Result',
  }
}

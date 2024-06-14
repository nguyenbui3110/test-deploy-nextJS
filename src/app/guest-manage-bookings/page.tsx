import dynamic from 'next/dynamic'
import { Metadata } from 'next'
import Loading from '@/src/components/Loading/Loading'
const DynamicGuestManageBookings = dynamic(
  () => import('@/src/page-components/GuestManageBookings/GuestManageBookings'),
  {
    ssr: false,
    loading: () => <Loading />,
  }
)

const IndexPage = async (props) => {
  return <DynamicGuestManageBookings {...props.searchParams} />
}

export default IndexPage

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Guest Manage Booking',
    description: 'Guest Manage Booking',
  }
}

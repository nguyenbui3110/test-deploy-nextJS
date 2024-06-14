import dynamic from 'next/dynamic'
import { Metadata } from 'next'
import Loading from '@/src/components/Loading/Loading'
const DynamicGuestProfile = dynamic(
  () => import('@/src/page-components/GuestProfile/GuestProfile'),
  {
    ssr: false,
    loading: () => <Loading />,
  }
)

const IndexPage = async (props) => {
  return <DynamicGuestProfile {...props.searchParams} />
}

export default IndexPage

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Guest Profile',
    description: 'Guest Profile',
  }
}

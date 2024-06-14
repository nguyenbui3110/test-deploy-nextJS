import dynamic from 'next/dynamic'
import { Metadata } from 'next'
import Loading from '@/src/components/Loading/Loading'
const DynamicHostProfile = dynamic(
  () => import('@/src/page-components/HostProfile/HostProfile'),
  {
    ssr: false,
    loading: () => <Loading />,
  }
)

const IndexPage = async (props) => {
  return <DynamicHostProfile {...props.searchParams} />
}

export default IndexPage

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Host Profile',
    description: 'Host Profile',
  }
}

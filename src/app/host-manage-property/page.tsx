import dynamic from 'next/dynamic'
import { Metadata } from 'next'
import Loading from '@/src/components/Loading/Loading'
const DynamicHostManageProperty = dynamic(
  () => import('@/src/page-components/HostManageProperty/HostManageProperty'),
  {
    ssr: false,
    loading: () => <Loading />,
  }
)

const IndexPage = async (props) => {
  return <DynamicHostManageProperty {...props.searchParams} />
}

export default IndexPage

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Host Manage Property',
    description: 'Host Manage Property',
  }
}

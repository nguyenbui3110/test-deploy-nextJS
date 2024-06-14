import dynamic from 'next/dynamic'
import { Metadata } from 'next'
import Loading from '@/src/components/Loading/Loading'
const DynamicManageProperty = dynamic(
  () => import('@/src/page-components/Admin/ManageAccount/ManageAccount'),
  // {
  //   ssr: false,
  //   loading: () => <Loading />,
  // }
)

const IndexPage = async (props) => {
  return <DynamicManageProperty {...props.searchParams} />
}

export default IndexPage

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'ManageAccount',
    description: 'ManageAccount',
  }
}
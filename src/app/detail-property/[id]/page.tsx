import dynamic from 'next/dynamic'
import { Metadata } from 'next'
import Loading from '@/src/components/Loading/Loading'
const DynamicDetailProperty = dynamic(
  () => import('@/src/page-components/DetailProperty/DetailProperty'),
  {
    ssr: false,
    loading: () => <Loading />,
  }
)

const IndexPage = async (props) => {
  return <DynamicDetailProperty {...props.searchParams} />
}

export default IndexPage

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Detail Property',
    description: 'Detail Property',
  }
}

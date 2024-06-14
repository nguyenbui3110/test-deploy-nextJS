import dynamic from 'next/dynamic'
import { Metadata } from 'next'
import Loading from '@/src/components/Loading/Loading'
const DynamicMyAccount = dynamic(
  () => import('@/src/page-components/MyAccount/MyAccount'),
  {
    ssr: false,
    loading: () => <Loading />,
  }
)

const IndexPage = async (props) => {
  return <DynamicMyAccount {...props.searchParams} />
}

export default IndexPage

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'My Account',
    description: 'MyAccount',
  }
}

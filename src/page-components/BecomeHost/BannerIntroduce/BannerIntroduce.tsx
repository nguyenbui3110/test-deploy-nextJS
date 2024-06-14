import BecomeHostBanner from '@/assets/images/become-host-banner.webp'
import Image from 'next/image'

const BannerIntroduce = () => {
  return (
    <div className="pt-4">
      <div className="flex justify-center mb-5">
        <Image src={BecomeHostBanner} alt="Become Host banner" />
      </div>
    </div>
  )
}

export default BannerIntroduce

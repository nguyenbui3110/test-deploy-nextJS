import BathroomIcon from '@mui/icons-material/Bathroom'
import StarIcon from '@mui/icons-material/Star'
import RateReviewIcon from '@mui/icons-material/RateReview'
import BedroomParentIcon from '@mui/icons-material/BedroomParent'
import PersonIcon from '@mui/icons-material/Person'

interface PropsType {
  bathroomCount: number
  bedCount: number
  description: string
  maxGuestCount: number
  numberOfReviews: number
  rating: number
}

const IntroduceProperty = ({
  bathroomCount,
  bedCount,
  description,
  maxGuestCount,
  numberOfReviews,
  rating,
}: PropsType) => {
  return (
    <>
      <div className="sm:flex sm:justify-center lg:justify-between text-sm">
        <div className="w-1/2">
          <h2 className="text-xl text-[#4b7782] font-bold py-2">
            Thông tin cơ bản
          </h2>
          <div className="flex gap-3 py-3">
            <BathroomIcon sx={{ color: '#4b7782' }} />
            <p className="">Số phòng tắm: {bathroomCount} phòng</p>
          </div>
          <div className="flex gap-3 py-3">
            <BedroomParentIcon sx={{ color: '#4b7782' }} />
            <p className="">Số phòng ngủ: {bedCount} phòng</p>
          </div>
          <div className="flex gap-3 py-3">
            <PersonIcon sx={{ color: '#4b7782' }} />
            <p className="">Số khách tối đa: {maxGuestCount} người</p>
          </div>
          <div className="flex gap-3 py-3">
            <RateReviewIcon sx={{ color: '#4b7782' }} />
            <p className="">Số lượt đánh giá: {numberOfReviews}</p>
          </div>
          <div className="flex gap-3 py-3">
            <StarIcon sx={{ color: '#4b7782' }} />
            <p className="">
              Điểm đánh giá: {rating > 0 ? rating.toFixed(2) : 'chưa có'}
            </p>
          </div>
        </div>
        <div className="w-1/2">
          <h4 className="text-xl text-[#4b7782] font-bold py-2">Mô tả phòng</h4>
          <p className=" text-gray-500 text-justify pb-3 line-clamp-6">
            {description}
          </p>
        </div>
      </div>
    </>
  )
}

export default IntroduceProperty

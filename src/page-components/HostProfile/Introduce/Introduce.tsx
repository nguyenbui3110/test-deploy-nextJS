import ApartmentIcon from '@mui/icons-material/Apartment'
import HomeIcon from '@mui/icons-material/Home'

interface Propstype {
  name: string
  introduction: string
  address: string
  city: string
}

const Introduce = ({ name, introduction, address, city }: Propstype) => {
  return (
    <div className="pb-5">
      <h4 className="font-semibold text-2xl text-gray-600">
        Thông tin về {name}
      </h4>
      <p className="py-2 flex gap-2 items-end font-thin text-gray-500">
        <ApartmentIcon sx={{ color: '#b33871' }} />
        <span>Thành phố: {city}</span>
      </p>
      <p className="font-thin flex gap-2 text-gray-500">
        <HomeIcon sx={{ color: '#0071a7' }} />
        <span>Địa chỉ: {address}</span>
      </p>

      <p className="py-4 font-thin text-gray-500 line-clamp-3">
        <span className="font-medium text-gray-600">Giới thiệu: </span>
        {introduction}
      </p>
    </div>
  )
}

export default Introduce

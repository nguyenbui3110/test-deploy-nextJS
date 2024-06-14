import { DEFAULT_PAGE } from '@/src/constant'
import { PropertyType } from '@/src/page-components/Home/Properties/Properties.type'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
}

export enum OrderBy {
  RATING = 'Rating',
  NUMBER_OF_REVIEWS = 'NumberOfReviews',
}
export const DEFAULT_FILTER_PARAMS: IFilterPamrams = {
  PageIndex: DEFAULT_PAGE,
  TotalPages: 0,
  Type: [],
  OrderBy: '',
  City: '',
  CheckInDate: '',
  CheckOutDate: '',
  IsDescending: true,
}

export interface IFilterPamrams {
  PageIndex: number
  TotalPages: number
  Type: PropertyType[]
  OrderBy: OrderBy | ''
  City: string | ''
  CheckInDate: string | ''
  CheckOutDate: string | ''
  IsDescending: boolean
}

export const provinces = [
  'An Giang',
  'Bà Rịa',
  'Bà Rịa-Vũng Tàu',
  'Bạc Liêu',
  'Bắc Giang',
  'Bắc Ninh',
  'Bến Tre',
  'Bình Định',
  'Bình Dương',
  'Bình Phước',
  'Cà Mau',
  'Cao Bằng',
  'Cần Thơ',
  'Đà Nẵng',
  'Đắk Lắk',
  'Đắk Nông',
  'Điện Biên',
  'Đồng Bằng Sông Cửu Long',
  'Đồng Nai',
  'Đồng Tháp',
  'Gia Lai',
  'Hà Giang',
  'Hà Nội',
  'Hà Tĩnh',
  'Hải Dương',
  'Hải Phòng',
  'Hậu Giang',
  'Hoà Bình',
  'Hòa Bình',
  'Hưng Yên',
  'Khánh Hòa',
  'Kiên Giang',
  'Kon Tum',
  'Lai Châu',
  'Lâm Đồng',
  'Long An',
  'Nghệ An',
  'Ninh Bình',
  'Ninh Thuận',
  'Phú Thọ',
  'Phú Yên',
  'Quảng Bình',
  'Quảng Nam',
  'Quảng Ngãi',
  'Quảng Ninh',
  'Quảng Trị',
  'Sài Gòn',
  'Sóc Trăng',
  'Sơn La',
  'Tây Ninh',
  'Thái Bình',
  'Thái Nguyên',
  'Thanh Hóa',
  'Thừa Thiên-Huế',
  'Tiền Giang',
  'TP. Hồ Chí Minh',
  'Trà Vinh',
  'Vĩnh Long',
  'Vĩnh Phúc',
  'Yên Bái',
]

export const OrderByOptions = [
  { value: OrderBy.RATING, label: 'Điểm dánh giá' },
  { value: OrderBy.NUMBER_OF_REVIEWS, label: 'Số lượt đánh giá' },
]

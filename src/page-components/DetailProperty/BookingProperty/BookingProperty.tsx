import Button from '@mui/material/Button'
import { Divider } from '@mui/material'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { CalendarProperty } from '@/src/page-components/DetailProperty/BookingProperty/CalendarProperty'
import { QuantityContained } from '@/src/page-components/DetailProperty/QuantityContained'
import { useRouter } from 'next/navigation'
import { routes } from '@/src/routes'
import { formatMoney } from '@/src/utils/common'
import { createBooking } from '@/src/apis/booking'
import { createBookingPayment } from '@/src/apis/payment'
import { TOAST_MESSAGE } from '@/src/toast-message/ToastMessage'

interface Propstype {
  propertyId: number
  maxGuestCount: number
  pricePerNight: number
}
const BookingProperty = ({
  propertyId,
  maxGuestCount,
  pricePerNight,
}: Propstype) => {
  const userLogin = JSON.parse(localStorage.getItem('user_login') || '{}')
  const router = useRouter()

  const [dateStart, setDateStart] = useState<Date | null>(null)
  const [dateEnd, setDateEnd] = useState<Date | null>(null)
  const [guestCount, setGuestCount] = useState(0)

  const diffInMs =
    new Date(String(dateEnd)).getTime() - new Date(String(dateStart)).getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  const handleBooking = async () => {
    if (userLogin) {
      if (dateStart && dateEnd && guestCount > 0) {
        const dataBooking = {
          propertyId,
          checkInDate: new Date(String(dateStart)),
          checkOutDate: new Date(String(dateEnd)),
          numberOfGuest: guestCount,
          note: '',
        }
        console.log(dataBooking)

        try {
          if (pricePerNight) {
            const { data } = await createBooking(dataBooking)
            console.log(data)

            const { data: url } = await createBookingPayment({
              bookingId: data.id,
              bankCode: 'VNBANK',
            })
            window.open(url, '_self')
          } else {
            const request = {
              propertyId: propertyId,
              checkInDate: new Date(dateStart),
              checkOutDate: new Date(dateEnd),
              numberOfGuest: +guestCount,
              note: '',
            }
            const resolveAfter2Sec = new Promise((resolve) =>
              setTimeout(resolve, 1500)
            )
            toast
              .promise(resolveAfter2Sec, {
                pending: TOAST_MESSAGE.booking.create.pending,
                success: TOAST_MESSAGE.booking.create.success,
                error: TOAST_MESSAGE.booking.create.error,
              })
              .then(async () => {
                await createBooking(request)
                router.push(routes.bookingResult.sendData.generatePath(true))
              })
          }
        } catch (error) {
          throw error
        }
      } else {
        toast.error('Bạn phải nhập đầy đủ thông tin để đặt phòng !')
      }
    } else {
      toast.error('Bạn phải đăng nhập để đặt phòng !')
    }
  }
  return (
    <div className="border shadow-xl rounded-xl bg-white">
      <div className="grid p-5 max-w-[400xp]">
        {pricePerNight ? (
          <p className="py-4 text-cyan-800 text-xl">
            {formatMoney(pricePerNight)} vnd/đêm
          </p>
        ) : (
          <p className="py-4 text-gray-600 text-md text-center">
            Với sứ mệnh kết nối nên căn phòng này là hoàn toàn miễn phí 💕
          </p>
        )}

        <Divider />
        <div className="flex flex-col gap-5">
          <p className="pt-8">Thời gian đặt phòng</p>
          <CalendarProperty
            propertyId={propertyId}
            dateStart={dateStart}
            dateEnd={dateEnd}
            setDateStart={setDateStart}
            setDateEnd={setDateEnd}
          />
          <QuantityContained
            guestCount={guestCount}
            setGuestCount={setGuestCount}
            maxGuestCount={maxGuestCount}
          />
        </div>
        <br />
        <Divider />
        <div className="flex justify-between py-3">
          {!isNaN(diffInDays) && (
            <p className="text-gray-500 font-thin">Tổng tiền </p>
          )}
          {!isNaN(diffInDays) && (
            <p className="text-gray-500 font-thin">
              {pricePerNight
                ? `${formatMoney(pricePerNight * diffInDays)} vnd`
                : 'Miễn phí'}
            </p>
          )}
        </div>
        <>
          <Button
            variant="contained"
            sx={{ height: 56, mt: 3 }}
            onClick={handleBooking}
          >
            ĐẶT PHÒNG
          </Button>
        </>
      </div>
    </div>
  )
}

export default BookingProperty

import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import {
  formatDateYYYYMMDD,
  getNextYearDate,
  mergeBusyDates,
} from '@/src/utils/DateBookingHandler'
import { getListBookingOfproperty } from '@/src/apis/booking'

// import { getCurrentDate, getNextYearDate } from '@/helpers/GetTime/getTime'
// import { mergeBusyDates } from '@/hooks/mergeBusyDates'
// import { getScheduleBooking } from '@/services/BookingService/bookingService'

interface PropsType {
  propertyId: number
  dateStart: Date | null
  dateEnd: Date | null
  setDateStart: React.Dispatch<React.SetStateAction<Date | null>>
  setDateEnd: React.Dispatch<React.SetStateAction<Date | null>>
}

const CalendarProperty = ({
  propertyId,
  dateStart,
  dateEnd,
  setDateStart,
  setDateEnd,
}: PropsType) => {
  const currentDate = dayjs() // Ngày hiện tại
  const [scheduleBooking, setScheduleBooking] = useState([])

  const disabledDates = mergeBusyDates(scheduleBooking)
  useEffect(() => {
    const currentDate = formatDateYYYYMMDD(new Date())
    const nextyear = getNextYearDate()
    propertyId &&
      getScheduleBookingOfProperty(propertyId, currentDate, nextyear)
  }, [propertyId, dateStart, dateEnd])

  const getScheduleBookingOfProperty = async (
    propertyId: number,
    fromDate: string,
    toDate: string
  ) => {
    try {
      const { data } = await getListBookingOfproperty(
        propertyId,
        fromDate,
        toDate
      )
      setScheduleBooking(data)
    } catch (err) {}
  }
  const shouldDisableDate = (date: Date) => {
    return (
      disabledDates.some(
        (disabledDate) =>
          new Date(String(date)).getDate() === disabledDate.getDate() &&
          new Date(String(date)).getMonth() === disabledDate.getMonth() &&
          new Date(String(date)).getFullYear() === disabledDate.getFullYear()
      ) || currentDate.isAfter(dayjs(date))
    )
  }

  const handleDateStartChange = (date: Date | null) => {
    if (dateEnd && date && currentDate.isAfter(dayjs(date))) {
      setDateEnd(null)
    }

    if (dateEnd && date && dayjs(date).isSame(dayjs(dateEnd), 'day')) {
      toast.error('Ngày đi không được trùng ngày về')
      setDateStart(null)
      setDateEnd(null)
    } else {
      setDateStart(date)
    }
  }

  const handleDateEndChange = (date: Date | null) => {
    if (dateStart && date && dayjs(date).isSame(dayjs(dateStart), 'day')) {
      toast.error('Ngày về không được trùng ngày đi')
      setDateStart(null)
      setDateEnd(null)
    } else {
      if (dateStart && date) {
        const startDate = dayjs(dateStart)
        const endDate = dayjs(date)

        if (startDate.isAfter(endDate)) {
          toast.error('Ngày về phải sau ngày đi')
          setDateStart(null)
          setDateEnd(null)
        } else {
          setDateEnd(date)
        }
      } else {
        setDateEnd(date)
      }
    }
  }

  return (
    <div className="flex gap-2">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']} sx={{ width: '100%' }}>
          <DatePicker
            label="Ngày đi"
            value={dateStart}
            onChange={handleDateStartChange}
            shouldDisableDate={shouldDisableDate}
          />
        </DemoContainer>
        <DemoContainer components={['DatePicker']} sx={{ width: '100%' }}>
          <DatePicker
            label="Ngày về"
            value={dateEnd}
            onChange={handleDateEndChange}
            shouldDisableDate={shouldDisableDate}
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  )
}

export default CalendarProperty

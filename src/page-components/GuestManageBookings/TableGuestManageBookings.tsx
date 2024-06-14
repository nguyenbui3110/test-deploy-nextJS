import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { getListBookingOfGuest } from '@/src/apis/booking'
import { ChangeEvent, useEffect, useState } from 'react'
import { DEFAULT_PAGE } from '@/src/constant'
import React from 'react'
import Link from 'next/link'
import { routes } from '@/src/routes'
import { formatDateYYYYMMDD } from '@/src/utils/DateBookingHandler'
import Loading from '@/src/components/Loading/Loading'
import { toast } from 'react-toastify'
import { createCancellationTicket } from '@/src/apis/cancellation'
import { TOAST_MESSAGE } from '@/src/toast-message/ToastMessage'
import { EmptyData } from '@/src/components/EmptyData'
import { formatMoney } from '@/src/utils/common'
import { createBookingPayment } from '@/src/apis/payment'
import { useRouter } from 'next/navigation'

function createData(
  id: number,
  propertyName: string,
  propertyId: number,
  hostName: string,
  checkInDate: string,
  checkOutDate: string,
  status: string,
  totalPrice: number
) {
  return {
    id,
    propertyName,
    propertyId,
    hostName,
    checkInDate,
    checkOutDate,
    status,
    totalPrice,
  }
}
const CancellationReason = ['PersonalIssue', 'Other']

interface IRowProps {
  row: ReturnType<typeof createData>
  setIsRefresh: React.Dispatch<React.SetStateAction<boolean>>
}

const Row = ({ row, setIsRefresh }: IRowProps) => {
  const router = useRouter()

  const [cancellationReason, setCancellationReason] = useState<string>(
    CancellationReason[0]
  )
  const [reason, setReason] = useState<string>('')
  const handleChangeCancellationReason = (event: SelectChangeEvent) => {
    setCancellationReason(event.target.value as string)
  }
  const [openModalCancellation, setOpenModalCancellation] = useState(false)
  const handleCloseModalCancel = () => {
    setOpenModalCancellation(false)
    setCancellationReason(CancellationReason[0])
    setReason('')
  }

  const createCancellationRequest = async () => {
    try {
      const dataCancelBooking = {
        bookingId: row.id,
        cancellationReason: cancellationReason,
        reason: reason,
        isGuest: true,
        attachments: [],
      }
      await toast.promise(createCancellationTicket(dataCancelBooking), {
        pending: TOAST_MESSAGE.cancellation.create.pending,
        success: TOAST_MESSAGE.cancellation.create.success,
        error: TOAST_MESSAGE.cancellation.create.error,
      })
      handleCloseModalCancel()
      setIsRefresh((prev) => !prev)
    } catch (error) {}
  }
  const handlePaymentAgain = async (bookingId: number) => {
    try {
      const { data: url } = await createBookingPayment({
        bookingId,
        bankCode: 'VNBANK',
      })
      window.open(url, '_self')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>{row.id}</TableCell>
        <TableCell component="th" scope="row" sx={{ maxWidth: 300 }}>
          <Link href={routes.detailProperty.generatePath(row.propertyId)}>
            {row.propertyName}
          </Link>
        </TableCell>
        <TableCell>{row.hostName}</TableCell>
        <TableCell>{formatDateYYYYMMDD(row.checkInDate)}</TableCell>
        <TableCell>{formatDateYYYYMMDD(row.checkOutDate)}</TableCell>
        <TableCell>
          {row.totalPrice ? `${formatMoney(row.totalPrice)} đ` : 'Miễn phí'}
        </TableCell>
        <TableCell>
          {row.status === 'Pending' && (
            <Chip
              label="Chờ xác nhận"
              sx={{ backgroundColor: '#faeacf', color: '#f39c11' }}
            />
          )}
          {row.status === 'Confirmed' && (
            <Chip
              label="Đã xác nhận"
              sx={{ backgroundColor: '#b0f7c0', color: '#28a745' }}
            />
          )}
          {row.status === 'Rejected' && (
            <Chip
              label="Thất bại"
              sx={{ backgroundColor: '#ffd0cc', color: '#e84c3d' }}
            />
          )}
          {row.status === 'CheckedIn' && (
            <Chip
              label="Check In"
              sx={{ backgroundColor: '#efe1f5', color: '#9a59b5' }}
            />
          )}
          {row.status === 'Completed' && (
            <Chip
              label="Hoàn tất"
              sx={{ backgroundColor: '#fae3ee', color: '#b33871' }}
            />
          )}
          {row.status === 'CancelledBeforeCheckIn' && (
            <Chip
              label="Hủy trước check in"
              sx={{ backgroundColor: '#ffd0cc', color: '#e84c3d' }}
            />
          )}
          {row.status === 'CancelledAfterCheckIn' && (
            <Chip
              label="Hủy sau khi đặt"
              sx={{ backgroundColor: '#ffd0cc', color: '#e84c3d' }}
            />
          )}
        </TableCell>
        <TableCell>
          <>
            {row.status === 'Pending' && row.totalPrice !== 0 && (
              <div className="flex gap-4">
                <button
                  type="button"
                  className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300  font-sm rounded-md text-xs px-3 py-1.5 text-center mr-2 mb-2"
                  onClick={() => handlePaymentAgain(row.id)}
                >
                  Thanh toán
                </button>
              </div>
            )}
            {(row.status === 'Confirmed' || row.status === 'CheckedIn') && (
              <>
                <button
                  type="button"
                  className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-pink-200  font-medium rounded-md text-xs px-3 py-1.5 text-center mr-2 mb-2"
                  onClick={() => setOpenModalCancellation(true)}
                >
                  Hủy phòng
                </button>
              </>
            )}

            {row.status === 'Completed' && (
              <button
                type="button"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300  font-sm rounded-md text-xs px-3 py-1.5 text-center mr-2 mb-2"
              >
                <Link href={routes.detailProperty.generatePath(row.propertyId)}>
                  Đánh giá phòng
                </Link>
              </button>
            )}
          </>
          <Dialog
            open={openModalCancellation}
            onClose={handleCloseModalCancel}
            maxWidth="xs"
            fullWidth
          >
            <h3 className="text-cyan-800 font-medium uppercase py-4 text-center">
              Đơn hủy phòng
            </h3>
            <DialogContent>
              <div className="">
                <FormControl fullWidth>
                  <InputLabel id="cancellationReason">Lý do</InputLabel>
                  <Select
                    labelId="cancellationReason"
                    id="demo-simple-select"
                    value={cancellationReason}
                    label="Lý do"
                    onChange={handleChangeCancellationReason}
                    size="medium"
                  >
                    <MenuItem value={CancellationReason[0]} selected>
                      Vấn để cá nhân
                    </MenuItem>
                    <MenuItem value={CancellationReason[1]}>
                      Lý do khác
                    </MenuItem>
                  </Select>
                </FormControl>
                <p className="text-sm pt-3 pb-2 text-gray-700">Mô tả cụ thể</p>
                <textarea
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-cyan-600 focus:border-blue-500 outline-none"
                  placeholder="Mô tả cụ thể ..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                ></textarea>
                <div className="flex items-center justify-end gap-4 pt-8">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleCloseModalCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={createCancellationRequest}
                  >
                    Yêu cầu hủy phòng
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default function TableGuestManageBookings() {
  const userLogin = JSON.parse(localStorage.getItem('user_login') || '{}')
  const [bookings, setBookings] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE)
  const [loading, setLoading] = useState(false)
  const [isRefresh, setIsRefresh] = useState(false)

  const handleChangePage = (event: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const { data, totalPages } = await getListBookingOfGuest(
        userLogin?.id,
        currentPage
      )
      setTotalPages(totalPages)
      const rows = data.map((booking) =>
        createData(
          booking.id,
          booking.propertyName,
          booking.propertyId,
          booking.hostName,
          booking.checkInDate,
          booking.checkOutDate,
          booking.status,
          booking.totalPrice
        )
      )
      setBookings(rows)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [userLogin?.id, isRefresh, currentPage])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {bookings.length > 0 ? (
            <div className="w-full">
              <TableContainer component={Paper}>
                <Table aria-label="guest-booking">
                  <TableHead sx={{ background: '#4b7782' }}>
                    <TableRow>
                      <TableCell sx={{ color: '#fff' }}>ID</TableCell>
                      <TableCell sx={{ color: '#fff' }}>Tên phòng</TableCell>
                      <TableCell sx={{ color: '#fff' }}>
                        Tên chủ phòng
                      </TableCell>
                      <TableCell sx={{ color: '#fff' }}>
                        Ngày Check In
                      </TableCell>
                      <TableCell sx={{ color: '#fff' }}>
                        Ngày Checkout
                      </TableCell>
                      <TableCell sx={{ color: '#fff' }}>Số tiền</TableCell>
                      <TableCell sx={{ color: '#fff' }}>Trạng thái</TableCell>
                      <TableCell sx={{ color: '#fff' }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bookings.map((booking) => (
                      <Row
                        key={booking.propertyName}
                        row={booking}
                        setIsRefresh={setIsRefresh}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <div className="py-8 w-full flex items-center justify-center">
                <Pagination
                  color="primary"
                  count={totalPages}
                  page={currentPage}
                  onChange={handleChangePage}
                  sx={{ mx: 'auto' }}
                />
              </div>
            </div>
          ) : (
            <EmptyData
              title="Danh sách đặt phòng của bạn đang trống"
              description="Hãy đặt phòng tại địa điểm mà bạn yêu thích và trải nghiệm chúng !"
            />
          )}
        </>
      )}
    </>
  )
}

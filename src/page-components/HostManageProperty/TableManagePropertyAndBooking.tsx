import { getHostByUserId } from '@/src/apis/host'
import { deleteProperty, getListPropertyOfHost } from '@/src/apis/property'
import { STATUS_BOOKING, STATUS_PROPERTY } from '@/src/constant'
import { routes } from '@/src/routes'
import {
  Box,
  Chip,
  IconButton,
  Link,
  Button,
  Dialog,
  Pagination,
} from '@mui/material'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import React, { ChangeEvent, useEffect, useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import { toast } from 'react-toastify'
import { TOAST_MESSAGE } from '@/src/toast-message/ToastMessage'

import Collapse from '@mui/material/Collapse'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import {
  formatDateYYYYMMDD,
  getNextYearDate,
} from '@/src/utils/DateBookingHandler'
import {
  getListBookingOfproperty,
  updateStatusBooking,
} from '@/src/apis/booking'
import Loading from '@/src/components/Loading/Loading'
import { formatMoney } from '@/src/utils/common'
import { postRejectdProperty } from '@/src/apis/admin'

function createData(
  id: number,
  title: string,
  city: string,
  address: string,
  type: string,
  maxGuets: number,
  status: string,
  pricePerNight: number,
  bookings: any[]
) {
  return {
    id,
    title,
    city,
    address,
    type,
    maxGuets,
    status,
    pricePerNight,
    bookings,
  }
}
interface IRowProps {
  row: ReturnType<typeof createData>
  setIsRefresh: React.Dispatch<React.SetStateAction<boolean>>
}
const Row = ({ row, setIsRefresh }: IRowProps) => {
  const [open, setOpen] = React.useState(false)

  const [openModalDelete, setOpenModalDelete] = React.useState(false)

  const handleDeleteProperty = async (id: number) => {
    try {
      await toast.promise(postRejectdProperty(id, { reason: 'Admin reject' }), {
        pending: TOAST_MESSAGE.property.delete.pending,
        success: TOAST_MESSAGE.property.delete.success,
        error: TOAST_MESSAGE.property.delete.error,
      })
      setIsRefresh((prev) => !prev)
    } catch (error) {}
  }
  const handlerEditProperty = (id: number) => {}

  const handleChangeSatusBooking = async (
    bookingId: number,
    status: number
  ) => {
    try {
      await toast.promise(updateStatusBooking(bookingId, status), {
        pending: TOAST_MESSAGE.booking.update.pending,
        success: TOAST_MESSAGE.booking.update.success,
        error: TOAST_MESSAGE.booking.update.error,
      })
      setIsRefresh((prev) => !prev)
    } catch (error) {}
  }

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          {row.bookings.length > 0 && (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          )}
        </TableCell>
        <TableCell>{row.id}</TableCell>
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>
        <TableCell>{row.city}</TableCell>
        <TableCell>{row.address}</TableCell>
        <TableCell>{row.type}</TableCell>
        <TableCell>
          {row.pricePerNight
            ? `${formatMoney(row.pricePerNight)} đ`
            : 'Miễn phí'}
        </TableCell>
        <TableCell>{row.maxGuets}</TableCell>
        <TableCell>
          {row.status === STATUS_PROPERTY.PENDING && (
            <Chip
              label="Chờ xác nhận"
              sx={{ backgroundColor: '#faeacf', color: '#f39c11' }}
            />
          )}
          {row.status === STATUS_PROPERTY.APPROVED && (
            <Chip
              label="Đang hoạt động"
              sx={{ backgroundColor: '#b0f7c0', color: '#28a745' }}
            />
          )}
          {row.status === STATUS_PROPERTY.REJECTED && (
            <Chip
              label="Đã bị hủy"
              sx={{ backgroundColor: '#ffd0cc', color: '#e84c3d' }}
            />
          )}
        </TableCell>
        <TableCell>
          <div className="flex gap-4">
            <IconButton
              aria-label="delete-property"
              onClick={() => handlerEditProperty(row.id)}
            >
              <AutoFixHighIcon sx={{ color: '#1976d2', fontSize: 24 }} />
            </IconButton>
            {row.bookings.length <= 0 && (
              <IconButton
                aria-label="delete-property"
                onClick={() => setOpenModalDelete(true)}
              >
                <DeleteForeverIcon sx={{ color: '#c92327', fontSize: 24 }} />
              </IconButton>
            )}

            {/* Dialog */}
            <Dialog
              onClose={() => setOpenModalDelete(false)}
              open={openModalDelete}
            >
              <div className="p-4">
                <p className="pb-6">
                  Bạn có chắc chắn muốn xóa phòng này không?
                </p>
                <div className="flex gap-4 justify-center ">
                  <Button
                    onClick={() => handleDeleteProperty(row.id)}
                    variant="contained"
                    color="primary"
                  >
                    Xóa
                  </Button>
                  <Button
                    onClick={() => setOpenModalDelete(false)}
                    variant="outlined"
                    color="primary"
                  >
                    Hủy
                  </Button>
                </div>
              </div>
            </Dialog>
          </div>
        </TableCell>
      </TableRow>
      {row.bookings.length > 0 && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box
                sx={{
                  margin: 1,
                  backgroundColor: '#fafafa',
                  borderRadius: '4px',
                  padding: '16px',
                }}
              >
                <Typography variant="h6" gutterBottom component="div">
                  Đơn đặt phòng
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Ngày check in</TableCell>
                      <TableCell>Ngày check out</TableCell>
                      <TableCell>Trạng thái</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell component="th" scope="row" sx={{ p: 1.5 }}>
                          {formatDateYYYYMMDD(booking.checkInDate)}
                        </TableCell>
                        <TableCell sx={{ p: 1.5 }}>
                          {formatDateYYYYMMDD(booking.checkOutDate)}
                        </TableCell>
                        <TableCell sx={{ p: 1.5 }}>
                          {booking.status === 'Pending' && (
                            <Chip
                              label="Chờ xác nhận"
                              sx={{
                                backgroundColor: '#faeacf',
                                color: '#f39c11',
                              }}
                            />
                          )}
                          {booking.status === 'Confirmed' && (
                            <Chip
                              label="Đã xác nhận"
                              sx={{
                                backgroundColor: '#b0f7c0',
                                color: '#28a745',
                              }}
                            />
                          )}
                          {booking.status === 'Rejected' && (
                            <Chip
                              label="Thất bại"
                              sx={{
                                backgroundColor: '#ffd0cc',
                                color: '#e84c3d',
                              }}
                            />
                          )}
                          {booking.status === 'CheckedIn' && (
                            <Chip
                              label="Check In"
                              sx={{
                                backgroundColor: '#efe1f5',
                                color: '#9a59b5',
                              }}
                            />
                          )}
                          {booking.status === 'Completed' && (
                            <Chip
                              label="Hoàn tất"
                              sx={{
                                backgroundColor: '#fae3ee',
                                color: '#b33871',
                              }}
                            />
                          )}
                          {booking.status === 'CancelledBeforeCheckIn' && (
                            <Chip
                              label="Hủy trước check in"
                              sx={{
                                backgroundColor: '#ffd0cc',
                                color: '#e84c3d',
                              }}
                            />
                          )}
                          {booking.status === 'CancelledAfterCheckIn' && (
                            <Chip
                              label="Hủy sau khi đặt"
                              sx={{
                                backgroundColor: '#ffd0cc',
                                color: '#e84c3d',
                              }}
                            />
                          )}
                        </TableCell>
                        <TableCell sx={{ p: 1.5 }}>
                          {booking.status === 'Pending' &&
                            !row.pricePerNight && (
                              <div className="flex gap-4">
                                <button
                                  type="button"
                                  className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300  font-sm rounded-md text-xs px-3 py-1.5 text-center mr-2 mb-2"
                                  onClick={() =>
                                    handleChangeSatusBooking(
                                      booking.id,
                                      STATUS_BOOKING.Confirmed
                                    )
                                  }
                                >
                                  Chấp nhận
                                </button>
                                <button
                                  type="button"
                                  className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-pink-200  font-medium rounded-md text-xs px-3 py-1.5 text-center mr-2 mb-2"
                                  onClick={() =>
                                    handleChangeSatusBooking(
                                      booking.id,
                                      STATUS_BOOKING.Rejected
                                    )
                                  }
                                >
                                  Từ chối
                                </button>
                              </div>
                            )}
                          {booking.status === 'Confirmed' && (
                            <button
                              type="button"
                              className="text-white bg-gradient-to-br from-purple-600 to-cyan-400 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300  font-sm rounded-md text-xs px-3 py-1.5 text-center mr-2 mb-2"
                              onClick={() =>
                                handleChangeSatusBooking(
                                  booking.id,
                                  STATUS_BOOKING.CheckedIn
                                )
                              }
                            >
                              Check In
                            </button>
                          )}
                          {booking.status === 'CheckedIn' && (
                            <button
                              type="button"
                              className="text-white bg-gradient-to-br from-purple-600 to-cyan-400 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300  font-sm rounded-md text-xs px-3 py-1.5 text-center mr-2 mb-2"
                              onClick={() =>
                                handleChangeSatusBooking(
                                  booking.id,
                                  STATUS_BOOKING.Completed
                                )
                              }
                            >
                              Check Out
                            </button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  )
}

export default function HostManagePropertyAndBooking({
  isRefresh,
  setIsRefresh,
}) {
  // const userLogin = JSON.parse(localStorage.getItem('user_login'))
  const [userLogin, setUserLogin] = useState<any>({})
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserLogin = localStorage.getItem('user_login');
      if (storedUserLogin) {
        setUserLogin(JSON.parse(storedUserLogin));
      }
    }
  }, [])

  const [hostId, setHostId] = useState<number>()
  const [properties, setProperties] = useState([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)

  const [loading, setLoading] = useState(false)

  const getHostIdByUserIdAsync = async () => {
    try {
      const { data } = await getHostByUserId(userLogin?.id)
      setHostId(data.id)
    } catch (err) {}
  }
  const getPropertyOfHostAsync = async () => {
    try {
      setLoading(true)
      const currentDate = formatDateYYYYMMDD(new Date())
      const nextyear = getNextYearDate()
      const { data, totalPages } = await getListPropertyOfHost(
        hostId,
        currentPage
      )
      const propertyAndBookingsPromises = data?.map(async (property) => {
        const { data: bookingsProperty } = await getListBookingOfproperty(
          property.id,
          currentDate,
          nextyear
        )
        return { ...property, bookings: bookingsProperty }
      })
      const propertyAndBookings = await Promise.all(propertyAndBookingsPromises)
      const rows = propertyAndBookings.map((property) =>
        createData(
          property.id,
          property.title,
          property.city,
          property.address,
          property.type,
          property.maxGuestCount,
          property.status,
          property.pricePerNight,
          property.bookings
        )
      )
      setTotalPages(totalPages)
      setProperties(rows)
    } catch (err) {
    } finally {
      setLoading(false)
    }
  }
  const handleChangePage = (event: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    getHostIdByUserIdAsync()
    hostId && getPropertyOfHostAsync()
  }, [hostId, isRefresh])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table aria-label="host-property-booking">
              <TableHead sx={{ background: '#4b7782' }}>
                <TableRow>
                  <TableCell />
                  <TableCell sx={{ color: '#fff' }}>ID</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Tên phòng</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Thành phố</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Địa chỉ</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Loại phòng</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Giá 1 đêm</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Số khách</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Trạng thái</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {properties.map((row) => (
                  <Row key={row.name} row={row} setIsRefresh={setIsRefresh} />
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
        </>
      )}
    </>
  )
}

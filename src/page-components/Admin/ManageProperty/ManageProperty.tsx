'use client'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import {
  Avatar,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
} from '@mui/material'

import { ChangeEvent, useEffect, useState } from 'react'
import { DEFAULT_PAGE } from '@/src/constant'
import React from 'react'

import { formatDateYYYYMMDD } from '@/src/utils/DateBookingHandler'
import Loading from '@/src/components/Loading/Loading'

import { EmptyData } from '@/src/components/EmptyData'

import { getAllPropertysApi, postRejectdProperty } from '@/src/apis/admin'
import { formatMoney } from '@/src/utils/common'
import { TOAST_MESSAGE } from '@/src/toast-message/ToastMessage'
import { toast } from 'react-toastify'

function createData(
  id: number,
  name: string,
  price: number,
  address: string,
  hostName: string,
  status: string
) {
  return {
    id,
    name,
    price,
    address,
    hostName,
    status,
  }
}

interface IRowProps {
  row: ReturnType<typeof createData>
  setIsRefresh: React.Dispatch<React.SetStateAction<boolean>>
}

const Row = ({ row, setIsRefresh }: IRowProps) => {
  const handleAdminRejectProperty = async (propertyId: number) => {
    try {
      await toast.promise(
        postRejectdProperty(propertyId, { reason: 'Admin reject' }),
        {
          pending: TOAST_MESSAGE.property.delete.pending,
          success: TOAST_MESSAGE.property.delete.success,
          error: TOAST_MESSAGE.property.delete.error,
        }
      )
      setIsRefresh((prev) => !prev)
    } catch (error) {}
  }

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>{row.id}</TableCell>
        <TableCell component="th" scope="row" sx={{ maxWidth: 300 }}>
          {row.name}
        </TableCell>
        <TableCell>{formatMoney(row.price)}</TableCell>
        <TableCell>{row.address}</TableCell>
        <TableCell>{row.hostName}</TableCell>
        <TableCell>
          {row.status === 'Pending' && (
            <Chip
              label="Chờ duyệt"
              sx={{ backgroundColor: '#faeacf', color: '#f39c11' }}
            />
          )}
          {row.status === 'Approved' && (
            <Chip
              label="Đã duyệt"
              sx={{ backgroundColor: '#b0f7c0', color: '#28a745' }}
            />
          )}
          {row.status === 'Rejected' && (
            <Chip
              label="Thất bại"
              sx={{ backgroundColor: '#ffd0cc', color: '#e84c3d' }}
            />
          )}
          {row.status === 'Available' && (
            <Chip
              label="Có sẵn"
              sx={{ backgroundColor: '#b0f7c0', color: '#28a745' }}
            />
          )}
          {row.status === 'Unavailable' && (
            <Chip
              label="Không có sẵn"
              sx={{ backgroundColor: '#ffd0cc', color: '#e84c3d' }}
            />
          )}
        </TableCell>
        <TableCell>
          <button
            type="button"
            className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-pink-200  font-medium rounded-md text-xs px-3 py-1.5 text-center mr-2 mb-2"
            onClick={() => handleAdminRejectProperty(row.id)}
          >
            Xóa phòng
          </button>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}
export interface AccountType {
  id: number
  fullName: string
  username: string
  introduction: string
  phoneNumber: string
  email: string
  city: string
  address: string
  avatarUrl: string
  createdAt: string
  isDeleted: boolean
  isHost: boolean
}

export default function AdminManageProperty() {
  const [status, setStatus] = useState<string>('All')

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string)
  }

  const [listProperty, setListProperty] = useState([])
  const [isRefresh, setIsRefresh] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE)
  const [totalPages, setTotalPages] = useState<number>(DEFAULT_PAGE)

  const handleChangePage = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }

  const fetchProperties = async () => {
    try {
      setLoading(true)
      const { data, totalPages } = await getAllPropertysApi(currentPage, status)
      console.log(data)

      setTotalPages(totalPages)
      const rows = data.map((account) =>
        createData(
          account.id,
          account.title,
          account.pricePerNight,
          account.address,
          account.hostName,
          account.status
        )
      )
      setListProperty(rows)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [currentPage, status, isRefresh])

  return (
    <>
      <div className="pb-2">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-800">
            Quản lý chỗ ở
          </h3>
          <FormControl
            size="small"
            sx={{ width: 200, my: 2, background: 'white' }}
          >
            <InputLabel id="demo-simple-select-label">Vai trò</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="Vai trò"
              onChange={handleChange}
            >
              <MenuItem value="All">Tất cả</MenuItem>
              <MenuItem value="Pending">Chờ duyệt</MenuItem>
              <MenuItem value="Approved">Đã duyệt</MenuItem>
              <MenuItem value="Rejected">Đã xóa</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {listProperty.length > 0 ? (
            <div className="w-full">
              <TableContainer component={Paper}>
                <Table aria-label="guest-booking">
                  <TableHead sx={{ background: '#4b7782' }}>
                    <TableRow>
                      <TableCell sx={{ color: '#fff' }}>ID</TableCell>
                      <TableCell sx={{ color: '#fff' }}>Tên phòng</TableCell>
                      <TableCell sx={{ color: '#fff' }}>Giá tiền</TableCell>
                      <TableCell sx={{ color: '#fff' }}>Địa chỉ</TableCell>
                      <TableCell sx={{ color: '#fff' }}>Tên chủ nhà</TableCell>
                      <TableCell sx={{ color: '#fff' }}>Trạng thái</TableCell>
                      <TableCell sx={{ color: '#fff' }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {listProperty.map((booking) => (
                      <Row
                        key={booking.propertyName}
                        row={booking}
                        setIsRefresh={setIsRefresh}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <div className="py-4 w-full flex items-center justify-center">
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

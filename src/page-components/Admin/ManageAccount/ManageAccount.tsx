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

import { getAllAccountsApi } from '@/src/apis/admin'

function createData(
  id: number,
  fullName: string,
  email: string,
  phone: string,
  joinedAt: string,
  avatar: string,
  role: string
) {
  return {
    id,
    fullName,
    email,
    phone,
    joinedAt,
    avatar,
    role,
  }
}

interface IRowProps {
  row: ReturnType<typeof createData>
  setIsRefresh: React.Dispatch<React.SetStateAction<boolean>>
}

const Row = ({ row, setIsRefresh }: IRowProps) => {
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>{row.id}</TableCell>
        <TableCell component="th" scope="row" sx={{ maxWidth: 300 }}>
          {row.fullName}
        </TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.phone}</TableCell>
        <TableCell>{formatDateYYYYMMDD(row.joinedAt)}</TableCell>
        <TableCell>
          <Avatar
            src={row.avatar}
            alt={row.fullName}
            sx={{ width: 50, height: 50 }}
          />
        </TableCell>
        <TableCell>
          <Chip label={row.role} sx={{ color: '#4b7782' }} size="small" />
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

export default function TableGuestManageBookings() {
  const [isHostOnly, setIsHostOnly] = useState<string>('All')
  const [isRefresh, setIsRefresh] = useState<boolean>(false)
  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value)

    setIsHostOnly(event.target.value as string)
  }
  const [loading, setLoading] = useState<boolean>(false)
  const [listAccount, setListAccount] = useState([])
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE)
  const [totalPages, setTotalPages] = useState<number>(DEFAULT_PAGE)

  const handleChangePage = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }

  const fetchAccounts = async () => {
    try {
      setLoading(true)
      const { data, totalPages } = await getAllAccountsApi(
        currentPage,
        isHostOnly
      )
      console.log(data)

      setTotalPages(totalPages)
      const rows = data.map((account) =>
        createData(
          account.id,
          account.fullName,
          account.email,
          account.phoneNumber || 'Chưa cập nhật',
          account.createdAt,
          account.avatarUrl,
          account.isHost ? 'Chủ nhà' : 'Người du lịch'
        )
      )
      setListAccount(rows)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAccounts()
  }, [currentPage, isHostOnly])

  return (
    <>
      <div className="pb-2">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-800">
            Quản lý tài khoản
          </h3>
          <FormControl
            size="small"
            sx={{ width: 200, my: 2, background: 'white' }}
          >
            <InputLabel id="demo-simple-select-label">Vai trò</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={isHostOnly}
              label="Vai trò"
              onChange={handleChange}
            >
              <MenuItem value="All">Tất cả</MenuItem>
              <MenuItem value="onlyHost">Chủ nhà</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {listAccount.length > 0 ? (
            <div className="w-full">
              <TableContainer component={Paper}>
                <Table aria-label="guest-booking">
                  <TableHead sx={{ background: '#4b7782' }}>
                    <TableRow>
                      <TableCell sx={{ color: '#fff' }}>ID</TableCell>
                      <TableCell sx={{ color: '#fff' }}>Tên đầy đủ</TableCell>
                      <TableCell sx={{ color: '#fff' }}>Email</TableCell>
                      <TableCell sx={{ color: '#fff' }}>
                        Số điện thoại
                      </TableCell>
                      <TableCell sx={{ color: '#fff' }}>
                        Ngày tham gia
                      </TableCell>
                      <TableCell sx={{ color: '#fff' }}>Ảnh đại diện</TableCell>
                      <TableCell sx={{ color: '#fff' }}>Vai trò</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {listAccount.map((booking) => (
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

import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  TextField,
} from '@mui/material'
import StarIcon from '@mui/icons-material/Star'

import RateReviewIcon from '@mui/icons-material/RateReview'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled'
import { formatDateYYYYMMDD } from '@/src/utils/DateBookingHandler'
import { API_CHAT, USER_ROLE } from '@/src/constant'
import Cookies from 'js-cookie'
import { useState } from 'react'
import * as signalR from '@microsoft/signalr'
import { toast } from 'react-toastify'

interface IGeneralInformationProps {
  avatarUrl: string
  joinedAt: string
  name: string
  numberOfReviews: number
  rating: number
  userRole: USER_ROLE
  userId: number
}
const GeneralInformation = ({
  avatarUrl,
  joinedAt,
  name,
  numberOfReviews,
  rating,
  userRole,
  userId,
}: IGeneralInformationProps) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [message, setMessage] = useState(
    'Xin chào! Tôi muốn nhắn tin với bạn 💕'
  )
  const accessToken = Cookies.get('jwt_token')

  const toggleDialog = (isOpen: boolean) => {
    setIsOpenDialog(isOpen)
    if (!isOpen) setMessage('')
  }
  const closeDialog = () => {
    toggleDialog(false)
  }
  const sendMessage = () => {
    if (message && signalR) {
      const connection = new signalR.HubConnectionBuilder()
        .withUrl(API_CHAT, {
          accessTokenFactory: () =>
            accessToken ? accessToken : Promise.reject('Access token is null.'),
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets,
        })
        .build()

      connection
        .start()
        .then(() => {
          console.log('Connected!')
          if (
            connection &&
            connection.state === signalR.HubConnectionState.Connected
          ) {
            connection
              .invoke('SendMessageToUser', userId.toString(), message)
              .then(() => {
                setMessage('')
                toast.success('Đã gửi tin nhắn thành công.')
              })
              .catch((error) =>
                console.error('Error invoking SendMessageToUser:', error)
              )
          } else {
            console.error('SignalR connection not in a valid state.')
          }
          closeDialog()
        })
        .catch((err) => {
          console.error(err.toString())
        })
    }
  }

  return (
    <div className="">
      <Box
        sx={{
          minWidth: 350,
          borderRadius: 3,
          boxShadow: 4,
          p: 2,
          backgroundColor: '#fff',
        }}
      >
        <div className="flex flex-col gap-6">
          <div className="min-w-[150px] flex items-center gap-4">
            <img
              src={avatarUrl}
              alt={name}
              className="w-[100px] h-[100px] rounded-full"
            />
            <div>
              <p className="text-center font-bold text-xl py-2 text-gray-600">
                {name}
              </p>
              {userRole === USER_ROLE.HOST ? (
                <Chip
                  label="Host"
                  sx={{ backgroundColor: '#efe1f5', color: '#b33871' }}
                />
              ) : (
                <Chip
                  label="Guest"
                  sx={{ backgroundColor: '#fae3ee', color: '#b33871' }}
                />
              )}
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <p className="flex flex-col items-center gap-2">
              <span>Ngày tham gia</span>
              <span>
                <AccessTimeFilledIcon sx={{ color: '#27a645' }} />
                <span> {formatDateYYYYMMDD(joinedAt)}</span>
              </span>
            </p>
            <Divider orientation="vertical" variant="middle" flexItem />
            <p className="flex flex-col items-center gap-2">
              <span>Đánh giá</span>
              <span>
                <RateReviewIcon sx={{ color: '#743de3' }} />
                <span> {numberOfReviews}</span>
              </span>
            </p>
            <Divider orientation="vertical" variant="middle" flexItem />
            <p className="flex flex-col items-center gap-2">
              <span>Điểm</span>
              <span>
                <StarIcon sx={{ color: '#feb207' }} />
                <span> {rating.toFixed(2)}</span>
              </span>
            </p>
          </div>
        </div>
      </Box>
      <div className="pt-12">
        <Button
          variant="contained"
          onClick={() => {
            toggleDialog(true)
          }}
        >
          Nhắn tin cho người này
        </Button>
        <Dialog open={isOpenDialog} onClose={closeDialog}>
          <DialogTitle>Nhắn tin nhanh</DialogTitle>
          <DialogContent>
            <DialogContentText>Gửi tin nhắn</DialogContentText>
            <TextField
              id="standard-text"
              label="Nhập tin nhắn"
              margin="normal"
              autoFocus
              fullWidth
              sx={{ width: 500 }}
              value={message}
              onChange={(event) => {
                setMessage(event.target.value)
              }}
              onKeyPress={(e: React.KeyboardEvent<HTMLDivElement>) => {
                const keycode = e.keyCode ? e.keyCode : e.which
                if (keycode === 13) {
                  sendMessage()
                }
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog}>Hủy</Button>
            <Button
              variant="contained"
              disabled={!setMessage}
              onClick={sendMessage}
            >
              Gửi
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className="my-12 border p-4 text-sm shadow-sm text-gray-600 bg-white rounded-md">
        <p className="font-medium py-2">
          Thông tin đã được xác nhận của {name}
        </p>
        <ul>
          <li className="py-1">✅ Danh tính</li>
          <li className="py-1">✅ Địa chỉ email</li>
          <li className="py-1">✅ Số điện thoại</li>
        </ul>
        <p className="py-2 underline text-xs text-gray-600">
          Tìm hiểu về quy trình xác minh danh tính
        </p>
      </div>
    </div>
  )
}

export default GeneralInformation

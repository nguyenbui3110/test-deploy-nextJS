import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import StarIcon from '@mui/icons-material/Star'
import RateReviewIcon from '@mui/icons-material/RateReview'
import Divider from '@mui/material/Divider'
import { useEffect, useState } from 'react'

import * as signalR from '@microsoft/signalr'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material'
import { routes } from '@/src/routes'
import Link from 'next/link'
import { IHostInfo } from '@/src/page-components/DetailProperty/IntrotruceHost/IntroduceHost.type'
import { getHostInfo } from '@/src/apis/host'

interface IIntroduceHostProps {
  hostId: number
}
const IntroduceHost = ({ hostId }: IIntroduceHostProps) => {
  const [hostInfo, setHostInfo] = useState<IHostInfo>({
    id: 20,
    userId: 100,
    name: 'Davion Kerluke',
    introduction:
      'In quia quos ea perferendis et impedit nobis hic. Perferendis nihil ducimus. Impedit dolor cupiditate illum sint laborum.',
    avatarUrl: 'https://picsum.photos/640/480/?image=144',
    address: '322 Wyatt Camp',
    city: 'Luzton',
    joinedAt: '2024-02-04T08:28:21.2445044',
    numberOfReviews: 14,
    rating: 3.2857142857142856,
  })

  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [message, setMessage] = useState('')

  const toggleDialog = (isOpen: boolean) => {
    setIsOpenDialog(isOpen)
    if (!isOpen) setMessage('')
  }
  const closeDialog = () => {
    toggleDialog(false)
  }
  const getHostInfoAsync = async () => {
    try {
      const { data } = await getHostInfo(hostId)
      setHostInfo(data)
    } catch (err) {}
  }
  useEffect(() => {
    getHostInfoAsync()
  }, [hostId])
  // const sendMessage = () => {
  //   if (message) {
  //     const connection = new signalR.HubConnectionBuilder()
  //       .withUrl(import.meta.env.VITE_CHAT_API_URL, {
  //         accessTokenFactory: () =>
  //           accessToken ? accessToken : Promise.reject('Access token is null.'),
  //         skipNegotiation: true,
  //         transport: signalR.HttpTransportType.WebSockets,
  //       })
  //       .build()

  //     connection
  //       .start()
  //       .then(() => {
  //         console.log('Connected!')
  //         if (
  //           connection &&
  //           connection.state === signalR.HubConnectionState.Connected
  //         ) {
  //           console.log('id dc chon la:', hostInfo.userId)

  //           connection
  //             .invoke('SendMessageToUser', hostInfo.userId.toString(), message)
  //             .then(() => {
  //               setMessage('')
  //             })
  //             .catch((error) =>
  //               console.error('Error invoking SendMessageToUser:', error)
  //             )
  //         } else {
  //           console.error('SignalR connection not in a valid state.')
  //         }
  //         closeDialog()
  //       })
  //       .catch((err) => {
  //         console.error(err.toString())
  //       })
  //   }
  // }
  return (
    <div className="text-sm">
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-center">
          <Avatar
            alt="Travis Howard"
            src={hostInfo.avatarUrl}
            sx={{ width: 70, height: 70 }}
          />
          <p className="pt-2 font-medium text-gray-700">Host {hostInfo.name}</p>
        </div>
        {/* <Button
          variant="contained"
          sx={{ height: 50 }}
          onClick={() => {
            toggleDialog(true)
          }}
          size="small"
        >
          Nhắn tin cho chủ nhà
        </Button>
        <Dialog open={isOpenDialog} onClose={closeDialog}>
          <DialogTitle>Nhắn tin cho chủ nhà</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Hãy nhắn tin đầu tiên với chủ nhà !
            </DialogContentText>
            <TextField
              id="standard-text"
              label="Aa"
              margin="normal"
              autoFocus
              fullWidth
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
            <Button onClick={closeDialog}>Cancel</Button>
            <Button disabled={!setMessage} onClick={sendMessage}>
              OK
            </Button>
          </DialogActions>
        </Dialog> */}
        <Button variant="contained" sx={{ height: 50 }}>
          <Link href={routes.hostProfile.generatePath(hostId)}>
            Thông tin của chủ nhà
          </Link>
        </Button>
      </div>
      <p className="font-thin text-gray-500 pt-2 italic line-clamp-2">
        {hostInfo.introduction}
      </p>
      <div className="flex text-gray-800">
        <div className="pt-4 pr-4 ">
          <RateReviewIcon sx={{ color: '#4b7782' }} />
          <span className="pl-2">
            {hostInfo.numberOfReviews > 0
              ? hostInfo.numberOfReviews
              : 'Chưa có'}{' '}
            đánh giá
          </span>
        </div>
        <Divider orientation="vertical" />
        <div className="pt-4">
          <StarIcon sx={{ color: '#4b7782' }} />
          <span className="pl-2">
            {hostInfo.rating > 0 ? hostInfo.rating.toFixed(2) : 'Chưa có'} điểm
            rating
          </span>
        </div>
      </div>
    </div>
  )
}

export default IntroduceHost

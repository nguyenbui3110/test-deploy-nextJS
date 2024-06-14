'use client'
import { API_CHAT } from '@/src/constant'
import * as signalR from '@microsoft/signalr'
import { Alert, Snackbar } from '@mui/material'
import Cookies from 'js-cookie'
import React, { useEffect, useRef, useState } from 'react'

const SocketContainer = ({ children }) => {
  // const userLogin = JSON.parse(localStorage.getItem('user_login'))
  const [userLogin, setUserLogin] = useState(null)
  const accessToken: string | null = Cookies.get('jwt_token')
  const [open, setOpen] = React.useState(false)
  const [notifyMessage, setNotifyMessage] = React.useState('')
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  )
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const notiAudio = (): void => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  }
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }
  const initializeConnection = async () => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${API_CHAT}`, {
        accessTokenFactory: () =>
          accessToken ? accessToken : Promise.reject('Access token is null.'),
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build()

    newConnection.on('ReceiveMessage', async (message) => {
      if (message.fromUserId !== userLogin.id) {
        setNotifyMessage(`Bạn nhận tin nhắn từ ${message.fromUserName}`)
        setOpen(true)
      }
      notiAudio()
    })

    newConnection
      .start()
      .then(() => {
        console.log('Connected!')
      })
      .catch((err) => {
        console.error(err.toString())
      })

    setConnection(newConnection)
  }
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserLogin = localStorage.getItem('user_login');
      if (storedUserLogin) {
        setUserLogin(JSON.parse(storedUserLogin));
      }
    }
  }, [])
  useEffect(() => {
    if (accessToken) {
      initializeConnection()
    }
  }, [accessToken])
  return (
    <div>
      {children}
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="info"
          sx={{
            width: '100%',
            backgroundColor: '#4b7782',
            color: '#fff',
            '&MuiSvgIcon-root': {
              color: '#fff',
            },
          }}
        >
          {notifyMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default SocketContainer

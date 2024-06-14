import React, { useEffect, useRef, useState } from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import MessageLeft from '@/src/components/Contacts/Message/MessageLeft'
import MessageRight from '@/src/components/Contacts/Message/MessageRight'
import { IMessage } from '@/src/components/Contacts/Contacts.type'
import { CircularProgress } from '@mui/material'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: '100%',
      height: '90%',
      maxWidth: '100%',
      maxHeight: '97%',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    },
    container: {
      width: '100%',
      height: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    messagesBody: {
      width: 'calc(100% - 20px)',
      margin: '5px',
      overflowY: 'scroll',
      height: '300px',
    },
    wrapText: {
      width: '100%',
    },
  })
)

interface MessageProps {
  messages: IMessage[]
  selectedContact?: any
  fetchMessages: (userId: number) => Promise<void>
  loadingMessage: boolean
}

const Message: React.FC<MessageProps> = ({
  selectedContact,
  messages,
  fetchMessages,
  loadingMessage,
}) => {
  const user = JSON.parse(localStorage.getItem('user_login'))
  const classes = useStyles()
  const scrollableDivRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    selectedContact && fetchMessages(selectedContact.id)
  }, [selectedContact])
  useEffect(() => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight
    }
  })

  return (
    <div className={classes.container}>
      <div className={classes.paper}>
        <div
          id="style-1"
          className={`${classes.messagesBody} custom-scrollbar`}
          ref={scrollableDivRef}
        >
          {/* {loadingMessage ? (
            <div className='flex items-center justify-center py-4'><CircularProgress/></div>
          ) : (
            <> */}
          {messages.map((message) => {
            const selectedContact = 103
            if (selectedContact && message.receiverId == user?.id) {
              return (
                <MessageLeft
                  key={message.id}
                  message={message.content}
                  photoURL={message.senderAvatarUrl}
                />
              )
            } else if (selectedContact && message.senderId == user?.id) {
              return <MessageRight key={message.id} message={message.content} />
            }
            return null
          })}
          {/* </>
          )} */}
        </div>
      </div>
    </div>
  )
}

export default Message

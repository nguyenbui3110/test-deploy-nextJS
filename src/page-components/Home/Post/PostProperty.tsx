import { Avatar, Button, Divider, Dialog, DialogActions } from '@mui/material'
import React, { useState } from 'react'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import FormCreateProperty from '@/src/page-components/BecomeHost/FormCreateProperty/FormCreateProperty'
import { IFilterPamrams } from '@/src/page-components/Home/FilterProperties/FilterProperty.type'
import { useEffect } from 'react'
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

interface IProps {
  getListPropertyAsync: (params: IFilterPamrams) => Promise<void>
  filterParams: IFilterPamrams
}

const PostProperty = ({ getListPropertyAsync, filterParams }: IProps) => {
  // const userLogin = JSON.parse(localStorage.getItem('user_login'))
  const [userLogin, setUserLogin] = useState(null)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserLogin = localStorage.getItem('user_login');
      if (storedUserLogin) {
        setUserLogin(JSON.parse(storedUserLogin));
      }
    }
  }, [])
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }
  const onCreateSuccess = () => {
    setOpen(false)
    getListPropertyAsync(filterParams)
    localStorage.setItem(
      'user_login',
      JSON.stringify({ ...userLogin, isHost: true })
    )
  }
  return (
    <div className="bg-white p-5 rounded-lg">
      <div className="flex items-center gap-2">
        <Avatar src={userLogin?.avatarUrl} sx={{ width: 40, height: 40 }} />
        <p className="text-sm py-2 px-6  rounded-2xl bg-gray-100 text-gray-500">
          {userLogin?.fullName} ơi, hãy chia sẻ căn phòng của mình nhé
        </p>
      </div>
      <div className="py-2">
        <Divider />
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleOpen}
        >
          Đăng phòng
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogActions>
            <Button onClick={handleClose}>Đóng</Button>
          </DialogActions>
          <Divider />
          <div className="p-6 custom-scrollbar overflow-y-auto overflow-x-hidden">
            <FormCreateProperty onCreateSuccess={onCreateSuccess} />
          </div>
        </Dialog>
      </div>
    </div>
  )
}

export default PostProperty

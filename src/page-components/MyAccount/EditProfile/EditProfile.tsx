import { getInfoUserById, putUpdateInfoUser } from '@/src/apis/user'
import {
  IMyAccount,
  IMyAccountUpdate,
} from '@/src/page-components/MyAccount/EditProfile/EditProfile.type'
import React, { useEffect, useState } from 'react'
import {
  Avatar,
  Button,
  Chip,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import {
  MenuProps,
  provinces,
} from '@/src/page-components/Home/FilterProperties/FilterProperty.type'
import { toast } from 'react-toastify'
import { TOAST_MESSAGE } from '@/src/toast-message/ToastMessage'
import { postUploadAttachment } from '@/src/apis/attachments'

const EditProfile = () => {
  const userLogin = JSON.parse(localStorage.getItem('user_login') || '{}')
  const [myInfo, setMyInfo] = useState<IMyAccount>()
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const getMyInfoByIdAsync = async () => {
    try {
      const { data } = await getInfoUserById(userLogin?.id)
      setMyInfo(data)
    } catch (error) {}
  }

  useEffect(() => {
    getMyInfoByIdAsync()
  }, [])

  const handleUpdateProfile = async (infoUpdate) => {
    try {
      const { data } = await toast.promise(
        putUpdateInfoUser(userLogin?.id, infoUpdate),
        {
          pending: TOAST_MESSAGE.updateProfile.pending,
          success: TOAST_MESSAGE.updateProfile.success,
          error: TOAST_MESSAGE.updateProfile.error,
        }
      )
      setMyInfo(data)
      setIsEdit(false)
    } catch (error) {}
  }

  const handleAvatarChange = async (event: any) => {
    const selectedFile = event.target.files[0]

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      const { data } = await postUploadAttachment(formData)
      const infoUpdate: IMyAccountUpdate = {
        fullName: myInfo?.fullName,
        phoneNumber: myInfo?.phoneNumber,
        city: myInfo?.city,
        address: myInfo?.address,
        introduction: myInfo?.introduction,
        email: myInfo?.email,
        avatarUrl: data,
      }
      handleUpdateProfile(infoUpdate)
    } catch (error) {}
  }
  const handleUploadAvatar = () => {
    const fileInput = document.getElementById('avatarInput')
    if (fileInput) {
      fileInput.click()
    }
  }

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <h2 className="text-[#4b7782] text-xl font-semibold">
          Chỉnh sửa trang cá nhân
        </h2>
        <div>
          {isEdit ? (
            <div className="flex gap-4">
              <Button
                variant="contained"
                onClick={() => {
                  const infoUpdate: IMyAccountUpdate = {
                    fullName: myInfo?.fullName,
                    phoneNumber: myInfo?.phoneNumber,
                    city: myInfo?.city,
                    address: myInfo?.address,
                    introduction: myInfo?.introduction,
                    email: myInfo?.email,
                    avatarUrl: myInfo?.avatarUrl,
                  }
                  handleUpdateProfile(infoUpdate)
                }}
              >
                Lưu
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setIsEdit(false)
                  getMyInfoByIdAsync()
                }}
              >
                Hủy
              </Button>
            </div>
          ) : (
            <Button variant="outlined" onClick={() => setIsEdit(true)}>
              Chỉnh sửa
            </Button>
          )}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between gap-12 w-full bg-white p-6 my-4 rounded-xl">
          <div className="flex items-center gap-4">
            <Avatar
              alt={myInfo?.fullName}
              src={myInfo?.avatarUrl}
              sx={{ width: 80, height: 80 }}
            />
            <div className="flex flex-col gap-1">
              <span className="font-bold">{myInfo?.fullName}</span>
              <span className="text-sm text-gray-600">{myInfo?.email}</span>
            </div>
            {myInfo?.isHost ? (
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
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            id="avatarInput"
            style={{ display: 'none' }}
          />
          <Button variant="contained" onClick={handleUploadAvatar}>
            Đổi ảnh
          </Button>
        </div>
        <div className="py-4">
          <p className="font-medium text-sm pb-2 text-gray-600">Giới thiệu</p>
          <textarea
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-cyan-600 focus:border-blue-500 outline-none
            disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-300 disabled:cursor-not-allowed"
            placeholder="Introduce yourself"
            value={myInfo?.introduction}
            onChange={(e) =>
              setMyInfo((prev) => ({ ...prev, introduction: e.target.value }))
            }
            disabled={!isEdit}
          ></textarea>
        </div>
        <div className="flex gap-6 ">
          <div className="mb-2 w-1/2">
            <label
              htmlFor="fullName"
              className="font-medium text-sm pb-2 text-gray-600"
            >
              Họ tên
            </label>
            <TextField
              sx={{
                fontFamily: 'Lexend',
                marginTop: '10px',
                bgcolor: !isEdit ? '' : 'white',
              }}
              fullWidth
              id="fullName"
              variant="outlined"
              onChange={(e) =>
                setMyInfo((prev) => ({ ...prev, fullName: e.target.value }))
              }
              value={myInfo?.fullName}
              disabled={!isEdit}
            />
          </div>
          <div className="mb-2 w-1/2">
            <label
              htmlFor="phoneNumber"
              className="font-medium text-sm pb-2 text-gray-600"
            >
              Số điện thoại
            </label>
            <TextField
              type="number"
              sx={{
                fontFamily: 'Lexend',
                marginTop: '10px',
                bgcolor: !isEdit ? '' : 'white',
              }}
              fullWidth
              id="phoneNumber"
              variant="outlined"
              onChange={(e) =>
                setMyInfo((prev) => ({ ...prev, phoneNumber: e.target.value }))
              }
              value={myInfo?.phoneNumber}
              disabled={!isEdit}
            />
          </div>
        </div>
        <div className="flex gap-6">
          <div className="mb-2 w-1/2">
            <label
              htmlFor="fullName"
              className="font-medium text-sm pb-2 text-gray-600"
            >
              Thành phố
            </label>
            <FormControl fullWidth sx={{ marginTop: 1.5 }}>
              <Select
                labelId="filter-city-label"
                id="filter-city"
                value={provinces.find((city) => city === myInfo?.city) || ''}
                onChange={(e) =>
                  setMyInfo((prev) => ({
                    ...prev,
                    city: e.target.value,
                  }))
                }
                MenuProps={MenuProps}
                disabled={!isEdit}
                sx={{ bgcolor: !isEdit ? '' : 'white' }}
              >
                {provinces.map((city, index) => (
                  <MenuItem key={`city-${index}`} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="mb-2 w-1/2">
            <label
              htmlFor="address"
              className="font-medium text-sm pb-2 text-gray-600"
            >
              Địa chỉ
            </label>
            <TextField
              sx={{
                fontFamily: 'Lexend',
                marginTop: '10px',
                bgcolor: !isEdit ? '' : 'white',
              }}
              fullWidth
              id="phoneNumber"
              variant="outlined"
              onChange={(e) =>
                setMyInfo((prev) => ({ ...prev, address: e.target.value }))
              }
              value={myInfo?.address}
              disabled={!isEdit}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfile

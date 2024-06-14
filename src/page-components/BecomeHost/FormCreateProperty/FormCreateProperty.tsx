import React, { useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormHelperText,
  IconButton,
  ImageListItem,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  TextField,
  useTheme,
} from '@mui/material'

import ImageListMUI from '@mui/material/ImageList'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

import { Formik } from 'formik'

import { toast } from 'react-toastify'
import _, { debounce } from 'lodash'
import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import { Map } from 'mapbox-gl'

import AddressResult from './AddressResult'
import CancelIcon from '@mui/icons-material/Cancel'
import {
  FileObject,
  MenuProps,
  PropertyInfoPost,
  PropertyUtilitiesType,
  getStyles,
  listUtilities,
} from '@/src/page-components/BecomeHost/constant'
import MatchingUtilities from '@/src/utils/commonBecomeHost'
import {
  GeneralSchema,
  generalInformation,
} from '@/src/helpers/BecomeHostSchema/BecomeHostSchema'
import { ChangFileImageToUrl } from '@/src/helpers/ChangFileImageToUrl/ChangFileImagePostPropertyToUrl'
import { getAddressResult } from '@/src/apis/map'
import { useRouter } from 'next/navigation'
import { getAllBanks, postCreateProperty } from '@/src/apis/property'
import { TOAST_MESSAGE } from '@/src/toast-message/ToastMessage'

mapboxgl.accessToken =
  'pk.eyJ1IjoicHAzMTEiLCJhIjoiY2xvMW9hazBtMWRuczJ0cWh0eDl1andncCJ9.cINZ3UYbzs7plrM2seqPjg'
const listTypeRooms = ['Room', 'HomeStay', 'House', 'Apartment']

interface IProps {
  onCreateSuccess: () => void
}

const FormCreateProperty = ({ onCreateSuccess }: IProps) => {
  // const userLogin = JSON.parse(localStorage.getItem('user_login'))
  const [userLogin, setUserLogin] = useState(null)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserLogin = localStorage.getItem('user_login')
      if (storedUserLogin) {
        setUserLogin(JSON.parse(storedUserLogin))
      }
    }
  }, [])
  // Map
  const [position, setPosition] = useState<{ lat: number; lon: number }>({
    lat: 21.4859,
    lon: 105.4364,
  })
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<Map | null>(null)
  const [zoom, setZoom] = useState(1)
  const [listAddressResult, setListAddressResult] = useState([])
  const [city, setCity] = useState<string>('')
  useEffect(() => {
    getAllBankApi()
    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLDivElement,
      style: 'mapbox://styles/pp311/clo1ucw6g00fd01r26ds09u1z',
      center: [position.lon, position.lat],
      zoom: zoom,
    })
    new mapboxgl.Marker()
      .setLngLat([position.lon, position.lat])
      .addTo(map.current)
    return () => {
      if (map.current) {
        map.current.remove()
      }
    }
  }, [position.lat, position.lon, zoom])

  // =======================================
  const [utilities] = useState<string[]>([])
  const [selectedFiles, setSelectedFiles] = useState<FileObject[]>([])
  const theme = useTheme()
  // Hàm kiểm tra xem một tệp đã tồn tại trong danh sách chưa
  const fileExists = (fileName: string): boolean => {
    return selectedFiles.some((file) => file.name === fileName)
  }

  const handleSubmitBecomeHost = async (values) => {
    try {
      const propertyImages: { url: string }[] | undefined =
        await ChangFileImageToUrl(values.listImage)

      const propertyUtilities: Omit<PropertyUtilitiesType, 'propertyId'> =
        MatchingUtilities(values.utilities)
      const valueCreatePeroperty: PropertyInfoPost = {
        type: values.typeRoom,
        bedCount: values.quantityBed,
        bedroomCount: values.quantityBed,
        bathroomCount: values.quantityBedRooms,
        maxGuestCount: values.quantityGuest,
        title: values.roomName,
        description: values.description,
        latitude: position.lat,
        longitude: position.lon,
        address: values.address,
        city: city,
        propertyImages: propertyImages,
        propertyUtilities: propertyUtilities,
        paymentInfo: {
          bankName: values.bankName,
          accountNumber: values.accountNumber,
          accountHolder: values.accountHolder,
        },
        pricePerNight: values.pricePerNight,
      }

      await toast.promise(postCreateProperty(valueCreatePeroperty), {
        pending: TOAST_MESSAGE.property.create.pending,
        success: TOAST_MESSAGE.property.create.success,
        error: TOAST_MESSAGE.property.create.error,
      })
      onCreateSuccess()
    } catch (err) {
      throw err
    }
  }
  const customHandleChange = debounce(
    async (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      try {
        const { value } = event.target
        const response = await getAddressResult(value as string)
        if (response && response.status === 200) {
          setListAddressResult(response.data.results)
        }
      } catch (err) {
        toast.error('Địa chỉ bạn nhập chưa chính xác !')
      }
    },
    1000
  )
  const [isFree, setIsFree] = useState(true)
  // get list bank
  const [listbank, setListBank] = useState([])
  const getAllBankApi = async () => {
    try {
      const { data } = await getAllBanks()
      setListBank(data)
    } catch (error) {
      throw error
    }
  }
  const handleSetFree = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFree(event.target.checked)
  }

  return (
    <div className="py-8">
      <h2 className="text-center text-xl font-semibold text-[#4b7782] pb-4 ">
        ĐĂNG PHÒNG CỦA BẠN VÀ ĐÓN CHỜ NHỮNG LƯỢT KHÁCH DU LỊCH TỪ KHẮP NƠI !!!
      </h2>
      <div className="max-w-4xl mx-auto">
        <Formik
          initialValues={generalInformation}
          onSubmit={handleSubmitBecomeHost}
          validationSchema={GeneralSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => {
            return (
              <form onSubmit={handleSubmit} name="become-host" method="get">
                <div className="mb-2">
                  <label htmlFor="roomName" className="">
                    Tên phòng
                  </label>
                  <TextField
                    sx={{
                      fontFamily: 'Lexend',
                      marginTop: '10px',
                      backgroundColor: '#fff',
                    }}
                    fullWidth
                    id="roomName"
                    label="Nhập tên phòng"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.roomName}
                    error={!!touched.roomName && !!errors.roomName}
                    helperText={touched.roomName && (errors.roomName as string)}
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="description" className="">
                    Mô tả phòng
                  </label>
                  <TextField
                    sx={{
                      fontFamily: 'Lexend',
                      marginTop: '10px',
                      backgroundColor: '#fff',
                    }}
                    fullWidth
                    id="description"
                    label="Nhập mô tả phòng"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    error={!!touched.description && !!errors.description}
                    helperText={
                      touched.description && (errors.description as string)
                    }
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="typeRoom" className="">
                    Loại phòng
                  </label>
                  <FormControl fullWidth sx={{ marginTop: '10px' }}>
                    <InputLabel id="typeRoom">Chọn loại phòng</InputLabel>
                    <Select
                      labelId="type-room"
                      id="type-room"
                      name="typeRoom"
                      value={values.typeRoom}
                      label="Chọn loại phòng"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      MenuProps={MenuProps}
                      error={!!touched.typeRoom && !!errors.typeRoom}
                      fullWidth
                      sx={{
                        fontFamily: 'Lexend',
                        backgroundColor: '#fff',
                      }}
                    >
                      {listTypeRooms.map((typeRoom, index) => (
                        <MenuItem key={`typeRoom-${index}`} value={typeRoom}>
                          {typeRoom}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.typeRoom && errors.typeRoom && (
                      <FormHelperText
                        style={{ color: '#D32F2F', marginLeft: '10px' }}
                      >
                        {errors.typeRoom as string}
                      </FormHelperText>
                    )}
                  </FormControl>
                </div>
                <>
                  <div className="mb-2">
                    <label htmlFor="address" className="">
                      Địa chỉ
                    </label>
                    <TextField
                      sx={{
                        fontFamily: 'Lexend',
                        marginTop: '10px',
                        backgroundColor: '#fff',
                      }}
                      fullWidth
                      id="address"
                      label="Nhập địa chỉ phòng"
                      variant="outlined"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        const { value } = e.target
                        setFieldValue('address', value || '')
                        if (value === '') {
                          setListAddressResult([])
                          return
                        }
                        customHandleChange(e)
                      }}
                      value={values.address}
                      error={!!touched.address && !!errors.address}
                      helperText={touched.address && (errors.address as string)}
                    />
                  </div>
                  <div>
                    {listAddressResult?.length > 0 && (
                      <div className="p-2 shadow-lg rounded-md">
                        <div className="flex justify-end">
                          <IconButton onClick={() => setListAddressResult([])}>
                            <CancelIcon
                              sx={{ color: '#f12d37', fontSize: 20 }}
                            />
                          </IconButton>
                        </div>
                        {listAddressResult.map((address, index) => (
                          <AddressResult
                            key={`${address.address.freeformAddress}-${index}`}
                            address={address.address.freeformAddress}
                            position={address.position}
                            setPosition={setPosition}
                            setListAddressResult={setListAddressResult}
                            setFieldValue={setFieldValue}
                            setCity={setCity}
                            setZoom={setZoom}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="py-2">
                    <div
                      ref={mapContainer}
                      className="map-container"
                      style={{ height: '600px', marginBottom: '100px' }}
                    />
                  </div>
                </>

                <div className="mb-2">
                  <label htmlFor="quantityGuest" className="">
                    Số lượng khách tối đa
                  </label>
                  <TextField
                    sx={{
                      fontFamily: 'Lexend',
                      marginTop: '10px',
                      backgroundColor: '#fff',
                    }}
                    type="number"
                    fullWidth
                    id="quantityGuest"
                    label="Nhập số lượng khách"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.quantityGuest}
                    error={!!touched.quantityGuest && !!errors.quantityGuest}
                    helperText={
                      touched.quantityGuest && (errors.quantityGuest as string)
                    }
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="quantityBedRooms" className="">
                    Số lượng phòng ngủ
                  </label>
                  <TextField
                    sx={{
                      fontFamily: 'Lexend',
                      marginTop: '10px',
                      backgroundColor: '#fff',
                    }}
                    type="number"
                    fullWidth
                    id="quantityBedRooms"
                    label="Nhập số lượng phòng ngủ"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.quantityBedRooms}
                    error={
                      !!touched.quantityBedRooms && !!errors.quantityBedRooms
                    }
                    helperText={
                      touched.quantityBedRooms &&
                      (errors.quantityBedRooms as string)
                    }
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="quantityBed" className="">
                    Số lượng giường
                  </label>
                  <TextField
                    sx={{
                      fontFamily: 'Lexend',
                      marginTop: '10px',
                      backgroundColor: '#fff',
                    }}
                    type="number"
                    fullWidth
                    id="quantityBed"
                    label="Nhập số lượng giường"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.quantityBed}
                    error={!!touched.quantityBed && !!errors.quantityBed}
                    helperText={
                      touched.quantityBed && (errors.quantityBed as string)
                    }
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="quantityBathRooms" className="">
                    Số lượng phòng tắm
                  </label>
                  <TextField
                    sx={{
                      fontFamily: 'Lexend',
                      marginTop: '10px',
                      backgroundColor: '#fff',
                    }}
                    type="number"
                    fullWidth
                    id="quantityBathRooms"
                    label="Nhập số lượng phòng tắm"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.quantityBathRooms}
                    error={
                      !!touched.quantityBathRooms && !!errors.quantityBathRooms
                    }
                    helperText={
                      touched.quantityBathRooms &&
                      (errors.quantityBathRooms as string)
                    }
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="utilities">Thêm tiện ích</label>
                  <Select
                    labelId="utilities"
                    name="utilities"
                    id="utilities"
                    multiple
                    value={values.utilities}
                    onChange={handleChange}
                    error={!!touched.utilities && !!errors.utilities}
                    onBlur={handleBlur}
                    input={
                      <OutlinedInput id="select-multiple-chip" label="Chip" />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    sx={{
                      mt: 1,
                      backgroundColor: '#fff',
                    }}
                    fullWidth
                    MenuProps={MenuProps}
                  >
                    {listUtilities.map((utility) => (
                      <MenuItem
                        key={utility}
                        value={utility}
                        style={getStyles(utility, utilities, theme)}
                      >
                        <Checkbox
                          checked={values.utilities.includes(utility)}
                        />
                        {utility}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.utilities && errors.utilities && (
                    <FormHelperText
                      style={{ color: '#D32F2F', marginLeft: '10px' }}
                    >
                      {errors.utilities as string}
                    </FormHelperText>
                  )}
                </div>
                <div className="py-8 flex justify-center">
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const files = e.target.files
                        if (files) {
                          const selectedFileList = Array.from(files)
                          // Lọc ra các tệp mới không trùng tên
                          const newFiles: FileObject[] =
                            selectedFileList.filter(
                              (file) => !fileExists(file.name)
                            )

                          if (newFiles.length > 0) {
                            // Thêm các tệp mới vào danh sách
                            setSelectedFiles((prevSelectedFiles) => [
                              ...prevSelectedFiles,
                              ...newFiles,
                            ])
                            setFieldValue('listImage', [
                              ...selectedFiles,
                              ...newFiles,
                            ])
                          }
                        }
                      }}
                      multiple
                      id="listImage"
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="listImage">
                      <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        startIcon={<CloudUploadIcon />}
                        size="small"
                      >
                        Thêm ảnh
                      </Button>
                    </label>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        setSelectedFiles([])
                        setFieldValue('listImage', [])
                      }}
                      style={{ marginLeft: '10px' }}
                      size="small"
                    >
                      Đặt lại
                    </Button>
                    {errors.listImage && touched.listImage && (
                      <FormHelperText
                        style={{ color: '#D32F2F', marginLeft: '10px' }}
                      >
                        Ít nhất 8 ảnh
                      </FormHelperText>
                    )}
                    <div>
                      {selectedFiles.length > 0 && (
                        <div className="py-6">
                          <ImageListMUI
                            sx={{ height: 700 }}
                            variant="quilted"
                            cols={2}
                            rowHeight={800}
                          >
                            {selectedFiles.map((file, index) => (
                              <ImageListItem key={index}>
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt={`Image ${index}`}
                                  loading="lazy"
                                />
                              </ImageListItem>
                            ))}
                          </ImageListMUI>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {!userLogin?.isHost && (
                  <>
                    <p className="text-xl py-3 text-cyan-700 uppercase">
                      Thông tin thanh toán
                    </p>
                    <div className="mb-2">
                      <label htmlFor="bankName" className="">
                        Tên ngân hàng
                      </label>
                      <FormControl fullWidth sx={{ marginTop: '10px' }}>
                        <InputLabel id="bankName">Chọn ngân hàng</InputLabel>
                        <Select
                          labelId="type-room"
                          id="type-room"
                          name="bankName"
                          value={values.bankName}
                          label="Chọn ngân hàng"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          MenuProps={MenuProps}
                          error={!!touched.bankName && !!errors.bankName}
                          fullWidth
                          sx={{
                            fontFamily: 'Lexend',
                          }}
                        >
                          {listbank &&
                            listbank?.map((bank, index) => (
                              <MenuItem
                                key={`bank-${index}`}
                                value={bank.shortName}
                              >
                                <div className="flex gap-4 items-center">
                                  <img
                                    src={bank.logo}
                                    alt=""
                                    className="w-[100px] h-[40px]"
                                  />
                                  <span>{bank.shortName}</span>
                                </div>
                              </MenuItem>
                            ))}
                        </Select>
                        {touched.bankName && errors.bankName && (
                          <FormHelperText
                            style={{ color: '#D32F2F', marginLeft: '10px' }}
                          >
                            {errors.bankName}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </div>
                    <div className="mb-2">
                      <label htmlFor="accountNumber" className="">
                        Số thẻ
                      </label>
                      <TextField
                        sx={{
                          fontFamily: 'Lexend',
                          marginTop: '10px',
                        }}
                        fullWidth
                        id="accountNumber"
                        label="Nhập số thẻ (16 số)"
                        variant="outlined"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.accountNumber}
                        error={
                          !!touched.accountNumber && !!errors.accountNumber
                        }
                        helperText={
                          touched.accountNumber &&
                          (errors.accountNumber as string)
                        }
                      />
                    </div>

                    <div className="mb-2">
                      <label htmlFor="accountHolder" className="">
                        Tên chủ thẻ
                      </label>
                      <TextField
                        sx={{
                          fontFamily: 'Lexend',
                          marginTop: '10px',
                        }}
                        fullWidth
                        id="accountHolder"
                        label="Nhập tên chủ thẻ"
                        variant="outlined"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.accountHolder}
                        error={
                          !!touched.accountHolder && !!errors.accountHolder
                        }
                        helperText={
                          touched.accountHolder &&
                          (errors.accountHolder as string)
                        }
                      />
                    </div>
                  </>
                )}
                <div className="mb-2 flex justify-between items-center">
                  <span>Cho thuê miễn phí</span>
                  <Switch
                    checked={isFree}
                    onChange={handleSetFree}
                    inputProps={{ 'aria-label': 'controlled' }}
                    label="Cho thuê miễn phí"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="pricePerNight" className="">
                    Giá phòng 1 đêm
                  </label>
                  <TextField
                    sx={{
                      fontFamily: 'Lexend',
                      marginTop: '10px',
                    }}
                    type="number"
                    fullWidth
                    id="pricePerNight"
                    label="Nhập giá tiền / đêm"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={isFree}
                    value={isFree ? '' : values.pricePerNight}
                    error={!!touched.pricePerNight && !!errors.pricePerNight}
                    helperText={
                      touched.pricePerNight && (errors.pricePerNight as string)
                    }
                  />
                </div>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Bắt đầu cho thuê
                </Button>
              </form>
            )
          }}
        </Formik>
      </div>
    </div>
  )
}

export default FormCreateProperty

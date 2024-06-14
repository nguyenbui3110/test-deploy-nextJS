import {
  DEFAULT_FILTER_PARAMS,
  IFilterPamrams,
  MenuProps,
  OrderBy,
  OrderByOptions,
  provinces,
} from '@/src/page-components/Home/FilterProperties/FilterProperty.type'
import React, { Dispatch, SetStateAction } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import { PropertyType } from '@/src/page-components/Home/Properties/Properties.type'

import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import { Button, Drawer, IconButton, Tooltip } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddIcon from '@mui/icons-material/Add'

const Types: PropertyType[] = [
  PropertyType.ROOM,
  PropertyType.HOUSE,
  PropertyType.HOMESTAY,
  PropertyType.APARTMENT,
]

interface IFilterPropertyProps {
  filterParams: IFilterPamrams
  setFilterParams: Dispatch<SetStateAction<IFilterPamrams>>
  getListPropertyAsync: (params: IFilterPamrams) => Promise<void>
}

const FilterProperty = ({
  filterParams,
  setFilterParams,
  getListPropertyAsync,
}: IFilterPropertyProps) => {
  const handleChangePropertyType = (
    event: SelectChangeEvent<typeof filterParams.Type>
  ) => {
    const {
      target: { value },
    } = event
    setFilterParams({ ...filterParams, Type: value as PropertyType[] })
  }
  const handleChangeCity = (event: SelectChangeEvent) => {
    setFilterParams({ ...filterParams, City: event.target.value as string })
  }

  const handleChangeOrderBy = (event: SelectChangeEvent) => {
    setFilterParams({ ...filterParams, OrderBy: event.target.value as OrderBy })
  }

  const currentDate = dayjs() // Ngày hiện tại
  const handleDateStartChange = (date: any) => {
    setFilterParams({
      ...filterParams,
      CheckInDate: `${new Date(String(date)).getMonth() + 1}/${new Date(
        String(date)
      ).getDate()}/${new Date(String(date)).getFullYear()}`,
    })
  }
  const handleDateEndChange = (date: any) => {
    setFilterParams({
      ...filterParams,
      CheckOutDate: `${new Date(String(date)).getMonth() + 1}/${new Date(
        String(date)
      ).getDate()}/${new Date(String(date)).getFullYear()}`,
    })
  }

  const shouldDisableDate = (date: Date) => {
    return currentDate.isAfter(dayjs(date))
  }

  // handler filter
  const handlerClearFilter = async () => {
    await getListPropertyAsync({
      ...DEFAULT_FILTER_PARAMS,
      TotalPages: filterParams.TotalPages,
    })
    setFilterParams({
      ...DEFAULT_FILTER_PARAMS,
      TotalPages: filterParams.TotalPages,
    })
    setOpen(false)
  }
  const [open, setOpen] = React.useState(false)

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Bộ lọc</Button>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="top">
        <div className="flex gap-4 items-center justify-center py-6">
          {/* Property Type */}
          <FormControl sx={{ width: 200, minHeight: 12 }}>
            <InputLabel id="demo-multiple-checkbox-label">
              Loại phòng
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={filterParams.Type}
              onChange={handleChangePropertyType}
              input={<OutlinedInput label="Loại phòng" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {Types.map((type) => (
                <MenuItem key={type} value={type}>
                  <Checkbox checked={filterParams.Type.indexOf(type) > -1} />
                  <ListItemText primary={type} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Select City */}
          <FormControl fullWidth sx={{ width: 250 }}>
            <InputLabel id="filter-city-label">Tỉnh/Thành</InputLabel>
            <Select
              labelId="filter-city-label"
              id="filter-city"
              value={filterParams.City}
              label="Tỉnh/Thành"
              onChange={handleChangeCity}
              MenuProps={MenuProps}
            >
              {provinces.map((city, index) => (
                <MenuItem key={`city-${index}`} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Order By */}
          <FormControl fullWidth sx={{ width: 250 }}>
            <InputLabel id="filter-order-by-label">Sắp xếp theo</InputLabel>
            <Select
              labelId="filter-order-by-label"
              id="filter-order-by"
              value={filterParams.OrderBy}
              label="Tỉnh/Thành"
              onChange={handleChangeOrderBy}
              MenuProps={MenuProps}
            >
              {OrderByOptions.map((order_by, index) => (
                <MenuItem
                  key={`order_by-${index}`}
                  value={order_by.value || ''}
                >
                  {order_by.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Check In Date & Check Out Date */}
          <div className="flex gap-4">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={['DatePicker']}
                sx={{ mt: -1, width: 200 }}
              >
                <DatePicker
                  label="Ngày đi"
                  onChange={handleDateStartChange}
                  shouldDisableDate={shouldDisableDate}
                />
              </DemoContainer>
              <DemoContainer
                components={['DatePicker']}
                sx={{ mt: -1, width: 200 }}
              >
                <DatePicker
                  label="Ngày về"
                  onChange={handleDateEndChange}
                  shouldDisableDate={shouldDisableDate}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          {/* Button */}
          <div className="flex gap-4 justify-center">
            <Tooltip title="Xóa bộ lọc">
              <IconButton
                aria-label="clear-filter"
                onClick={handlerClearFilter}
              >
                <DeleteForeverIcon sx={{ color: 'gray', fontSize: 24 }} />
              </IconButton>
            </Tooltip>
            <Button
              variant="contained"
              size="large"
              onClick={async () => {
                await getListPropertyAsync(filterParams)
                setOpen(false)
              }}
            >
              <p>Tìm kiếm</p>
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  )
}

export default FilterProperty

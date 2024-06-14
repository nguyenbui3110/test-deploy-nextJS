import * as React from 'react'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import { useEffect } from 'react'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
}

const listUtilities = [
  'Wifi',
  'TV',
  'Kitchen',
  'AirConditioning',
  'LaptopFriendlyWorkspace',
  'HotWater',
  'Breakfast',
  'RoomService',
  'Bar',
  'SwimmingPool',
  'Gym',
  'Spa',
  'BeachFront',
  'MountainView',
  'LakeView',
  'SeaView',
  'LandmarkView',
  'WheelchairAccessible',
  'Elevator',
  'SecurityCamera',
  'CamperFriendly',
]
interface Props {
  onSelectedValuesChange: (value: string[]) => void
}
const Utilities: React.FC<Props> = ({ onSelectedValuesChange }) => {
  const [propertyType, setPropertyType] = React.useState<string[]>([])

  const handleChange = (event: SelectChangeEvent<typeof propertyType>) => {
    const {
      target: { value },
    } = event
    setPropertyType(
  
      typeof value === 'string' ? value.split(',') : value
    )
  }
  useEffect(() => {

    onSelectedValuesChange(propertyType)
  }, [propertyType, onSelectedValuesChange])
  return (
    <div>
      <FormControl>
        <Select
          multiple
          value={propertyType}
          onChange={handleChange}
          renderValue={(selected) => selected.join(', ')}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          MenuProps={MenuProps}
          style={{
            width: '350px',
            height: '30px',
            border: '1px solid #000000',
          }}
        >
          {listUtilities.map((listUtilities) => (
            <MenuItem key={listUtilities} value={listUtilities}>
              <Checkbox checked={propertyType.indexOf(listUtilities) > -1} />
              <ListItemText primary={listUtilities} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
export default Utilities

import React, { Dispatch, SetStateAction } from 'react'
import { IconButton, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

interface QuantityContainedProps {
  guestCount: number
  setGuestCount: Dispatch<SetStateAction<number>>
  maxGuestCount: number
}

const QuantityContained = ({ guestCount, setGuestCount, maxGuestCount }) => {
  const handleMinusQuantity = () => {
    if (guestCount === 0) return
    setGuestCount((prev) => prev - 1)
  }
  const handlePlusQuantity = () => {
    if (guestCount >= maxGuestCount) return
    setGuestCount((prev) => prev + 1)
  }

  return (
    <div className="flex items-center gap-4 justify-between pr-3">
      <p>Số lượng khách</p>
      <div className="flex items-center gap-8">
        <IconButton
          aria-label="add"
          sx={{ border: 1 }}
          onClick={handleMinusQuantity}
          disabled={guestCount === 0}
        >
          <RemoveIcon />
        </IconButton>
        <p className="text-md text-gray-500">{guestCount}</p>
        <IconButton
          aria-label="minus"
          sx={{ border: 1 }}
          onClick={handlePlusQuantity}
          disabled={guestCount >= maxGuestCount}
        >
          <AddIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default QuantityContained

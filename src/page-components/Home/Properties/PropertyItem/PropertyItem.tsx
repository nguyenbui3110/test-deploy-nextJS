import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MobileStepper from '@mui/material/MobileStepper'
import Button from '@mui/material/Button'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import Link from 'next/link'
import StarIcon from '@mui/icons-material/Star'
import { Avatar, IconButton } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { routes } from '@/src/routes'
import { useEffect, useState } from 'react'
import { IPropertyImage } from '@/src/page-components/Home/Properties/Properties.type'
import { toast } from 'react-toastify'
import { postAddToWishlists, postRemoveWishlists } from '@/src/apis/wishlist'
import { TOAST_MESSAGE } from '@/src/toast-message/ToastMessage'
import { PRIMARY_COLOR } from '@/src/constant'
import { IHostInfo } from '@/src/page-components/HostProfile/HostProfile.type'
import { getHostInfo } from '@/src/apis/host'
import { formatMoney } from '@/src/utils/common'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

interface IPropertyItemProps {
  propertyId: number
  title: string
  propertyImages: IPropertyImage[]
  numberOfReviews: number
  rating: number
  isFavorite: boolean
  hostId: number
  detailProperty: string
  pricePerNight: number
}

const PropertyItem = ({
  propertyId,
  title,
  propertyImages,
  numberOfReviews,
  rating,
  isFavorite,
  hostId,
  detailProperty,
  pricePerNight,
}: IPropertyItemProps) => {
  const theme = useTheme()
  const [activeStep, setActiveStep] = React.useState(0)
  const maxSteps = propertyImages.length

  const [showFavorite, setShowFavorite] = useState(isFavorite)
  const [hostInfo, setHostInfo] = useState<IHostInfo>()
  const getHostInfoAsync = async () => {
    try {
      const { data } = await getHostInfo(hostId)
      setHostInfo(data)
    } catch (err) {}
  }
  useEffect(() => {
    hostId && getHostInfoAsync()
  }, [hostId])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStepChange = (step: number) => {
    setActiveStep(step)
  }

  // add wish list
  const handleAddWishlistProperty = async (propertyId: number) => {
    try {
      await toast.promise(postAddToWishlists(propertyId), {
        pending: TOAST_MESSAGE.wishlist.add.pending,
        success: TOAST_MESSAGE.wishlist.add.success,
        error: TOAST_MESSAGE.wishlist.add.error,
      })
      setShowFavorite(!showFavorite)
    } catch (err) {}
  }
  // Remove wish list
  const handleRemoveWishlistProperty = async (propertyId: number) => {
    try {
      await toast.promise(postRemoveWishlists(propertyId), {
        pending: TOAST_MESSAGE.wishlist.remove.pending,
        success: TOAST_MESSAGE.wishlist.remove.success,
        error: TOAST_MESSAGE.wishlist.remove.error,
      })
      setShowFavorite(!showFavorite)
    } catch (err) {}
  }

  return (
    <div className="shadow-md p-2 rounded-lg mx-auto bg-white max-w-[500px]">
      <div className="pt-2 pb-4">
        <div className="flex items-center gap-2 pb-4">
          <Avatar src={hostInfo?.avatarUrl} />
          <p>
            <span className="">{hostInfo?.name}</span>
          </p>
        </div>
        <span className="text-sm line-clamp-2">{detailProperty}</span>
      </div>
      <Box sx={{ maxWidth: 500, minWidth: 350, flexGrow: 1 }}>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {propertyImages.map((step, index) => (
            <div key={`${step.url}-${index}`}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: 255,
                    display: 'block',
                    maxWidth: 500,
                    overflow: 'hidden',
                    width: '100%',
                  }}
                  src={step.url}
                  alt="Img"
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              <KeyboardArrowLeft />
            </Button>
          }
        />
        <div className="p-4">
          <div className="flex justify-between">
            <Link href={routes.detailProperty.generatePath(propertyId)}>
              <h2 className="text-md text-gray-700 font-semibold hover:text-[#4b7782] line-clamp-2 h-[50px] pr-6 transition duration-300">
                {title}
              </h2>
            </Link>
            <span className="flex">
              <StarIcon sx={{ mr: 1, color: '#feb207' }} />
              {rating.toFixed(2)}
            </span>
          </div>
          <p className="text-gray-600">
            {pricePerNight
              ? `${formatMoney(pricePerNight)} vnd/đêm `
              : 'Miễn phí'}
          </p>
          <div className="flex justify-between py-2">
            <div className="cursor-pointer">
              {showFavorite ? (
                <IconButton
                  aria-label="add-wishlist"
                  onClick={() => handleRemoveWishlistProperty(propertyId)}
                >
                  <FavoriteIcon sx={{ color: PRIMARY_COLOR }} />
                </IconButton>
              ) : (
                <IconButton
                  aria-label="add-wishlist"
                  onClick={() => handleAddWishlistProperty(propertyId)}
                >
                  <FavoriteBorderIcon sx={{ color: PRIMARY_COLOR }} />
                </IconButton>
              )}
            </div>
            <p className="text-gray-600">Review ({numberOfReviews})</p>
          </div>
        </div>
      </Box>
    </div>
  )
}

export default PropertyItem

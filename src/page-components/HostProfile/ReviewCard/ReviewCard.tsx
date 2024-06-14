// import { formatDateTime } from '@/helpers/FormatDateTime/formatDateTime';
import StarIcon from '@mui/icons-material/Star'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  Fade,
  Modal,
  Box,
  Backdrop,
  IconButton,
  Button,
  Avatar,
} from '@mui/material'
import { useState } from 'react'
import Link from 'next/link'
import { routes } from '@/src/routes'
import { formatDateYYYYMMDD } from '@/src/utils/DateBookingHandler'
import { IGuestReview } from '@/src/page-components/GuestProfile/GuestProfile.type'
import { deleteReviewGuest, deleteReviewHost } from '@/src/apis/review'
import { toast } from 'react-toastify'
import { TOAST_MESSAGE } from '@/src/toast-message/ToastMessage'
import { USER_ROLE } from '@/src/constant'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
}
interface PropsType {
  review: IGuestReview
  setPostReviewUpdate?: React.Dispatch<React.SetStateAction<number>>
  getGuestInfoAsync?: () => Promise<void>
  getHostInfoAsync?: () => Promise<void>
  getListReview?: () => Promise<void>
  hostId?: number
  guestId?: number
}

const ReviewCard = ({
  review,
  getListReview,
  hostId,
  guestId,
  getGuestInfoAsync,
  getHostInfoAsync,
}: PropsType) => {
  const userLogin = JSON.parse(localStorage.getItem('user_login') || '{}')

  const yellowStars = Math.round(review.rating)
  const grayStars = 5 - yellowStars
  const yellowStarArray = Array(yellowStars).fill('yellow')
  const grayStarArray = Array(grayStars).fill('gray')

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleDeleteReview = async (reviewId: number) => {
    const reviewType = guestId ? USER_ROLE.GUEST : USER_ROLE.HOST
    try {
      await toast.promise(
        reviewType === USER_ROLE.GUEST
          ? deleteReviewGuest(reviewId)
          : deleteReviewHost(reviewId),
        {
          pending: TOAST_MESSAGE.review.delete.pending,
          success: TOAST_MESSAGE.review.delete.success,
          error: TOAST_MESSAGE.review.delete.error,
        }
      )
      getListReview()
      reviewType === USER_ROLE.GUEST ? getGuestInfoAsync() : getHostInfoAsync()
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    } catch (err) {}
  }

  return (
    <div className="shadow-md border p-4 rounded-lg bg-white">
      <div className="m-2">
        <div className="flex gap-4 items-center">
          <Link href={routes.hostProfile.generatePath(hostId)}>
            <Avatar
              src={review.reviewerAvatarUrl}
              alt={review.reviewerName}
              sx={{ width: 40, height: 40 }}
            />
          </Link>
          <div className="">
            <p className="font-semibold pb-2">{review.reviewerName}</p>
            <p className="font-thin text-gray-400 text-xs">
              {formatDateYYYYMMDD(review.reviewTime)}
            </p>
          </div>
        </div>
        <p className="font-light text-sm text-gray-500 line-clamp-3 my-4">
          "{review.content}"
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex">
          {yellowStarArray.map((_, index) => (
            <StarIcon key={`review_${index}`} sx={{ color: '#feb207' }} />
          ))}
          {grayStarArray.map((_, index) => (
            <StarIcon key={`review_${index}`} sx={{ color: '#eaeaea' }} />
          ))}
        </div>
        {userLogin?.id === review.userId && (
          <>
            <IconButton aria-label="delete" onClick={handleOpen}>
              <DeleteIcon sx={{ color: '#c92327 ' }} />
            </IconButton>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  timeout: 500,
                },
              }}
            >
              <Fade in={open}>
                <Box sx={style}>
                  <p>Bạn có chắc chắn muốn xóa đánh giá này không?</p>
                  <div className="pt-4 flex justify-center gap-4">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleClose}
                    >
                      Không
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleDeleteReview(review.id)}
                    >
                      Có
                    </Button>
                  </div>
                </Box>
              </Fade>
            </Modal>
          </>
        )}
      </div>
    </div>
  )
}

export default ReviewCard

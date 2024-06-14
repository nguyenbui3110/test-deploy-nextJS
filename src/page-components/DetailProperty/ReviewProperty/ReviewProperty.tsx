import {
  Avatar,
  Fade,
  Modal,
  Box,
  Backdrop,
  IconButton,
  Button,
} from '@mui/material'
import EditLocationIcon from '@mui/icons-material/EditLocation'
import CleaningServicesIcon from '@mui/icons-material/CleaningServices'
import MessageIcon from '@mui/icons-material/Message'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled'
import StarIcon from '@mui/icons-material/Star'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import { ChangeEvent, useState } from 'react'
import Pagination from '@mui/material/Pagination'
import DeleteIcon from '@mui/icons-material/Delete'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { format } from 'date-fns'
import { routes } from '@/src/routes'
import { deleteReviewProperty } from '@/src/apis/review'
import { IReviewProperty } from '@/src/page-components/DetailProperty/ReviewProperty/ReviewProperty.type'
import { TOAST_MESSAGE } from '@/src/toast-message/ToastMessage'
import { DEFAULT_PAGE } from '@/src/constant'
import { useEffect } from 'react'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
}
interface PropsType {
  propertyId: string
  listReview: IReviewProperty[]
  getListReviewProperty: (currentPage: number) => Promise<void>
  totalPages: number
  currentPage: number
  handleChangePage: (event: ChangeEvent<unknown>, value: number) => void
}
const ReviewProperty = ({
  listReview,
  getListReviewProperty,
  currentPage,
  totalPages,
  handleChangePage,
}: PropsType) => {
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
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleDeleteReview = async (id: number) => {
    try {
      await toast.promise(deleteReviewProperty(id), {
        pending: TOAST_MESSAGE.review.delete.pending,
        success: TOAST_MESSAGE.review.delete.success,
        error: TOAST_MESSAGE.review.delete.error,
      })
      await getListReviewProperty(DEFAULT_PAGE)
      setOpen(false)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="pt-6">
      <>
        <h2 className="text-xl text-[#4b7782] font-bold pb-2 pt-5">Đánh giá</h2>
        {listReview?.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-5">
              {listReview &&
                listReview.length > 0 &&
                listReview.map((review, index) => (
                  <div
                    key={`${review.guestName}_${index}`}
                    className="flex flex-col p-2 shadow-md rounded-md bg-white"
                  >
                    <div className="">
                      <div className="flex items-center gap-4 p-3">
                        <Link
                          href={routes.guestProfile.generatePath(
                            review.guestId
                          )}
                        >
                          <Avatar src={review.guestAvatarUrl} />
                        </Link>
                        <div className=" w-full flex justify-between">
                          <div>
                            <Link
                              href={routes.guestProfile.generatePath(
                                review.guestId
                              )}
                            >
                              <p className="text-gray-600 font-semibold">
                                {review.guestName}
                              </p>
                            </Link>
                            <p className="text-gray-400 text-xs font-thin">
                              {format(review.reviewTime, 'yyyy-MM-dd')}
                            </p>
                          </div>
                          {userLogin?.id === review.userId && (
                            <>
                              <IconButton
                                aria-label="delete"
                                onClick={handleOpen}
                              >
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
                                    <p>
                                      Bạn có chắc chắn muốn xóa đánh giá này
                                      không ?
                                    </p>
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
                                        onClick={() =>
                                          handleDeleteReview(review.id)
                                        }
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
                      <p className="line-clamp-2 font-thin text-gray-500 px-4 italic text-md">
                        "{review.content}"
                      </p>
                    </div>
                    <div className="pt-4">
                      <div className="flex items-center justify-center">
                        <div className="text-sm px-4 text-center flex flex-col">
                          <EditLocationIcon sx={{ color: '#4b7782' }} />
                          <span className="pt-1 text-cyan-700">
                            {review.location}
                          </span>
                        </div>
                        <div className="text-sm px-4 text-center flex flex-col">
                          <CleaningServicesIcon sx={{ color: '#4b7782' }} />
                          <span className="pt-1 text-cyan-700">
                            {review.cleanliness}
                          </span>
                        </div>
                        <div className="text-sm px-4 text-center flex flex-col">
                          <MessageIcon sx={{ color: '#4b7782' }} />
                          <span className="pt-1 text-cyan-700">
                            {review.communication}
                          </span>
                        </div>
                        <div className="text-sm px-4 text-center flex flex-col">
                          <CheckCircleIcon sx={{ color: '#4b7782' }} />
                          <span className="pt-1 text-cyan-700">
                            {review.checkIn}
                          </span>
                        </div>
                        <div className="text-sm px-4 text-center flex flex-col">
                          <AccessTimeFilledIcon sx={{ color: '#4b7782' }} />
                          <span className="pt-1 text-cyan-700">
                            {review.accuracy}
                          </span>
                        </div>
                        <div className="text-sm px-4 text-center flex flex-col">
                          <LocalOfferIcon sx={{ color: '#4b7782' }} />
                          <span className="pt-1 text-cyan-700">
                            {review.value}
                          </span>
                        </div>
                        <div className="text-sm px-4 text-center flex flex-col">
                          <StarIcon sx={{ color: '#4b7782' }} />
                          <span className="pt-1 text-cyan-700">
                            {review.averageRating.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="py-8">
              <Pagination
                color="primary"
                count={totalPages}
                page={currentPage}
                onChange={handleChangePage}
                sx={{ width: '100%', mx: 'auto' }}
              />
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-500">Chưa có đánh giá nào !</p>
        )}
      </>
    </div>
  )
}

export default ReviewProperty

import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Pagination,
  Rating,
} from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'

import StarIcon from '@mui/icons-material/Star'
import { toast } from 'react-toastify'
import { ReviewCard } from '@/src/page-components/HostProfile/ReviewCard'
import { getHostReviews, postCreateReviewHost } from '@/src/apis/review'
import { DEFAULT_DATA_REVIEW } from '@/src/page-components/HostProfile/HostProfile.type'
import { TOAST_MESSAGE } from '@/src/toast-message/ToastMessage'
import { CheckHostRentedGuestYet } from '@/src/apis/host'

const labels: { [index: string]: string } = {
  1: 'Quá tệ',
  2: 'Tệ',
  3: 'Hài lòng',
  4: 'Tốt',
  5: 'Quá tuyệt vời',
}
function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`
}
interface PropsType {
  hostId: number
  name: string
  getHostInfoAsync: () => Promise<void>
}

const ModalReviewGuest = ({ hostId, name, getHostInfoAsync }: PropsType) => {
  const [listReview, setListReview] = useState([])

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)

  const [isStayed, setIsStayed] = useState<boolean>(true)

  const [open, setOpen] = useState(false)

  const [hoverHost, setHoverHost] = useState(-1)

  const [dataReview, setDataReview] = useState<{
    rating: number
    content: string
  }>(DEFAULT_DATA_REVIEW)

  const getListReview = async () => {
    try {
      const { data, totalPages } = await getHostReviews(hostId, currentPage)
      setListReview(data)
      setTotalPages(totalPages)
    } catch (error) {}
  }

  useEffect(() => {
    getListReview()
  }, [hostId, currentPage])

  const handleChangePage = (_event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }

  const handleCancelReview = async () => {
    setDataReview(DEFAULT_DATA_REVIEW)
    setOpen(false)
  }

  const CheckUserStayedInPropertyOfHost = async (hostId: number) => {
    try {
      const { data } = await CheckHostRentedGuestYet(hostId)
      setIsStayed(data)
    } catch (err) {}
  }

  const handlePostReviewHost = async () => {
    if (dataReview.content !== '' && dataReview.rating !== null) {
      try {
        await toast.promise(postCreateReviewHost(hostId, dataReview), {
          pending: TOAST_MESSAGE.review.post.pending,
          success: TOAST_MESSAGE.review.post.success,
          error: TOAST_MESSAGE.review.post.error,
        })
        getListReview()
        getHostInfoAsync()
        setDataReview(DEFAULT_DATA_REVIEW)
        setOpen(false)
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      } catch (error) {}
    } else {
      toast.error('Bạn phải nhập đủ thông tin để đánh giá !')
    }
  }

  useEffect(() => {
    CheckUserStayedInPropertyOfHost(hostId)
  }, [hostId])

  return (
    <div className="py-4">
      <h2 className="font-semibold text-2xl text-gray-600 py-4">
        Đánh giá về {name}
      </h2>
      <>
        <div className="">
          {listReview.length > 0 ? (
            <>
              <div className="grid grid-cols-3 gap-4">
                {listReview.map((review, index) => (
                  <ReviewCard
                    key={`${review.reviewerName}_${index}`}
                    review={review}
                    getListReview={getListReview}
                    getHostInfoAsync={getHostInfoAsync}
                    hostId={hostId}
                  />
                ))}
              </div>
              <div className="py-4">
                <Pagination
                  color="primary"
                  count={totalPages}
                  page={currentPage}
                  onChange={handleChangePage}
                />
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-700">
              Người này chưa có đánh giá nào !
            </p>
          )}
        </div>
      </>
      {isStayed ? (
        <div className="py-4">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setOpen(true)}
          >
            Đánh giá chủ nhà
          </Button>
          <Dialog
            open={open}
            onClose={handleCancelReview}
            maxWidth="xs"
            fullWidth
          >
            <h2 className="text-center font-medium text-xl text-gray-600 pt-6">
              Đánh giá chủ nhà {name}
            </h2>
            <DialogContent>
              <div>
                <p className=" text-gray-600">
                  Sự hài lòng của bạn về trải nghiệm văn hóa
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <Rating
                    name="scoreHost"
                    value={dataReview.rating}
                    precision={1}
                    getLabelText={getLabelText}
                    onChange={(_event, newValue) => {
                      setDataReview((prev) => ({ ...prev, rating: newValue }))
                    }}
                    onChangeActive={(_event, newHover) => {
                      setHoverHost(newHover)
                    }}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                  {dataReview.rating !== null && (
                    <p className="text-xs text-gray-600 ">
                      {labels[hoverHost !== -1 ? hoverHost : dataReview.rating]}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <p className="pt-4 pb-2 text-gray-600">Nội dung đánh giá</p>
                <textarea
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-cyan-600 focus:border-blue-500 outline-none"
                  placeholder="Nội dung đánh giá ..."
                  value={dataReview.content}
                  onChange={(e) =>
                    setDataReview((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                ></textarea>
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <Button variant="outlined" onClick={handleCancelReview}>
                  Hủy
                </Button>
                <Button variant="contained" onClick={handlePostReviewHost}>
                  Đánh giá
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <Alert severity="warning">
          Hãy thuê phòng của {name} và quay lại đánh giá !
        </Alert>
      )}
    </div>
  )
}

export default ModalReviewGuest

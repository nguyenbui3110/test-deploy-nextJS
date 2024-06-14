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
import { getGuestReviews, postCreateReviewGuest } from '@/src/apis/review'
import { IGuestReview } from '@/src/page-components/GuestProfile/GuestProfile.type'
import { CheckGuestStayedInPropertyOfHost } from '@/src/apis/guest'
import { TOAST_MESSAGE } from '@/src/toast-message/ToastMessage'
import { DEFAULT_DATA_REVIEW } from '@/src/page-components/HostProfile/HostProfile.type'

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
interface IGuestReviewProps {
  guestId: number
  name: string
  getGuestInfoAsync: () => Promise<void>
}

const GuestReview = ({
  guestId,
  name,
  getGuestInfoAsync,
}: IGuestReviewProps) => {
  const [listReview, setListReview] = useState<IGuestReview[]>([])

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [isStayed, setIsStayed] = useState<boolean>(false)

  const [open, setOpen] = useState(false)

  const [hoverGuest, setHoverGuest] = useState(-1)

  const [dataReview, setDataReview] = useState<{
    rating: number
    content: string
  }>(DEFAULT_DATA_REVIEW)

  const getListReview = async () => {
    try {
      const { data, totalPages } = await getGuestReviews(guestId, currentPage)
      setListReview(data)
      setTotalPages(totalPages)
    } catch (error) {}
  }
  const CheckGuestStayedInPropertyOfCurrentHostAsync = async () => {
    try {
      const { data } = await CheckGuestStayedInPropertyOfHost(guestId)
      setIsStayed(data)
    } catch (err) {}
  }

  useEffect(() => {
    getListReview()
    CheckGuestStayedInPropertyOfCurrentHostAsync()
  }, [guestId, currentPage])

  const handleChangePage = (_event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }

  const handleCancelReview = async () => {
    setDataReview(DEFAULT_DATA_REVIEW)
    setOpen(false)
  }

  const handlePostReviewHost = async () => {
    if (dataReview.content !== '' && dataReview?.rating !== null) {
      try {
        await toast.promise(postCreateReviewGuest(guestId, dataReview), {
          pending: TOAST_MESSAGE.review.post.pending,
          success: TOAST_MESSAGE.review.post.success,
          error: TOAST_MESSAGE.review.post.error,
        })
        getListReview()
        getGuestInfoAsync()
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
                    getGuestInfoAsync={getGuestInfoAsync}
                    getListReview={getListReview}
                    guestId={guestId}
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
            <p className="text-sm text-gray-700 py-4">
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
            Nhận xét về khách
          </Button>
          <Dialog
            open={open}
            onClose={handleCancelReview}
            maxWidth="xs"
            fullWidth
          >
            <DialogActions className="">
              <Button onClick={handleCancelReview} color="primary">
                Đóng
              </Button>
            </DialogActions>
            <h2 className="text-center font-medium text-xl text-gray-600">
              Nhận xét về khách {name}
            </h2>
            <DialogContent>
              <div>
                <p className="pb-2 text-gray-600">Sự hài lòng của bạn</p>
                <div className="flex items-center gap-4 py-1">
                  <p className="text-gray-700 min-w-[120px]">Địa điểm:</p>
                  <Rating
                    name="scoreGuest"
                    value={dataReview.rating}
                    precision={1}
                    getLabelText={getLabelText}
                    onChange={(_event, newValue) => {
                      setDataReview((prev) => ({ ...prev, rating: newValue }))
                    }}
                    onChangeActive={(_event, newHover) => {
                      setHoverGuest(newHover)
                    }}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                  {dataReview.rating !== null && (
                    <p className="text-xs text-gray-600 ">
                      {
                        labels[
                          hoverGuest !== -1 ? hoverGuest : dataReview?.rating
                        ]
                      }
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
                  value={dataReview?.content}
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
          Bạn phải là chủ nhà của khách này mới có thể đánh giá được!
        </Alert>
      )}
    </div>
  )
}

export default GuestReview

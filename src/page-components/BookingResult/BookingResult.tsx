'use client'
import MainLayout from '@/src/components/layouts/MainLayout'
import { Button } from '@mui/material'
import { useSearchParams } from 'next/navigation'

import Image from 'next/image'
import { routes } from '@/src/routes'
import Link from 'next/link'
import PaymentSuccessImage from '@/assets/images/payment-success.webp'
import PaymentFailedImage from '@/assets/images/payment-failed.jpg'
import { useEffect, useMemo, useState } from 'react'
import { postVNPayHookUrl } from '@/src/apis/payment'
import Loading from '@/src/components/Loading/Loading'

const BookingResult = () => {
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null)

  const searchParams = useSearchParams()
  const vnp_Amount = searchParams.get('vnp_Amount')
  const vnp_BankCode = searchParams.get('vnp_BankCode')
  const vnp_BankTranNo = searchParams.get('vnp_BankTranNo')
  const vnp_CardType = searchParams.get('vnp_CardType')
  const vnp_OrderInfo = searchParams.get('vnp_OrderInfo')
  const vnp_PayDate = searchParams.get('vnp_PayDate')
  const vnp_ResponseCode = searchParams.get('vnp_ResponseCode')
  const vnp_TmnCode = searchParams.get('vnp_TmnCode')
  const vnp_TransactionNo = searchParams.get('vnp_TransactionNo')
  const vnp_TransactionStatus = searchParams.get('vnp_TransactionStatus')
  const vnp_TxnRef = searchParams.get('vnp_TxnRef')
  const vnp_SecureHash = searchParams.get('vnp_SecureHash')
  const bookingFreeSuccess = searchParams.get('bookingSuccess')

  useEffect(() => {
    // Nếu có bookingFreeSuccess, set isSuccess tương ứng
    if (bookingFreeSuccess) {
      setIsSuccess(bookingFreeSuccess === 'true')
    } else {
      // Nếu không có bookingFreeSuccess, kiểm tra các params khác
      const dataPostChecked = {
        vnp_Amount,
        vnp_BankCode,
        vnp_BankTranNo,
        vnp_CardType,
        vnp_OrderInfo,
        vnp_PayDate,
        vnp_ResponseCode,
        vnp_TmnCode,
        vnp_TransactionNo,
        vnp_TransactionStatus,
        vnp_TxnRef,
        vnp_SecureHash,
      }

      const postCheckedPayment = async (dataPostChecked) => {
        try {
          await postVNPayHookUrl(dataPostChecked)
          setIsSuccess(true)
        } catch (error) {
          console.error('Lỗi trong quá trình xử lý thanh toán:', error)
          setIsSuccess(false)
        }
      }

      postCheckedPayment(dataPostChecked)
    }
  }, [
    bookingFreeSuccess,
    vnp_Amount,
    vnp_BankCode,
    vnp_BankTranNo,
    vnp_CardType,
    vnp_OrderInfo,
    vnp_PayDate,
    vnp_ResponseCode,
    vnp_TmnCode,
    vnp_TransactionNo,
    vnp_TransactionStatus,
    vnp_TxnRef,
    vnp_SecureHash,
  ])

  return (
    <MainLayout>
      <>
        {isSuccess === null && (
          <div className="flex flex-col items-center my-4 h-screen ">
            <h2 className="text-2xl font-bold text-cyan-800 my-4">
              Đang tiến hành thanh toán
            </h2>
            <Loading />
          </div>
        )}
        {isSuccess === true && (
          <div className="flex flex-col items-center my-4 h-screen ">
            <Image
              className="w-1/2 my-4"
              src={PaymentSuccessImage}
              alt="Success"
            />
            <h2 className="text-2xl font-bold text-cyan-800 my-2">
              Yêu cầu đặt phòng thành công
            </h2>
            <p className="text-gray-600 mb-4">
              Đơn đặt phòng của bạn đang được chủ nhà xử lý
            </p>
            <Button variant="contained">
              <Link href={routes.guestManageBooking.generatePath()}>
                Quản lý đặt phòng
              </Link>
            </Button>
          </div>
        )}
        {isSuccess === false && (
          <div className="flex flex-col items-center my-4 h-screen ">
            <Image
              className="w-2/5 my-4"
              src={PaymentFailedImage}
              alt="Success"
            />
            <h2 className="text-2xl font-bold text-[#cb2b2f] my-2">
              Yêu cầu đặt phòng thất bại !
            </h2>
            <p className="text-gray-600 pb-4">
              Dường như đã có lỗi xảy ra, vui lòng thử lại sau !
            </p>
            <Button variant="contained">
              <Link href={routes.guestManageBooking.generatePath()}>
                Quản lý đặt phòng
              </Link>
            </Button>
          </div>
        )}
      </>
    </MainLayout>
  )
}

export default BookingResult

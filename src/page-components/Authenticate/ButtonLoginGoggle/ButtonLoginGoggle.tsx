import { Button } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import { useGoogleLogin } from '@react-oauth/google'
import { toast } from 'react-toastify'
import { postLoginGoogle } from '@/src/apis/auth'
import { handleSaveLogin } from '@/src/utils/common'
import { useRouter } from 'next/navigation'
import { routes } from '@/src/routes'
import { TOAST_MESSAGE } from '@/src/toast-message/ToastMessage'

const ButtonLoginGoogle = () => {
  const router = useRouter()

  const login = useGoogleLogin({
    // https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=
    onSuccess: async (data) => {
      // fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenResponse.access_token}`)
      // fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenResponse.access_token}`)
      //   .then((response) => response.json())
      //   .then((accessToken) => {
      //     console.log(accessToken);
      //   })
      //   .catch((err) => console.error(err));
      // console.log(data.access_token);
      try {
        const { accessToken, refreshToken, user } = await toast.promise(
          postLoginGoogle(data.access_token),
          {
            pending: TOAST_MESSAGE.login.pending,
            success: TOAST_MESSAGE.login.success,
            error: TOAST_MESSAGE.login.error,
          }
        )
        handleSaveLogin({ accessToken, refreshToken, user })
        router.push(routes.home.generatePath())
      } catch (error) {
        toast.error(TOAST_MESSAGE.login.error)
      }
    },
  })
  return (
    <Button
      onClick={() => login()}
      variant="outlined"
      sx={{
        height: '50px',
        mt: '20px ',
      }}
      fullWidth
      startIcon={<GoogleIcon />}
    >
      Đăng nhập với Google
    </Button>
  )
}

export default ButtonLoginGoogle

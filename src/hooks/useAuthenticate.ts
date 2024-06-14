import Cookies from 'js-cookie'

const useAuthenticate = () => {
  const TOKEN = Cookies.get('jwt_token')
  return {
    isAuthen: TOKEN ? true : false,
  }
}
export default useAuthenticate

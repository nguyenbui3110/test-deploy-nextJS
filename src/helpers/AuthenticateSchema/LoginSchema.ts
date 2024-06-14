import * as yup from 'yup'

const initialValues = {
  username: '',
  password: '',
}
const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_])(?=.*\d).+$/
const LoginSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Tối thiểu 3 kí tự')
    .max(50, 'Tối đa 50 kí tự')
    .required('Tên đăng nhập / Email là bắt buộc'),
  password: yup
    .string()
    .matches(
      passwordRegex,
      'Mật khẩu phải có ít nhất 1 chữ số, 1 chữ hoa và 1 kí tự đặc biệt'
    )
    .required('Mật khẩu là bắt buộc'),
})

export { initialValues, LoginSchema }

import { BACK_END_API_URL } from '@/src/constant'
import axios from 'axios'

const ATTACHMENTS_PATH = `${BACK_END_API_URL}/api/attachments/upload-attachment`

export const postUploadAttachment = (file: FormData) => {
  return axios.post(ATTACHMENTS_PATH, file)
}

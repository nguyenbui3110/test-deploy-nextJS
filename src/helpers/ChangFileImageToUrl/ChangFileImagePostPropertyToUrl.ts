import { postUploadAttachment } from '@/src/apis/attachments'
import { toast } from 'react-toastify'

export const ChangFileImageToUrl = async (
  listImage: File[]
): Promise<{ url: string }[] | undefined> => {
  try {
    const promises = listImage.map((img: File) => ChangeOneFile(img))
    const urls = await Promise.all(promises)
    return urls.map((item) => ({ url: item }))
  } catch (err) {}
}

const ChangeOneFile = async (image: File) => {
  const formData = new FormData()
  formData.append('file', image)
  const { data } = await postUploadAttachment(formData)
  return data
}

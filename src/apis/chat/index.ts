import { IContact, IMessage } from '@/src/components/Contacts/Contacts.type'
import { BACK_END_API_URL } from '@/src/constant'
import { http } from '@/src/library/http'

const CHAT_PATH = `${BACK_END_API_URL}/api/chat`

export const getListContact = () => {
  return http.get<{ data: IContact[] }>(`${CHAT_PATH}/contacts`)
}
export const getMessagesByUserId = (userId: number) => {
  return http.get<{ data: IMessage[] }>(`${CHAT_PATH}/messages/${userId}`)
}

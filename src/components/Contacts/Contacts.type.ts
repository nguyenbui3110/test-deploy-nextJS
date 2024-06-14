export interface IContact {
  id: number
  fullName: string
  avatarUrl: string
  lastMessage: string
  lastMessageTime: string
}
export interface IMessage {
  id: number
  senderId: number
  receiverId: number
  senderName: string
  senderAvatarUrl: string
  content: string
  messageTime: string
}

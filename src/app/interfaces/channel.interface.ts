import { User } from "./user.interface"


export interface Channel {
[x: string]: any
    name: string
    description: string
    members: User[]
    chats: number
    id: number
    creator: User
    created_at: string
}




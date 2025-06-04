export type UserAuth = {
  id: string
  name: string
  email: string
  emailVerified: boolean
  createdAt: Date
  updatedAt: Date
  image?: string | null
  banned?: boolean | null
  role?: string | null
  banReason?: string | null
  banExpires?: Date | null
}

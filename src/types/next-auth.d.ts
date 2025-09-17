import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface User {
    userData: {
      name: string
      email: string
      role: string
    }
    token: string
  }

  interface Session {
    user: User["userData"]
    accessToken?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User["userData"]
    accessToken?: string
  }
}

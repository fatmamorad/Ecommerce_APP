import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
          }),
          headers: { "Content-Type": "application/json" }
        })

        const data = await res.json()
        if (data.message === "success") {
          return {
            id:data.user.email,
            userData: data.user,
            token: data.token,
          }
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as any
        token.user = u.userData
        token.accessToken = u.token
      }
      return token
    },
    async session({ session, token }) {
      session.user = token.user as any ?? null
      session.accessToken = token.accessToken as string | undefined
      return session
    }
  },
  pages: {
    signIn: "/login",
  }
}

// لازم تعملي export للـ handler
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

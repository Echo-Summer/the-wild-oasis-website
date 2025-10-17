// export { GET, POST } from '@/app/_lib/auth'

import { createGuest, getGuest } from '@/app/_lib/data-service'
import { se } from 'date-fns/locale'
import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
// import Google from 'next-auth/providers/google'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    // Google({
    //   clientId: process.env.AUTH_GOOGLE_ID,
    //   clientSecret: process.env.AUTH_GOOGLE_SECRET,
    // }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    //authorized：判断用户是否允许访问某个请求；
    authorized({ auth, request }) {
      return !!auth?.user
    },

    //signIn：用户登录时触发；
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email)

        if (!existingGuest) {
          await createGuest({ email: user.email, fullName: user.name })
        }

        return true
      } catch {
        return false
      }
    },

    //session：session 被创建或访问时触发。
    async session({ session, user }) {
      const guest = await getGuest(session.user.email)
      session.user.guestId = guest.id

      return session
    },
  },

  pages: {
    signIn: '/login',
  },
})

export const { GET, POST } = handlers

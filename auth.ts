import NextAuth, { User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { loginSchema } from "./schema/auth-schema";

const baseUrl = process.env.BACKEND_URL ?? 'http://localhost:5842'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      // @ts-expect-error
      authorize: async (credentials) => {

        const values = await loginSchema.parseAsync(credentials)
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values)
        };
        try {
          let user = null;

          const response = await fetch(`${baseUrl}/users/login`, options)
          const data = await response.json()

          if (response.status === 200 && data.success) {
            return {
              user: data.data.user as User,
              accessToken: data.data.accessToken,
              refreshToken: data.data.refreshToken
            }
          }

          return user
        } catch (error) {
          console.error('Login Error:', error)
          // Use a type guard to check if error is an instance of Error
          const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'

          return { success: false, message: errorMessage }
        }
      },
    })
  ],
  // callbacks: {
  //   async jwt(token, user) {

  //   }
  // }
})
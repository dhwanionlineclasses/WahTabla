import NextAuth, { type DefaultSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { loginSchema } from "./schema/auth-schema";

const baseUrl = process.env.BACKEND_URL ?? 'http://localhost:5842'


declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: string
      name: string
      email: string
      accessToken: string
      refreshToken: string
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"]
  }
}


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
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
              id: data.data.user.id,
              name: data.data.user.username,
              email: data.data.user.email,
              accessToken: data.data.accessToken,
              refreshToken: data.data.refreshToken,
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
  callbacks: {
   session({ session}) {
    return {
      ...session,
    }
   },

   jwt({token}) {
    return {
      
    }
   }
  }
})
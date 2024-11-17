import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import type {
  // AuthOptions,
  // User,
  UserObject,
  AuthValidity,
  // BackendAccessJWT,
  BackendJWT,
  DecodedJWT
} from "next-auth"
import type { JWT } from "next-auth/jwt"
import jwt from 'jsonwebtoken'
import { AuthLoginApiResponseType } from "./schema/auth-schema"
// import { error } from "console"

const baseUrl = process.env.BACKEND_URL ?? 'http://localhost:5842'


// async function refreshAccessToken(nextAuthJWTCookie: JWT): Promise<JWT> {
//   try {
//     // Get a new access token from backend using the refresh token
//     const res = await refresh(nextAuthJWTCookie.data.tokens.refresh);
//     const accessToken: BackendAccessJWT = await res.json();

//     if (!res.ok) throw accessToken;
//     const { exp }: DecodedJWT = jwt.decode(accessToken.access);

//     // Update the token and validity in the next-auth cookie
//     nextAuthJWTCookie.data.validity.valid_until = exp;
//     nextAuthJWTCookie.data.tokens.access = accessToken.access;

//     return nextAuthJWTCookie;
//   } catch (error) {
//     console.debug(error);
//     return {
//       ...nextAuthJWTCookie,
//       error: "RefreshAccessTokenError"
//     };
//   }
// }

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({

      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        try {
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials)
          };

          const res = await fetch(`${baseUrl}/users/login`, options)
          const data: AuthLoginApiResponseType = await res.json()

          if(res.status !== 200 || !data || !data.data || !data.success) throw Error(data.message)
          
          const tokens: BackendJWT = {
            access: data.data.accessToken,
            refresh: data.data.refreshToken
          }

          const access = jwt.decode(data.data.accessToken) as DecodedJWT
          const refresh = jwt.decode(data.data.refreshToken) as DecodedJWT

          const user: UserObject = {
            username: access.user.username,
            email: access.user.email,
            id: access.user.id
          };

          const validity: AuthValidity = {
            valid_until: access.exp,
            refresh_until: refresh.exp
          };

          return {
            // User object needs to have a string id so use refresh token id
            id: `${user.id}`,
            tokens: tokens,
            user: user,
            validity: validity
          };

        } catch (error) {
          console.dir(error)
          return null
        }
      }
    })
  ],
  callbacks: {
    // async redirect({ url, baseUrl }) {
    //   return url.startsWith(baseUrl)
    //     ? Promise.resolve(url)
    //     : Promise.resolve(baseUrl);
    // },
    async jwt({ token, user, account }) {
      // Initial signin contains a 'User' object from authorize method
      if (user && account) {
        console.debug("Initial signin");
        return { ...token, data: user };
      }

      // // The current access token is still valid
      if (Date.now() < token.data.validity.valid_until * 1000) {
        // console.debug("Access token is still valid");
        return token;
      }

      // The refresh token is still valid
      // if (Date.now() < token.data.validity.refresh_until * 1000) {
      //   console.debug("Access token is being refreshed");
      //   return await refreshAccessToken(token);
      // }

      // The current access token and refresh token have both expired
      // This should not really happen unless you get really unlucky with
      // the timing of the token expiration because the middleware should
      // have caught this case before the callback is called
      console.debug("Both tokens have expired");
      return { ...token, error: "RefreshTokenExpired" } as JWT;
    },
    async session({ session, token, user }) {
      // @ts-expect-error
      session.user = token.data.user;
      session.validity = token.data.validity;
      session.error = token.error;
      return session;
    }
  }
})
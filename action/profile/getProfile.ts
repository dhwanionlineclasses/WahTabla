'use server'

import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import { RequestInit } from "next/dist/server/web/spec-extension/request";
import { parseResponse } from "@/utils/parse-course";



const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:5842'


export const getProfile = async () => {

  const cookieStore = cookies()
  const tokens = cookieStore.get('authjs.session-token')?.value ?? ''

  const session = await decode({
    token: tokens,
    secret: process.env.AUTH_SECRET!,
    salt: 'authjs.session-token'
  })

  if (!session) {
    return { success: false, message: 'Access token not found in cookies' };
  }

  if (!session?.data?.tokens?.access || !session?.data?.tokens?.refresh) {
    return { success: false, message: 'Access or refresh token not found in session' };
  }

  const accessToken = session.data.tokens.access;
  const refreshToken = session.data.tokens.refresh;

  // Construct the Cookie header
  const cookieHeader = `accessToken=${accessToken}; refreshToken=${refreshToken}; Path=/; HttpOnly; Secure`;

  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader, // Add cookies to the request
    },
    credentials: "include", // Ensure cookies are included in the request
  };
  console.log('calling profile endpoint')
  try {
    const response = await fetch(`${baseUrl}/profiles/getProfile`, options)
    console.log(response)
    const data = await response.json()

    if (response.status === 200) {

      return {
        success: true,
        message: 'Successfully recieved user data',
        data: parseResponse(data) 
      }
    } else {
      return { success: false, message: data.message || 'Profile Fetching failed' }
    }


  } catch (error) {
    console.error('Login Error:', error)
    // Use a type guard to check if error is an instance of Error
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return { success: false, message: errorMessage }
  }
}
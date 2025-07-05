'use server'

import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import { RequestInit } from "next/dist/server/web/spec-extension/request";
import { FinalExamSubmitRequest, FinalExamSubmitResponse } from "@/types/exam/final-exam";
const sessionTokenName =
  process.env.NODE_ENV === 'production'
    ? '__Secure-authjs.session-token'
    : 'authjs.session-token';

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:5842'

export const submitFinalExam = async (values: FinalExamSubmitRequest): Promise<FinalExamSubmitResponse> => {

  const cookieStore = cookies()
  const tokens = cookieStore.get(sessionTokenName)?.value ?? ''

  const session = await decode({
    token: tokens,
    secret: process.env.AUTH_SECRET!,
    salt: sessionTokenName
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
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader, // Add cookies to the request
    },
    credentials: "include", // Ensure cookies are included in the request
    body: JSON.stringify(values)
  };
  try {

    const url = `${baseUrl}/exams/final/submit`
    console.log(url)
    
    const response = await fetch(url, options)
    // console.log(response.status)
    const responseData = await response.json()
    // console.dir(values)
    // console.log(responseData, response.status)

    if (response.status === 200) {
      return {
        success: true,
        message: responseData.message || 'Final exam submitted and graded successfully',
        data: responseData.data
      }
    } else {
      return { 
        success: false, 
        message: responseData.message || 'Final exam submission failed' 
      }
    }

  } catch (error) {
    console.error('Final Exam Submission Error:', error)
    // Use a type guard to check if error is an instance of Error
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return { success: false, message: errorMessage }
  }
}
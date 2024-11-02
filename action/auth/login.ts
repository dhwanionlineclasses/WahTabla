'use server'

import { cookies } from 'next/headers'
import { LoginSchemaType } from '@/schema/auth-schema';
// import { signIn } from '@/auth';

const baseUrl = process.env.BACKEND_URL ?? 'http://localhost:5842'

export async function login(values: LoginSchemaType) {

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values)
    };
    try {
        const response = await fetch(`${baseUrl}/users/login`, options)
        const data = await response.json()

        if (response.status === 200 && data.success) {
            // Set cookies for accessToken and refreshToken
            cookies().set('accessToken', data.data.accessToken, {
                path: '/',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7, // 1 week or set according to token expiry
            })

            cookies().set('refreshToken', data.data.refreshToken, {
                path: '/',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7 * 4, // 4 week or set according to token expiry
            })

            return {
                success: true,
                message: data.message,
                user: data.data.user,
            }
        } else {
            return { success: false, message: data.message || 'Login failed' }
        }

        // const email = values.email
        // const password = values.password

        // const res = await signIn("credentials");
        // console.dir(res);
        // return res

    } catch (error) {
        console.error('Login Error:', error)
        // Use a type guard to check if error is an instance of Error
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'

        return { success: false, message: errorMessage }
    }
}
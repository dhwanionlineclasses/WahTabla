

// import { NextRequest, NextResponse } from 'next/server'
// import { decode } from "next-auth/jwt";
// import { cookies } from 'next/headers'
 
// // 1. Specify protected and public routes
// const protectedRoutes = ['/profile', '/doubt-clearing', '/course']
// const publicRoutes = ['/auth/login', '/auth/register', '/']
 
// export default async function middleware(req: NextRequest) {
//   // 2. Check if the current route is protected or public
//   const path = req.nextUrl.pathname
//   const isProtectedRoute = protectedRoutes.includes(path)
//   const isPublicRoute = publicRoutes.includes(path)
 
//   // 3. Decrypt the session from the cookie
//   const cookie = cookies().get('authjs.session-token')?.value
//   const session = await decode({
//     token: cookie,
//     secret: process.env.AUTH_SECRET!,
//     salt: 'authjs.session-token'
//   })
 
//   // 4. Redirect to /login if the user is not authenticated
//   if (isProtectedRoute && !session?.data?.tokens?.access) {
//     return NextResponse.redirect(new URL('/auth/login', req.nextUrl))
//   }
 
//   // 5. Redirect to /profile if the user is authenticated
//   if (
//     isPublicRoute &&
//     session?.data.user.id &&
//     !req.nextUrl.pathname.startsWith('/profile')
//   ) {
//     return NextResponse.redirect(new URL('/profile', req.nextUrl))
//   }
 
//   return NextResponse.next()
// }
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
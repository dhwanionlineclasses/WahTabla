import { auth } from './auth';
import { getToken } from 'next-auth/jwt';
import {
  DEFAULT_LOGIN_ROUTE,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  apiStripeWebhook
} from '@/lib/routes'

export default auth(async (req) => {
  const { nextUrl } = req;

  const token = await getToken({ req, secret: process.env.AUTH_SECRET! })
  // const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isApiStripeWebhookRoute = nextUrl.pathname.startsWith(apiStripeWebhook);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isLoginPage = nextUrl.pathname === '/auth/login';

  const isTokenExpired =
    !token || (token.data?.validity?.valid_until && Date.now() / 1000 > token.data.validity.valid_until);


  if (isApiStripeWebhookRoute || isApiAuthRoute) {
    return;
  }

  if (isTokenExpired && !isPublicRoute) {
    console.log('Token expired or invalid');
    if (!isLoginPage) {
      return Response.redirect(new URL('/auth/login', nextUrl));
    }
  }

  if (isAuthRoute) {
    if (!isTokenExpired) {
      return Response.redirect(new URL(DEFAULT_LOGIN_ROUTE, nextUrl));
    }

    return;
  }

  if (!token && !isPublicRoute) {
    if (!isLoginPage) {
      return Response.redirect(new URL(`/auth/login`, nextUrl));
    }
  }

  return;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
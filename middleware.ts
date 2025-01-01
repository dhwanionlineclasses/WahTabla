import { auth } from './auth';
import {
  DEFAULT_LOGIN_ROUTE,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  apiStripeWebhook
} from '@/lib/routes'

export default auth((req) => {
  const { nextUrl } = req;

  const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isApiStripeWebhookRoute = nextUrl.pathname.startsWith(apiStripeWebhook);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

     if (isApiStripeWebhookRoute) {
      return;
    }

    if (isApiAuthRoute) {
      return;
    }

    if (isAuthRoute) {
      if (isLoggedIn) {
        return Response.redirect(new URL(DEFAULT_LOGIN_ROUTE, nextUrl));
      }

      return;
    }

    if (!isLoggedIn && !isPublicRoute) {

      // let callbackUrl = nextUrl.pathname ;
      // if(nextUrl.search) {
      //   callbackUrl += nextUrl.search
      // }

      // const encodeCallbackUrl = encodeURIComponent(callbackUrl)
      return Response.redirect(new URL(
        `/auth/login`,
        nextUrl
      ));
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
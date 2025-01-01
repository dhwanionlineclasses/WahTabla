import Stripe from 'stripe'
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia'
})


export async function POST(req: NextRequest) {
  const payload = await req.text();
  const res = JSON.parse(payload);

  let event
  const sig = req.headers.get("Stripe-Signature");

  const dateTime = new Date(res?.created * 1000).toLocaleDateString();
  const timeString = new Date(res?.created * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });


  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    return NextResponse.json({ status: "Failed", error });
  }

  // console.log("Event", event.type);
  // charge.succeeded
  // payment_intent.succeeded
  // payment_intent.created

  // console.log(

  //   res?.data?.object?.billing_details?.email,
  //   res?.data?.object?.amount,
  //   // JSON.stringify(res),
  //   // res?.type,
  //   // String(timeString),
  //   // String(dateTime),
  //   // res?.data?.object?.receipt_email,
  //   // res?.data?.object?.receipt_url,
  //   // JSON.stringify(res?.data?.object?.payment_method_details), 
  //   // JSON.stringify(res?.data?.object?.billing_details),
  //   // res?.data?.object?.currency

  // );

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

      const paymentDetails = {
        customerDetails: session.customer_details,
        totalAmount: session.amount_total,
        createdDate: dateTime,
        createdTime: timeString,
        metadata: session.metadata,
        paymentIntent: session.payment_intent,
        products: lineItems.data.map((item) => ({
          name: item.description,
          quantity: item.quantity,
          price: item.amount_total,
        })),
      }

      console.dir(paymentDetails)
      break;
    case 'charge.updated':
      // colect user info
      // update user data in db
      // if not updated.success the response a 500 status
      // console.log(res.data.object.billing_details.email, res.data.object.amount)
      break;
    case 'charge.failed':
      // in case payment failed.
      break;
    default:
      console.warn('Unathourazied event type: ', event.type)
    // console.info('Stripe Event id: ', event.id)
  }

  return NextResponse.json({ status: "sucess", event: event.type, response: res });
}
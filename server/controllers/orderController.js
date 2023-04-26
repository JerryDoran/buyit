import Stripe from 'stripe';
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function checkoutSession(req, res) {
  const shippingInfo = req?.body?.shippingInfo;

  const body = req.body;

  const line_items = body?.items?.map((item) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.image],
          metadata: {
            productId: item.productId,
          },
        },
        unit_amount: item.price * 100,
      },
      tax_rates: ['txr_1N0VvjBLY1gbvNp16ekpSgya'],
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${process.env.NEXT_PUBLIC_API_URL}/me/orders?order_success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_API_URL}`,
    customer_email: req?.user?.email,
    client_reference_id: req?.user?._id,
    mode: 'payment',
    metadata: {
      shippingInfo,
    },
    shipping_options: [
      {
        shipping_rate: 'shr_1N0VnxBLY1gbvNp1JbtdsZoM',
      },
    ],
    line_items,
  });
  res.status(200).json({
    url: session.url,
  });
}

import getRawBody from 'raw-body';
import Stripe from 'stripe';
import Order from '../models/Order';
import APIFilters from '../lib/APIFilters';
import ErrorHandler from '../lib/errorHandler';
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function checkoutSession(req, res) {
  const shippingInfo = req?.body?.shippingInfo;

  const body = req.body;

  console.log('Body', body, 'Shipping Info', shippingInfo);

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

async function getCartItems(line_items) {
  return new Promise((resolve, reject) => {
    let cartItems = [];
    line_items?.data?.forEach(async (item) => {
      const product = await stripe.products.retrieve(item.price.product);
      const productId = product.metadata.productId;

      cartItems.push({
        product: productId,
        name: product.name,
        price: item.price.unit_amount_decimal / 100,
        quantity: item.quantity,
        image: product.images[0],
      });

      if (cartItems.length === line_items?.data?.length) {
        resolve(cartItems);
      }
    });
  });
}

export async function webhook(req, res) {
  console.log('Req', req);
  try {
    const rawBody = await getRawBody(req);
    const signature = req.headers['stripe-signature'];
    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      const line_items = await stripe.checkout.sessions.listLineItems(
        event.data.object.id
      );

      const orderItems = await getCartItems(line_items);
      const userId = session.client_reference_id;
      const amountPaid = session.amount_total / 100;

      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
        amountPaid,
        tax: session.total_details.amount_tax / 100,
      };

      const orderData = {
        user: userId,
        shippingInfo: session.metadata.shippingInfo,
        paymentInfo,
        orderItems,
      };

      const order = await Order.create(orderData);
      res.status(201).json({ success: true, order });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function myOrders(req, res) {
  const resPerPage = 2;
  const ordersCount = await Order.countDocuments();

  const apiFilters = new APIFilters(Order.find(), req.query).pagination(
    resPerPage
  );

  const orders = await apiFilters.query
    .find({ user: req.user._id })
    .populate('shippingInfo user');

  res.status(200).json({ ordersCount, resPerPage, orders });
}

export async function getAdminOrders(req, res) {
  const resPerPage = 2;
  const ordersCount = await Order.countDocuments();

  const apiFilters = new APIFilters(Order.find(), req.query).pagination(
    resPerPage
  );

  const orders = await apiFilters.query.find({}).populate('shippingInfo user');

  res.status(200).json({ ordersCount, resPerPage, orders });
}

export async function getAdminOrder(req, res, next) {
  const order = await Order.findById(req.query.orderId).populate(
    'shippingInfo user'
  );

  if (!order) {
    return next(new ErrorHandler('No order found with this ID', 404));
  }

  res.status(200).json({ order });
}

export async function updateAdminOrder(req, res, next) {
  let order = await Order.findById(req.query.orderId);

  if (!order) {
    return next(new ErrorHandler('No order found with this ID', 404));
  }

  order = await Order.findByIdAndUpdate(req.query.orderId, {
    orderStatus: req.body.orderStatus,
  });

  res.status(200).json({ success: true, order });
}

export async function deleteAdminOrder(req, res, next) {
  const order = await Order.findById(req.query.orderId);

  if (!order) {
    return next(new ErrorHandler('No order found with this ID', 404));
  }

  await order.deleteOne();

  res.status(200).json({ success: true });
}

export async function canReview(req, res, next) {
  const productId = req.query.productId;

  const orders = await Order.find({
    user: req?.user?._id,
    'orderItems.product': productId,
  });

  let canReview = orders.length >= 1 ? true : false;

  res.status(200).json({ canReview });
}

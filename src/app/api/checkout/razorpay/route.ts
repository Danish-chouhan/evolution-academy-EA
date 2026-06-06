import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_mock',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'mock_secret',
});

export async function POST(request: Request) {
  try {
    const { amount } = await request.json();

    const options = {
      amount: Math.round(amount * 100), // Amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    // If using mock keys, bypass Razorpay creation and return a mock object
    if (process.env.RAZORPAY_KEY_ID === 'rzp_test_mock' || !process.env.RAZORPAY_KEY_ID) {
      return NextResponse.json({
        id: `order_mock_${Date.now()}`,
        amount: options.amount,
        currency: "INR",
      });
    }

    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create Razorpay order' }, { status: 500 });
  }
}

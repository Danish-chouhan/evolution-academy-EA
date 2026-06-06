import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { connectDB } from '@/lib/db';
import Order from '@/lib/models/Order';

export async function POST(request: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, internal_order_id } = await request.json();

    // Bypass signature check if using mock credentials
    if (process.env.RAZORPAY_KEY_ID === 'rzp_test_mock' || !process.env.RAZORPAY_KEY_ID) {
      await connectDB();
      await Order.findByIdAndUpdate(internal_order_id, {
        paymentStatus: 'Paid',
        razorpayPaymentId: razorpay_payment_id || 'mock_payment_id'
      });
      return NextResponse.json({ success: true, message: "Mock Payment verified successfully" });
    }

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || '')
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      await connectDB();
      await Order.findByIdAndUpdate(internal_order_id, {
        paymentStatus: 'Paid',
        razorpayPaymentId: razorpay_payment_id
      });
      return NextResponse.json({ success: true, message: "Payment verified successfully" });
    } else {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}

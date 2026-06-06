import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Order from '@/lib/models/Order';
import { getTrackingData } from '@/lib/shiprocket';

export async function POST(request: Request) {
  try {
    const { orderId, phone } = await request.json();

    if (!orderId || !phone) {
      return NextResponse.json({ error: 'Order ID and Phone Number are required' }, { status: 400 });
    }

    await connectDB();
    const order = await Order.findById(orderId).populate('product');

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    if (order.customer.phone !== phone) {
      return NextResponse.json({ error: 'Invalid Phone Number for this Order' }, { status: 401 });
    }

    if (!order.awbCode) {
      return NextResponse.json({ 
        status: 'Processing', 
        message: 'Your order is currently being processed and has not been shipped yet.',
        order: {
          productName: order.product?.title,
          productImage: order.product?.image,
          amount: order.amount,
          date: order.createdAt
        }
      });
    }

    // Fetch tracking data from Shiprocket
    const trackingData = await getTrackingData(order.awbCode);

    return NextResponse.json({
      status: 'Shipped',
      awbCode: order.awbCode,
      courierName: order.courierName,
      trackingDetails: trackingData,
      order: {
        productName: order.product?.title,
        productImage: order.product?.image,
        amount: order.amount,
        date: order.createdAt
      }
    });

  } catch (error: any) {
    console.error('Tracking API error:', error);
    return NextResponse.json({ error: 'Failed to fetch tracking details. Please try again later.' }, { status: 500 });
  }
}

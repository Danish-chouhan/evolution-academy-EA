import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Order from '@/lib/models/Order';
import { pushOrderToShiprocket } from '@/lib/shiprocket';

export async function POST(request: Request) {
  try {
    const { orderId } = await request.json();

    await connectDB();
    const order = await Order.findById(orderId).populate('product');

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    if (order.shiprocketOrderId) {
      return NextResponse.json({ error: 'Order already pushed to Shiprocket' }, { status: 400 });
    }

    if (order.product?.isDigital) {
      return NextResponse.json({ error: 'Cannot ship digital products via Shiprocket' }, { status: 400 });
    }

    const srData = await pushOrderToShiprocket(order);

    order.shiprocketOrderId = srData.order_id;
    order.shiprocketShipmentId = srData.shipment_id;
    order.awbCode = srData.awb_code;
    order.courierName = srData.courier_name;
    order.orderStatus = 'Shipped';
    await order.save();

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    console.error('Shiprocket push error:', error);
    return NextResponse.json({ error: error.message || 'Failed to push to Shiprocket' }, { status: 500 });
  }
}

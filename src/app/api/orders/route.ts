import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Order from '@/lib/models/Order';

// Public endpoint to place an order (COD or Online)
export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    
    // In a real app, you would validate stock and pricing here
    
    const order = await Order.create(data);
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

// Admin endpoint to get orders
export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find().sort({ createdAt: -1 }).populate('product');
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

// Admin endpoint to update order status
export async function PUT(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    const { _id, orderStatus, paymentStatus } = data;
    
    const order = await Order.findByIdAndUpdate(_id, { orderStatus, paymentStatus }, { new: true });
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}

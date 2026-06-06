const SHIPROCKET_API_URL = 'https://apiv2.shiprocket.in/v1/external';

let cachedToken: string | null = null;
let tokenExpiry: number | null = null;

export async function getShiprocketToken() {
  if (!process.env.SHIPROCKET_EMAIL || !process.env.SHIPROCKET_PASSWORD) {
    console.log('Shiprocket credentials missing. Using MOCK mode.');
    return 'mock_token';
  }

  // Use cached token if valid
  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  try {
    const res = await fetch(`${SHIPROCKET_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: process.env.SHIPROCKET_EMAIL,
        password: process.env.SHIPROCKET_PASSWORD,
      }),
    });

    if (!res.ok) throw new Error('Shiprocket Auth Failed');

    const data = await res.json();
    cachedToken = data.token;
    // Token usually valid for a few days, let's cache for 24 hours
    tokenExpiry = Date.now() + 24 * 60 * 60 * 1000; 
    return cachedToken;
  } catch (err) {
    console.error('Shiprocket auth error:', err);
    throw err;
  }
}

export async function pushOrderToShiprocket(order: any) {
  const token = await getShiprocketToken();
  if (token === 'mock_token') {
    // Return mock successful response
    return {
      order_id: `mock_sr_order_${Date.now()}`,
      shipment_id: `mock_sr_shipment_${Date.now()}`,
      awb_code: `MOCKAWB${Math.floor(Math.random() * 1000000)}`,
      courier_name: 'Mock Express',
    };
  }

  // Real Shiprocket push
  // Format order to match Shiprocket adHoc payload requirements
  const payload = {
    order_id: order._id.toString(),
    order_date: new Date(order.createdAt).toISOString().split('T')[0],
    pickup_location: "Primary", // Requires a pre-configured pickup location in Shiprocket
    billing_customer_name: order.customer.name.split(' ')[0],
    billing_last_name: order.customer.name.split(' ').slice(1).join(' ') || '',
    billing_address: order.customer.address,
    billing_city: order.customer.city,
    billing_pincode: order.customer.pincode,
    billing_state: order.customer.state,
    billing_country: "India",
    billing_email: order.customer.email,
    billing_phone: order.customer.phone,
    shipping_is_billing: true,
    order_items: [
      {
        name: order.product?.title || 'Product',
        sku: order.product?._id?.toString() || 'SKU01',
        units: 1,
        selling_price: order.amount,
        discount: "",
        tax: "",
        hsn: ""
      }
    ],
    payment_method: order.paymentMethod === 'COD' ? 'COD' : 'Prepaid',
    sub_total: order.amount,
    length: 10,
    breadth: 10,
    height: 10,
    weight: 0.5
  };

  const res = await fetch(`${SHIPROCKET_API_URL}/orders/create/adHoc`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Shiprocket order creation failed:', errorText);
    throw new Error('Shiprocket API failed');
  }

  const data = await res.json();
  return {
    order_id: data.order_id,
    shipment_id: data.shipment_id,
    awb_code: data.awb_code,
    courier_name: data.courier_name,
  };
}

export async function getTrackingData(awbCode: string) {
  const token = await getShiprocketToken();
  if (token === 'mock_token') {
    // Generate mock tracking data based on awbCode
    return {
      tracking_data: {
        track_status: 1,
        shipment_status: 3, // 1: pickup, 2: transit, 3: out for delivery, 4: delivered
        shipment_track: [
          {
            id: 1,
            awb_code: awbCode,
            courier_name: 'Mock Express',
            pickup_date: '2023-10-01 10:00:00',
            delivered_date: '',
            weight: '0.50',
            packages: 1,
            current_status: 'OUT FOR DELIVERY',
            delivered_to: '',
            destination: 'Mumbai',
            consignee_name: 'Customer',
            origin: 'Delhi'
          }
        ],
        shipment_track_activities: [
          { date: '2023-10-01 10:00:00', status: 'PICKED UP', activity: 'Shipment picked up', location: 'Delhi' },
          { date: '2023-10-02 14:00:00', status: 'IN TRANSIT', activity: 'Arrived at hub', location: 'Mumbai' },
          { date: '2023-10-03 09:00:00', status: 'OUT FOR DELIVERY', activity: 'Out for delivery', location: 'Mumbai' },
        ]
      }
    };
  }

  const res = await fetch(`${SHIPROCKET_API_URL}/courier/track/awb/${awbCode}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch tracking data');
  }

  return await res.json();
}

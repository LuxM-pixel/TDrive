export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { bookingId, fullName, phone, trainingDate, trainingTime } = req.body;

    const orderData = {
      order_reference_id: bookingId,
      total_amount: { amount: "375.00", currency: "SAR" },
      shipping_amount: { amount: "0.00", currency: "SAR" },
      tax_amount: { amount: "0.00", currency: "SAR" },
      order_number: bookingId,
      items: [
        {
          name: "TDrive Driving Course",
          type: "Service",
          reference_id: "tdrive-course",
          sku: "tdrive-course",
          quantity: 1,
          discount_amount: { amount: "0.00", currency: "SAR" },
          tax_amount: { amount: "0.00", currency: "SAR" },
          unit_price: { amount: "375.00", currency: "SAR" },
          total_amount: { amount: "375.00", currency: "SAR" },
        },
      ],
      consumer: {
        first_name: fullName,
        last_name: "-",
        phone_number: phone,
        email: "no-email@tdrive.sa",
      },
      country_code: "SA",
      description: "TDrive Driving Course Booking",
      merchant_url: {
        success: "https://luxm-pixel.github.io/TDrive/customer-invoice.html",
        failure: "https://luxm-pixel.github.io/TDrive/payment-method.html",
        cancel: "https://luxm-pixel.github.io/TDrive/payment-method.html",
        notification: "https://" + req.headers.host + "/api/tamara-webhook",
      },
    };

    const response = await fetch("https://api-sandbox.tamara.co/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TAMARA_API_TOKEN}`,
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    return res.status(200).json({
      checkoutUrl: data.checkout_url,
      orderId: data.order_id,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

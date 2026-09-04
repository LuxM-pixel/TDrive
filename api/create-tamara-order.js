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
    const { bookingId, fullName, phone, trainingDate, trainingTime, program, price, productType } = req.body;

    let courseName = "TDrive Driving Course";
    let itemReference = "tdrive-course";
    let amountStr = "375.00";

    if (productType === "captain-sticker") {

      courseName = program || "ملصق الكابتن المحترف";
      itemReference = "tdrive-captain-sticker";
      amountStr = price ? Number(price).toFixed(2) : "100.00";

    } else if (program === "دورة الكابتن المحترف") {

      courseName = "دورة الكابتن المحترف";
      itemReference = "tdrive-captain-course";
      amountStr = "100.00";

    } else if (price) {

      amountStr = Number(price).toFixed(2);

    }


    const orderData = {
      order_reference_id: bookingId,
      total_amount: { amount: amountStr, currency: "SAR" },
      shipping_amount: { amount: "0.00", currency: "SAR" },
      tax_amount: { amount: "0.00", currency: "SAR" },
      order_number: bookingId,
      items: [
        {
          name: courseName,
          type: "Service",
                    reference_id: itemReference,
          sku: itemReference,

          quantity: 1,
          discount_amount: { amount: "0.00", currency: "SAR" },
          tax_amount: { amount: "0.00", currency: "SAR" },
          unit_price: { amount: amountStr, currency: "SAR" },
          total_amount: { amount: amountStr, currency: "SAR" },
        },
      ],
      consumer: {
        first_name: fullName,
        last_name: "-",
        phone_number: phone,
        email: "no-email@tdrive.sa",
      },
      country_code: "SA",
      description: courseName + " Booking",
      merchant_url: {
        success: "https://luxm-pixel.github.io/TDrive/customer-invoice.html",
        failure: "https://luxm-pixel.github.io/TDrive/payment-method.html",
        cancel: "https://luxm-pixel.github.io/TDrive/payment-method.html",
        notification: "https://" + req.headers.host + "/api/tamara-webhook",
      },
    };

    const response = await fetch("https://api.tamara.co/checkout", {
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

import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import jwt from "jsonwebtoken";

const firebaseConfig = {
  apiKey: "AIzaSyDEjf_HrBdJSn1EVaHeyvMubUkPjVZH5i0",
  authDomain: "tdrive-4fed8.firebaseapp.com",
  projectId: "tdrive-4fed8",
  storageBucket: "tdrive-4fed8.firebasestorage.app",
  messagingSenderId: "107257320648",
  appId: "1:107257320648:web:30d142684f936a374041fd",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const tamaraToken = req.query.tamaraToken;

    if (!tamaraToken) {
      return res.status(401).json({ error: "Missing notification token" });
    }

    try {
      jwt.verify(tamaraToken, process.env.TAMARA_NOTIFICATION_TOKEN, {
        algorithms: ["HS256"],
      });
    } catch (jwtError) {
      console.error("JWT verification failed:", jwtError.message);
      return res.status(401).json({ error: "Invalid notification token" });
    }

    console.log("Webhook body received:", JSON.stringify(req.body));

const { order_id, order_reference_id, status } = req.body;

console.log("Extracted status:", status, "| bookingId:", order_reference_id);


    const successStatuses = [
      "approved",
      "authorised",
      "captured",
      "fully_captured",
    ];

    if (!successStatuses.includes((status || "").toLowerCase())) {
      return res.status(200).json({ received: true, skipped: true });
    }

    const q = query(
      collection(db, "customer-invoices"),
      where("bookingId", "==", order_reference_id)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    await updateDoc(snapshot.docs[0].ref, {
      paymentStatus: "Paid",
      tamaraOrderId: order_id,
      tamaraStatus: status,
    });

    return res.status(200).json({ received: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

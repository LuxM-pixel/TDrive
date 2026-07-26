import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";

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

  console.log("Query Token:", tamaraToken);
  console.log("Env Token:", process.env.TAMARA_NOTIFICATION_TOKEN);

  if (tamaraToken !== process.env.TAMARA_NOTIFICATION_TOKEN) {
    return res.status(401).json({ error: "Invalid notification token" });
  }

  const { order_id, order_reference_id, status } = req.body;

  const successStatuses = ["approved", "authorised", "captured", "fully_captured"];
  if (!successStatuses.includes((status || "").toLowerCase())) {
    return res.status(200).json({ received: true, skipped: true });
  }

  // باقي الكود...

    const q = query(
      collection(db, "customer-invoices"),
      where("bookingId", "==", order_reference_id)
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    const docRef = snapshot.docs[0].ref;
    await updateDoc(docRef, {
      paymentStatus: "Paid",
      tamaraOrderId: order_id,
      tamaraStatus: status,
    });

    return res.status(200).json({ received: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

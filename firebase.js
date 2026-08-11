import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    query,
    where,
    doc,
    runTransaction
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const firebaseConfig = {

    apiKey: "AIzaSyDEjf_HrBdJSn1EVaHeyvMubUkPjVZH5i0",

    authDomain: "tdrive-4fed8.firebaseapp.com",

    projectId: "tdrive-4fed8",

    storageBucket: "tdrive-4fed8.firebasestorage.app",

    messagingSenderId: "107257320648",

    appId: "1:107257320648:web:30d142684f936a374041fd",

    measurementId: "G-QBEPEKERXV"

};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


// ==================================================
// احترفي القيادة على الطريق
// ==================================================

export async function saveBooking(data) {

    try {

        const docRef = await addDoc(
            collection(db, "bookings"),
            data
        );

        return docRef.id;

    } catch (error) {

        console.error("Firebase Error:", error);

        alert(error.message);

        throw error;

    }

}


// ==================================================
// دورة الكابتن المحترف
// ==================================================

export async function saveCaptainBooking(data) {

    try {

        const docRef = await addDoc(
            collection(db, "captain-bookings"),
            data
        );

        return docRef.id;

    } catch (error) {

        console.error(
            "Captain Booking Firebase Error:",
            error
        );

        alert(error.message);

        throw error;

    }

}


// ==================================================
// التقييمات
// ==================================================

export async function saveEvaluation(data) {

    try {

        const docRef = await addDoc(
            collection(db, "evaluations"),
            data
        );

        return docRef.id;

    } catch (error) {

        console.error(error);

        throw error;

    }

}


// ==================================================
// حفظ تقييم الموقع
// ==================================================

export async function saveReview(data) {

    try {

        const docRef = await addDoc(
            collection(db, "reviews"),
            {

                ...data,

                status: "pending",

                createdAt: new Date()

            }
        );

        return docRef.id;

    } catch (error) {

        console.error(error);

        throw error;

    }

}


// ==================================================
// التقييمات المعتمدة
// ==================================================

export async function getApprovedReviews() {

    const q = query(

        collection(db, "reviews"),

        where(
            "status",
            "==",
            "approved"
        )

    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(
        doc => doc.data()
    );

}


// ==================================================
// الأوقات المحجوزة لبرنامج القيادة
// ==================================================

export async function getBookedTimes(trainingDate) {

    const q = query(

        collection(db, "bookings"),

        where(
            "trainingDate",
            "==",
            trainingDate
        )

    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(
        doc => doc.data().trainingTime
    );

}


// ==================================================
// رقم الفاتورة التالي
// ==================================================

export async function getNextInvoiceNumber() {

    const ref = doc(
        db,
        "settings",
        "invoice"
    );


    const invoiceNumber =
        await runTransaction(
            db,
            async (transaction) => {

                const snap =
                    await transaction.get(ref);


                let lastNumber =
                    snap.exists()
                        ? (snap.data().lastNumber || 0)
                        : 0;


                lastNumber++;


                if (snap.exists()) {

                    transaction.update(
                        ref,
                        {
                            lastNumber: lastNumber
                        }
                    );

                } else {

                    transaction.set(
                        ref,
                        {
                            lastNumber: lastNumber
                        }
                    );

                }


                return lastNumber;

            }
        );


    return invoiceNumber;

}


// ==================================================
// فواتير العملاء
// ==================================================

export async function saveCustomerInvoice(data) {

    try {

        const docRef = await addDoc(
            collection(
                db,
                "customer-invoices"
            ),
            data
        );

        return docRef.id;

    } catch (error) {

        console.error(error);

        throw error;

    }

}


// ==================================================
// جلب فاتورة بواسطة رقم الفاتورة
// ==================================================

export async function getCustomerInvoice(
    invoiceId
) {

    const q = query(

        collection(
            db,
            "customer-invoices"
        ),

        where(
            "invoiceId",
            "==",
            invoiceId
        )

    );


    const snapshot =
        await getDocs(q);


    if (snapshot.empty) {

        return null;

    }


    return snapshot.docs[0].data();

}


// ==================================================
// جلب فاتورة بواسطة رقم الحجز
// ==================================================

export async function getCustomerInvoiceByBookingId(
    bookingId
) {

    const q = query(

        collection(
            db,
            "customer-invoices"
        ),

        where(
            "bookingId",
            "==",
            bookingId
        )

    );


    const snapshot =
        await getDocs(q);


    if (snapshot.empty) {

        return null;

    }


    return snapshot.docs[0].data();

}

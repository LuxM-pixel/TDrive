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
// ==================================================
// حفظ حجز برنامج احترفي القيادة على الطريق
// فحص جميع الحصص قبل الحفظ
// ==================================================

export async function saveBooking(bookings) {

    try {

        // التأكد أن البيانات عبارة عن قائمة حجوزات
        if (!Array.isArray(bookings) || bookings.length === 0) {

            throw new Error(
                "بيانات الحجز غير مكتملة."
            );

        }


        // ==================================================
        // فحص البيانات
        // ==================================================

        for (const booking of bookings) {

            if (
                !booking.instructorId ||
                !booking.trainingDate ||
                !booking.trainingTime
            ) {

                throw new Error(
                    "بيانات إحدى حصص الحجز غير مكتملة."
                );

            }

        }


        // ==================================================
        // فحص جميع الحصص قبل الحفظ
        // ==================================================

        for (const booking of bookings) {

            const q = query(

                collection(db, "bookings"),

                where(
                    "instructorId",
                    "==",
                    booking.instructorId
                ),

                where(
                    "trainingDate",
                    "==",
                    booking.trainingDate
                ),

                where(
                    "trainingTime",
                    "==",
                    booking.trainingTime
                )

            );


            const snapshot =
                await getDocs(q);


            if (!snapshot.empty) {

                throw new Error(
                    `الموعد ${booking.trainingTime} بتاريخ ${booking.trainingDate} محجوز مسبقًا لهذه المدربة.`
                );

            }

        }


        // ==================================================
        // جميع الحصص متاحة
        // الآن نحفظها
        // ==================================================

        const savedBookingIds = [];


        for (const booking of bookings) {

            const docRef =
                await addDoc(
                    collection(db, "bookings"),
                    booking
                );


            savedBookingIds.push(
                docRef.id
            );

        }


        console.log(
            "تم حفظ جميع الحصص:",
            savedBookingIds
        );


        return savedBookingIds;


    } catch (error) {

        console.error(
            "Firebase Booking Error:",
            error
        );

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
// الأوقات المحجوزة لمدربة محددة في تاريخ محدد
// ==================================================

export async function getInstructorBookedTimes(
    instructorId,
    trainingDate
) {

    if (!instructorId || !trainingDate) {
        return [];
    }

    const q = query(

        collection(db, "bookings"),

        where(
            "instructorId",
            "==",
            instructorId
        ),

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
// جلب بيانات الحجز بواسطة bookingId
// ==================================================

export async function getBookingByBookingId(bookingId) {

    if (!bookingId) {
        return null;
    }

    const q = query(

        collection(db, "bookings"),

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


    // الحجز الواحد يحتوي على 5 حصص
    // نأخذ الحصة الأولى لأنها تحتوي على
    // بيانات العميل وبيانات بداية التدريب

    const bookings =
        snapshot.docs.map(
            doc => ({
                id: doc.id,
                ...doc.data()
            })
        );


    bookings.sort(
        (a, b) =>
            Number(a.lessonNumber || 0) -
            Number(b.lessonNumber || 0)
    );


    return bookings[0];

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

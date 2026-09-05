import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";


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

const supabase = createClient(
    "https://ytesjbrtkqnjqqeoswkc.supabase.co",
    "sb_publishable_c8DXQsWq3W1-1Nm3LBSUvA_PVEkO87j"
);
// ==================================================
// احترفي القيادة على الطريق
// ==================================================
// ==================================================
// حفظ حجز برنامج احترفي القيادة على الطريق
// فحص جميع الحصص قبل الحفظ
// ==================================================

export async function saveBooking(bookings) {

    try {

        if (!Array.isArray(bookings) || bookings.length === 0) {

            throw new Error(
                "بيانات الحجز غير مكتملة."
            );

        }


        // ==================================================
        // التأكد من وجود بيانات المدربة والموعد
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
        // فحص تعارض الموعد
        // ==================================================

        for (const booking of bookings) {

            const { data: existingBookings, error } =
                await supabase
                    .from("bookings")
                    .select("id")
                    .eq(
                        "instructor_id",
                        booking.instructorId
                    )
                    .eq(
                        "training_date",
                        booking.trainingDate
                    )
                    .eq(
                        "training_time",
                        booking.trainingTime
                    );


            if (error) {

                console.error(
                    "Supabase Availability Error:",
                    error
                );

                throw new Error(
                    "تعذر التحقق من توفر الموعد."
                );

            }


            if (
                existingBookings &&
                existingBookings.length > 0
            ) {

                throw new Error(
                    `الموعد ${booking.trainingTime} بتاريخ ${booking.trainingDate} محجوز مسبقًا لهذه المدربة.`
                );

            }

        }


        // ==================================================
        // تجهيز الحجوزات لـ Supabase
        // ==================================================

        const rows = bookings.map(
            booking => ({

                booking_id:
                    booking.bookingId,

                lesson_number:
                    booking.lessonNumber,

                total_lessons:
                    booking.totalLessons,

                full_name:
                    booking.fullName,

                address:
                    booking.address,

                phone:
                    booking.phone,

                instructor_id:
                    booking.instructorId,

                training_date:
                    booking.trainingDate,

                training_time:
                    booking.trainingTime,

                price:
                    booking.price,

                status:
                    booking.status,

                created_at:
                    booking.createdAt

            })
        );


        // ==================================================
        // حفظ الحجوزات في Supabase
        // ==================================================

        const { data, error } =
            await supabase
                .from("bookings")
                .insert(rows)
                .select("id");


        if (error) {

            console.error(
                "Supabase Booking Error:",
                error
            );

            throw new Error(
                "تعذر حفظ الحجز: " +
                error.message
            );

        }


        const savedBookingIds =
            data?.map(
                row => row.id
            ) || [];


        console.log(
            "تم حفظ الحجز في Supabase:",
            savedBookingIds
        );


        return savedBookingIds;


    } catch (error) {

        console.error(
            "Booking Error:",
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


    const { data, error } =
        await supabase
            .from("bookings")
            .select("training_time")
            .eq(
                "instructor_id",
                instructorId
            )
            .eq(
                "training_date",
                trainingDate
            );


    if (error) {

        console.error(
            "Supabase Booked Times Error:",
            error
        );

        return [];

    }


    return (data || []).map(
        booking => booking.training_time
    );

}

// ==================================================
// جلب بيانات الحجز بواسطة bookingId
// ==================================================

export async function getBookingByBookingId(
    bookingId
) {

    if (!bookingId) {
        return null;
    }


    const { data, error } =
        await supabase
            .from("bookings")
            .select("*")
            .eq(
                "booking_id",
                bookingId
            );


    if (error) {

        console.error(
            "Supabase Get Booking Error:",
            error
        );

        return null;

    }


    if (!data || data.length === 0) {

        return null;

    }


    // ترتيب الحصص
    data.sort(
        (a, b) =>
            Number(a.lesson_number || 0) -
            Number(b.lesson_number || 0)
    );


    // نرجع الحصة الأولى
    return {

        id:
            data[0].id,

        bookingId:
            data[0].booking_id,

        lessonNumber:
            data[0].lesson_number,

        totalLessons:
            data[0].total_lessons,

        fullName:
            data[0].full_name,

        address:
            data[0].address,

        phone:
            data[0].phone,

        instructorId:
            data[0].instructor_id,

        trainingDate:
            data[0].training_date,

        trainingTime:
            data[0].training_time,

        price:
            data[0].price,

        status:
            data[0].status,

        createdAt:
            data[0].created_at

    };

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


// ==================================================
// إنشاء الرقم التالي للفاتورة
// ==================================================

export async function getNextInvoiceNumber() {

    const counterRef = doc(
        db,
        "counters",
        "customer-invoices"
    );

    const nextNumber = await runTransaction(
        db,
        async (transaction) => {

            const counterSnap =
                await transaction.get(
                    counterRef
                );

            let currentNumber = 0;

            if (counterSnap.exists()) {

                currentNumber =
                    Number(
                        counterSnap.data().lastNumber || 0
                    );

            }

            const newNumber =
                currentNumber + 1;

            transaction.set(
                counterRef,
                {
                    lastNumber: newNumber
                },
                {
                    merge: true
                }
            );

            return newNumber;

        }
    );

    return nextNumber;

}

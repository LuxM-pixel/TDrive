import { saveBooking } from "./firebase.js";

// نسخ الآيبان
window.copyIBAN = function () {
    const iban = document.getElementById("iban").value;
    navigator.clipboard.writeText(iban);
    alert("تم نسخ رقم الآيبان");
};

// نسخ الاسم
window.copyName = function () {
    const name = document.getElementById("name").value;
    navigator.clipboard.writeText(name);
    alert("تم نسخ اسم المستفيد");
};

const form = document.getElementById("bookingForm");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const trainingDate = document.getElementById("trainingDate").value;
    const trainingTime = document.getElementById("trainingTime").value;

    if (
        !fullName ||
        !phone ||
        !address ||
        !trainingDate
    ) {
        alert("يرجى تعبئة جميع البيانات");
        return;
    }

    const summary =
`تأكيد الحجز

👤 الاسم: ${fullName}

📱 الجوال: ${phone}

📍 العنوان: ${address}

📅 التاريخ: ${trainingDate}

🕒 الوقت: ${trainingTime}

💰 السعر: 375 ريال

هل تريد تأكيد الحجز؟`;

    if (!confirm(summary)) return;

    const booking = {
        fullName,
        phone,
        address,
        trainingDate,
        trainingTime,
        price: 375,
        status: "Pending Payment",
        createdAt: new Date().toISOString()
    };

    try {

        await saveBooking(booking);

        const message =
`السلام عليكم

أرغب بحجز دورة احترف القيادة على الطريق.

الاسم: ${fullName}

الجوال: ${phone}

العنوان: ${address}

التاريخ: ${trainingDate}

الوقت: ${trainingTime}

السعر: 375 ريال

وسأرسل إيصال التحويل الآن.`;

        alert("تم حفظ الحجز بنجاح");

        form.reset();

        window.open(
    "https://wa.me/966556117180?text=" +
    encodeURIComponent(message),
    "_blank"
);

    } catch (err) {

        console.error(err);

        alert("تعذر حفظ الحجز.");

    }

});

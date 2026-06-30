import { saveBooking } from "./firebase.js";
const ORIGINAL_PRICE = 500;
const OPENING_PRICE = 375;
const FIRST10_PRICE = 270;
// نسخ الآيبان
window.copyIBAN = function () {
  const input = document.getElementById("iban");
  if (!input) return;
  navigator.clipboard.writeText(input.value);
  alert("تم نسخ رقم الآيبان");
};

// نسخ الاسم
window.copyName = function () {
  const input = document.getElementById("name");
  if (!input) return;
  navigator.clipboard.writeText(input.value);
  alert("تم نسخ اسم المستفيد");
};

const form = document.getElementById("bookingForm");

if (form) {
  form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const address = document.getElementById("address").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const trainingDate = document.getElementById("trainingDate").value;
    const trainingTime = document.getElementById("trainingTime").value;

    if (!fullName || !address || !phone || !trainingDate) {
      alert("يرجى تعبئة جميع البيانات");
      return;
    }

    const summary = `

تأكيد التسجيل

👤 الاسم: ${fullName}

📱 الجوال: ${phone}

📍 العنوان: ${address}

📅 بداية التدريب: ${trainingDate}

🕒 الوقت: ${trainingTime}

💰 الرسوم: ${OPENING_PRICE} ريال

هل تريد تأكيد التسجيل؟

`;

    if (!confirm(summary)) return;

    const booking = {
      fullName,
      address,
      phone,
      trainingDate,
      trainingTime,
      price: OPENING_PRICE,
      status: "Pending Payment",
      createdAt: new Date().toISOString()
    };

    try {

 console.log("قبل الحفظ");

alert("قبل استدعاء saveBooking");

const id = await saveBooking(booking);

alert("رجعنا من saveBooking");

alert("تم التسجيل بنجاح");
          

      form.reset();

      const message = `السلام عليكم،

سجلت في دورة احترف القيادة.

👤 الاسم: ${fullName}
📱 الجوال: ${phone}

📅 تاريخ بداية التدريب: ${trainingDate}
🕒 وقت التدريب: ${trainingTime}

أرغب بالحصول على بيانات الحساب البنكي لإتمام دفع الرسوم.

شكراً لكم.`;

      window.location.href =
        "https://wa.me/966556117180?text=" +
        encodeURIComponent(message);

    } catch (error) {

      console.error(error);

      alert("تعذر حفظ الحجز، حاول مرة أخرى.");

    }

  });

}

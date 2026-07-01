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

// منع اختيار التواريخ الماضية
const dateInput = document.getElementById("trainingDate");

if (dateInput) {
alert(typeof AirDatepicker);
    new AirDatepicker("#trainingDate", {

        locale: {
            days: ['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'],
            daysShort: ['أحد','إثنين','ثلاثاء','أربعاء','خميس','جمعة','سبت'],
            daysMin: ['ح','ن','ث','ر','خ','ج','س'],
            months: ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'],
            monthsShort: ['ينا','فبر','مار','أبر','ماي','يون','يول','أغس','سبت','أكت','نوف','ديس'],
            today: 'اليوم',
            clear: 'مسح',
            dateFormat: 'yyyy-MM-dd',
            firstDay: 0
        },

        minDate: new Date(),

        autoClose: true,

        onBeforeSelect({ date }) {
            const day = date.getDay();
            return day !== 5 && day !== 6;
        }

    });

}
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

  const id = await saveBooking(booking);

  console.log("تم الحفظ برقم:", id);

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

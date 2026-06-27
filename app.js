// ======================
// TDrive App
// ======================

const form = document.getElementById("bookingForm");

function copyIBAN(){

const iban=document.getElementById("iban").value;

navigator.clipboard.writeText(iban);

alert("تم نسخ رقم الآيبان");

}

function copyName(){

const name=document.getElementById("name").value;

navigator.clipboard.writeText(name);

alert("تم نسخ اسم المستفيد");

}

window.copyIBAN=copyIBAN;

window.copyName=copyName;

form.addEventListener("submit",function(e){

e.preventDefault();

const fullName=document.getElementById("fullName").value.trim();

const phone=document.getElementById("phone").value.trim();

const address=document.getElementById("address").value.trim();

const trainingDate=document.getElementById("trainingDate").value;

const trainingTime=document.getElementById("trainingTime").value;

if(

fullName===""||

phone===""||

address===""||

trainingDate===""

){

alert("يرجى تعبئة جميع البيانات.");

return;

}
    const summary = `

تأكيد الحجز

====================

👤 الاسم:
${fullName}

📱 الجوال:
${phone}

📍 العنوان:
${address}

📅 التاريخ:
${trainingDate}

🕒 الوقت:
${trainingTime}

💰 السعر:
375 ريال

`;

const confirmBooking = confirm(summary + "\n\nهل تريد تأكيد الحجز؟");

if(!confirmBooking){

return;

}
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

// مؤقتاً نعرض البيانات في المتصفح
console.log("Booking:", booking);

// رسالة واتساب جاهزة
const message =
`السلام عليكم

أرغب بتأكيد حجز دورة احترف القيادة على الطريق.

الاسم: ${fullName}

الجوال: ${phone}

العنوان: ${address}

التاريخ: ${trainingDate}

الوقت: ${trainingTime}

السعر: 375 ريال

وسأرسل إيصال التحويل الآن.`;

// فتح الواتساب
window.open(
`https://wa.me/message/VDGPVTYNXF4EP1?text=${encodeURIComponent(message)}`,
"_blank"
);

alert("تم تسجيل بيانات الحجز بنجاح.");

form.reset();

});

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

if (form) {

form.addEventListener("submit", async function (e) {

e.preventDefault();

const fullName = document.getElementById("fullName").value.trim();
const address = document.getElementById("address").value.trim();
const phone = document.getElementById("phone").value.trim();
const trainingDate = document.getElementById("trainingDate").value;
const trainingTime = document.getElementById("trainingTime").value;

if (
!fullName ||
!address ||
!phone ||
!trainingDate
){

alert("يرجى تعبئة جميع البيانات");

return;

}

const summary = `
تأكيد الحجز

👤 الاسم: ${fullName}

📱 الجوال: ${phone}

📍 العنوان: ${address}

📅 بداية التدريب: ${trainingDate}

🕒 الوقت: ${trainingTime}

💰 السعر: 375 ريال

هل تريد تأكيد التسجيل؟
`;

if(!confirm(summary)) return;

const booking = {

fullName,

phone,

address,

trainingDate,

trainingTime,

price:375,

status:"Pending Payment",

createdAt:new Date().toISOString()

};
    try{

await saveBooking(booking);

const message = `السلام عليكم،

سجلت في دورة احترف القيادة.

👤 الاسم: ${fullName}
📱 الجوال: ${phone}

📅 تاريخ بداية التدريب: ${trainingDate}
🕒 وقت التدريب: ${trainingTime}

أرغب بالحصول على بيانات الحساب البنكي لإتمام دفع الرسوم.

شكراً لكم.`;

form.reset();

window.location.href =
"https://wa.me/966556117180?text=" +
encodeURIComponent(message);

}catch(error){

console.error(error);

alert("حدث خطأ أثناء حفظ الحجز، حاول مرة أخرى.");

}

});

}
// جعل الدوال متاحة عالمياً

window.copyIBAN = window.copyIBAN || function () {

const input = document.getElementById("iban");

if(!input) return;

navigator.clipboard.writeText(input.value);

alert("تم نسخ رقم الآيبان");

};

window.copyName = window.copyName || function () {

const input = document.getElementById("name");

if(!input) return;

navigator.clipboard.writeText(input.value);

alert("تم نسخ اسم المستفيد");

};

console.log("TDrive App Loaded Successfully ✅");

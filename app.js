import { saveBooking, saveReview, getApprovedReviews, getBookedTimes } from "./firebase.js";
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

        onRenderCell({ date, cellType }) {

    if (cellType === "day") {

        const day = date.getDay();

        if (day === 5 || day === 6) {

            return {
                disabled: true
            };

        }

    }

}

    });

}
const trainingTime = document.getElementById("trainingTime");

const allTimes = [
"08:00 - 09:00 صباحًا",
"10:00 - 11:00 صباحًا",
"12:00 - 01:00 ظهرًا",
"02:00 - 03:00 عصرًا"
];

async function updateAvailableTimes(){

    const selectedDate = dateInput.value;

    if(!selectedDate) return;

    const bookedTimes = await getBookedTimes(selectedDate);

    trainingTime.innerHTML =
    '<option value="">اختر وقت التدريب</option>';

    allTimes.forEach(time=>{

        if(!bookedTimes.includes(time)){

            trainingTime.innerHTML +=
            `<option>${time}</option>`;

        }

    });

}

if (dateInput) {
    dateInput.addEventListener("change", updateAvailableTimes);
}

if (form) {
  form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const address = document.getElementById("address").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const trainingDate = document.getElementById("trainingDate").value;
    const trainingTime = document.getElementById("trainingTime").value;

    if (!fullName || !address || !phone || !trainingDate || !trainingTime) {
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

try {

    const bookingId = "BK-" + Date.now();
const bookingsToSave = [];
    let currentDate = new Date(trainingDate);

    let lessonNumber = 1;

    while (lessonNumber <= 5) {

        const day = currentDate.getDay();

        // تخطي الجمعة والسبت
        if (day !== 5 && day !== 6) {

const bookingData = {

                bookingId,

                lessonNumber,

                totalLessons: 5,

                fullName,

                address,

                phone,

                trainingDate:
                    currentDate.toISOString().split("T")[0],

                trainingTime,

                price: OPENING_PRICE,

                status: "Pending Payment",

                createdAt: new Date().toISOString()

            };
bookingsToSave.push(bookingData);

            lessonNumber++;

        }

        currentDate.setDate(currentDate.getDate() + 1);

    }


    for (const bookingData of bookingsToSave) {

    const bookedTimes = await getBookedTimes(
        bookingData.trainingDate
    );

    if (bookedTimes.includes(bookingData.trainingTime)) {

        throw new Error(
            `يوجد حجز مسبق يوم ${bookingData.trainingDate} الساعة ${bookingData.trainingTime}`
        );

    }

}
  for (const bookingData of bookingsToSave) {

    await saveBooking(bookingData);


}
    console.log("تم حفظ جميع الحصص");

    alert("تم التسجيل بنجاح");

    await updateAvailableTimes();

    form.reset();

    trainingTime.innerHTML =
        '<option value="">اختر وقت التدريب</option>';

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

    alert(error.message);

}

 
  });

}

let selectedRating = 0;

const stars = document.querySelectorAll("#reviewStars span");

console.log("عدد النجوم:", stars.length);

if (stars.length > 0) {

    stars.forEach((star) => {

      star.addEventListener("click", function () {
    selectedRating = Number(this.dataset.rate);

    stars.forEach((s) => {
        if (Number(s.dataset.rate) <= selectedRating) {
            s.style.color = "#FFD700";
        } else {
            s.style.color = "#d0d0d0";
        }
    });
});


    });

}
const reviewForm = document.getElementById("reviewForm");

if (reviewForm) {

    reviewForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        if (selectedRating === 0) {

            alert("يرجى اختيار عدد النجوم.");

            return;

        }

        const program = document.getElementById("reviewProgram").value;
        const comment = document.getElementById("reviewComment").value;

        if (!program || !comment) {

            alert("يرجى تعبئة جميع الحقول.");

            return;

        }

        try {

            await saveReview({

                program,

                rating: selectedRating,

                comment,

                status: "pending",

                createdAt: new Date()

            });

            alert("🩵 شكرًا لتقييمك.\n\nتم استلام تقييمك بنجاح، ونقدّر وقتك ومشاركتك. سيساعدنا رأيك في تطوير خدمات TDrive.");

            reviewForm.reset();

            selectedRating = 0;

            stars.forEach((star) => {

                star.style.color = "#bbb";

            });

        } catch (error) {

            console.error(error);

            alert("حدث خطأ أثناء إرسال التقييم.");

        }

    });

}
const reviewsContainer = document.getElementById("reviewsContainer");

if (reviewsContainer) {

    loadReviews();

}

async function loadReviews() {

    try {

        const reviews = await getApprovedReviews();

        reviewsContainer.innerHTML = "";

        if (reviews.length === 0) {

            reviewsContainer.innerHTML = "<p>لا توجد تقييمات منشورة حتى الآن.</p>";

            return;

        }

        reviews.forEach((review) => {

            reviewsContainer.innerHTML += `
                <div class="review-card">
                    <div class="review-stars">${"⭐".repeat(review.rating)}</div>
                    <h4>${review.program}</h4>
                    <p>${review.comment}</p>
                </div>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}

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
const timeSlotsGrid = document.getElementById("timeSlotsGrid");

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

    trainingTime.value = "";
    timeSlotsGrid.innerHTML = "";

    allTimes.forEach(time=>{

        const isBooked = bookedTimes.includes(time);

        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "time-slot-btn";
        btn.textContent = time;

        if(isBooked){
            btn.disabled = true;
        } else {
            btn.addEventListener("click", function(){
                document.querySelectorAll(".time-slot-btn").forEach(b => b.classList.remove("selected"));
                this.classList.add("selected");
                trainingTime.value = time;
            });
        }

        timeSlotsGrid.appendChild(btn);

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

alert("تم التسجيل بنجاح، سيتم تحويلك لاختيار طريقة الدفع.");

sessionStorage.setItem("bookingId", bookingId);
sessionStorage.setItem("fullName", fullName);
sessionStorage.setItem("phone", phone);
sessionStorage.setItem("trainingDate", trainingDate);
sessionStorage.setItem("trainingTime", trainingTime);

window.location.href = "payment-method.html";

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

const tabButtons = document.querySelectorAll(".tab-btn");
const drivingPanel = document.getElementById("drivingPanel");
const captainPanel = document.getElementById("captainPanel");

tabButtons.forEach(btn => {

    btn.addEventListener("click", function(){

        const service = this.dataset.service;

        if(service === "car"){
            alert("قريبًا 🚗");
            return;
        }

        tabButtons.forEach(b => b.classList.remove("active"));
        this.classList.add("active");

        if(service === "driving"){
            drivingPanel.style.display = "block";
            captainPanel.style.display = "none";
        } else if(service === "captain"){
            drivingPanel.style.display = "none";
            captainPanel.style.display = "block";
        }

    });

});

// ========================================
// دورة الكابتن المحترف
// ========================================

const captainForm = document.getElementById("captainForm");

if (captainForm) {

    const captainNextBtn =
        document.getElementById("captainNextBtn");

    const captainBackBtn =
        document.getElementById("captainBackBtn");

    const captainSteps =
        document.querySelectorAll(".captain-form-step");


    // ========================================
    // الانتقال بين خطوات الكابتن
    // ========================================

    function goToCaptainStep(stepNumber) {

        captainSteps.forEach(step => {

            const stepValue =
                Number(step.dataset.captainStep);

            if (stepValue === stepNumber) {

                step.style.display = "block";

                step.classList.add("active");

            } else {

                step.style.display = "none";

                step.classList.remove("active");

            }

        });


        // تحديث دوائر الخطوات

        document
            .querySelectorAll(".captain-stepper .step-circle")
            .forEach(circle => {

                const number =
                    Number(circle.dataset.captainStep);

                circle.classList.toggle(
                    "active",
                    number === stepNumber
                );

                circle.classList.toggle(
                    "done",
                    number < stepNumber
                );

            });


        // تحديث الخط الفاصل

        document
            .querySelectorAll(".captain-stepper .step-line")
            .forEach((line, index) => {

                line.classList.toggle(
                    "active",
                    index < stepNumber - 1
                );

            });

    }


    // ========================================
    // الخطوة الأولى
    // التحقق من بيانات الكابتن
    // ========================================

    if (captainNextBtn) {

        captainNextBtn.addEventListener(
            "click",
            function () {

                const nameInput =
                    document.getElementById("captainName");

                const identityInput =
                    document.getElementById("captainId");

                const phoneInput =
                    document.getElementById("captainPhone");


                const name =
                    nameInput.value.trim();

                const identity =
                    identityInput.value.trim();

                const phone =
                    phoneInput.value.trim();


                // -------------------------------
                // التحقق من تعبئة البيانات
                // -------------------------------

                if (!name || !identity || !phone) {

                    alert(
                        "يرجى تعبئة جميع البيانات المطلوبة."
                    );

                    return;

                }


                // ========================================
                // الاسم: ثنائي أو ثلاثي فقط
                // ========================================

                const nameParts =
                    name.split(/\s+/).filter(Boolean);


                if (
                    nameParts.length < 2 ||
                    nameParts.length > 3
                ) {

                    alert(
                        "يرجى إدخال الاسم الثنائي أو الثلاثي فقط."
                    );

                    nameInput.focus();

                    return;

                }


                // منع الأرقام والرموز في الاسم

                const arabicNamePattern =
                    /^[\u0600-\u06FF\u0750-\u077F\s]+$/;


                if (!arabicNamePattern.test(name)) {

                    alert(
                        "يرجى إدخال الاسم باللغة العربية."
                    );

                    nameInput.focus();

                    return;

                }


                // ========================================
                // رقم الهوية
                // ========================================

                if (!/^\d{10}$/.test(identity)) {

                    alert(
                        "رقم الهوية يجب أن يتكون من 10 أرقام."
                    );

                    identityInput.focus();

                    return;

                }


                // ========================================
                // رقم الجوال
                // ========================================

                if (!/^05\d{8}$/.test(phone)) {

                    alert(
                        "يرجى إدخال رقم جوال صحيح يبدأ بـ 05 ويتكون من 10 أرقام."
                    );

                    phoneInput.focus();

                    return;

                }


                // ========================================
                // الانتقال إلى الخطوة الثانية
                // ========================================

                goToCaptainStep(2);

            }
        );

    }


    // ========================================
    // زر السابق
    // ========================================

    if (captainBackBtn) {

        captainBackBtn.addEventListener(
            "click",
            function () {

                goToCaptainStep(1);

            }
        );

    }


    // ========================================
    // اختيار طريقة الدفع
    // ========================================

    captainForm.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();


            const captainName =
                document
                    .getElementById("captainName")
                    .value
                    .trim();

            const captainId =
                document
                    .getElementById("captainId")
                    .value
                    .trim();

            const captainPhone =
                document
                    .getElementById("captainPhone")
                    .value
                    .trim();


            // ========================================
            // إنشاء رقم حجز خاص بالكابتن
            // ========================================

            const bookingId =
                "CPT-" + Date.now();


            // ========================================
            // حفظ بيانات التسجيل مؤقتًا
            // ========================================

            sessionStorage.setItem(
                "bookingId",
                bookingId
            );


            sessionStorage.setItem(
                "fullName",
                captainName
            );


            sessionStorage.setItem(
                "identityNumber",
                captainId
            );


            sessionStorage.setItem(
                "phone",
                captainPhone
            );


            sessionStorage.setItem(
                "program",
                "دورة الكابتن المحترف"
            );


            // لا يوجد موعد محدد حاليًا
            // سنضيف تاريخ ووقت الدورة لاحقًا

            sessionStorage.setItem(
                "trainingDate",
                ""
            );


            sessionStorage.setItem(
                "trainingTime",
                ""
            );


            // ========================================
            // بيانات السعر
            // ========================================

            sessionStorage.setItem(
                "originalPrice",
                "300"
            );


            sessionStorage.setItem(
                "discount",
                "66"
            );


            sessionStorage.setItem(
                "finalPrice",
                "100"
            );


            // ========================================
            // الانتقال إلى صفحة دفع الكابتن
            // ========================================

            window.location.href =
                "captain-payment-method.html";

        }
    );

}

// ============ Booking Stepper ============

const formSteps = document.querySelectorAll(".form-step");
const stepCircles = document.querySelectorAll(".step-circle");
const stepLines = document.querySelectorAll(".step-line");

function goToStep(stepNum){

    formSteps.forEach(step => {
        step.classList.toggle("active", Number(step.dataset.step) === stepNum);
    });

    stepCircles.forEach(circle => {
        const num = Number(circle.dataset.step);
        circle.classList.toggle("active", num === stepNum);
        circle.classList.toggle("done", num < stepNum);
    });

    stepLines.forEach((line, index) => {
        line.classList.toggle("active", index < stepNum - 1);
    });

}

document.querySelectorAll("[data-next]").forEach(btn => {

    btn.addEventListener("click", function(){

        const currentStep = this.closest(".form-step");
        const requiredInputs = currentStep.querySelectorAll("[required]");

        for (const input of requiredInputs) {
            if (!input.value.trim()) {
                alert("يرجى تعبئة جميع الحقول المطلوبة");
                input.focus();
                return;
            }
        }

        goToStep(Number(this.dataset.next));

    });

});

document.querySelectorAll("[data-back]").forEach(btn => {

    btn.addEventListener("click", function(){
        goToStep(Number(this.dataset.back));
    });

});

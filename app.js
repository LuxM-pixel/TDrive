/* ==================================================
   SUPABASE (بيانات المدربات)
================================================== */

const supabaseUrl = "https://ytesjbrtkqnjqqeoswkc.supabase.co";
const supabaseKey = "sb_publishable_c8DXQsWq3W1-1Nm3LBSUvA_PVEkO87j";
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);


import {
    saveBooking,
    saveReview,
    getApprovedReviews,
    getInstructorBookedTimes
} from "./firebase.js";

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
/* ==================================================
   BOOKING DATE & TIME
   مرتبط بالمدربة المختارة
================================================== */

const trainingTimeInput = document.getElementById("trainingTime");
const timeSlotsGrid = document.getElementById("timeSlotsGrid");
const dateInput = document.getElementById("trainingDate");

const allTimes = [
    "08:00 - 09:00 صباحًا",
    "10:00 - 11:00 صباحًا",
    "12:00 - 01:00 ظهرًا",
    "02:00 - 03:00 عصرًا"
];



/* ==================================================
   تحديث الأوقات المتاحة للمدربة المختارة
================================================== */

async function updateAvailableTimes() {

    const selectedDate = dateInput?.value;
    const instructorId = selectedTrainerInput?.value;

    if (!selectedDate || !instructorId) {

        if (timeSlotsGrid) {
            timeSlotsGrid.innerHTML = `
                <p style="
                    text-align:center;
                    color:#8b999f;
                    font-size:13px;
                    width:100%;
                ">
                    اختاري المدربة أولًا ثم اختاري التاريخ.
                </p>
            `;
        }

        return;
    }


    trainingTimeInput.value = "";

    timeSlotsGrid.innerHTML = `
        <p style="
            text-align:center;
            color:#8b999f;
            font-size:13px;
            width:100%;
        ">
            جاري التحقق من المواعيد...
        </p>
    `;


    try {

        /*
          مهم:
          هنا نتحقق من حجوزات المدربة المحددة فقط.
        */

        const bookedTimes =
            await getInstructorBookedTimes(
                instructorId,
                selectedDate
            );


        timeSlotsGrid.innerHTML = "";


        allTimes.forEach(time => {

            const isBooked =
                bookedTimes.includes(time);


            const btn =
                document.createElement("button");


            btn.type = "button";

            btn.className =
                "time-slot-btn";

            btn.textContent =
                isBooked
                    ? `${time} - محجوز`
                    : time;


            if (isBooked) {

                btn.disabled = true;

                btn.classList.add("booked");

            } else {

                btn.addEventListener(
                    "click",
                    function () {

                        document
                            .querySelectorAll(".time-slot-btn")
                            .forEach(b =>
                                b.classList.remove("selected")
                            );


                        this.classList.add("selected");


                        trainingTimeInput.value =
                            time;

                    }
                );

            }


            timeSlotsGrid.appendChild(btn);

        });


    } catch (error) {

        console.error(
            "Error loading instructor availability:",
            error
        );


        timeSlotsGrid.innerHTML = `
            <p style="
                text-align:center;
                color:#c0392b;
                font-size:13px;
                width:100%;
            ">
                تعذر تحميل المواعيد المتاحة.
            </p>
        `;

    }

}


/* ==================================================
   عند تغيير التاريخ
================================================== */

if (dateInput) {

    dateInput.addEventListener(
        "change",
        updateAvailableTimes
    );

}


/* ==================================================
   عند اختيار المدربة
   نعيد تحميل أوقات المدربة
================================================== */

function refreshTrainerSchedule() {

    trainingTimeInput.value = "";

    if (dateInput) {
        dateInput.value = "";
    }

    if (timeSlotsGrid) {

        timeSlotsGrid.innerHTML = `
            <p style="
                text-align:center;
                color:#8b999f;
                font-size:13px;
                width:100%;
            ">
                اختاري تاريخ التدريب لعرض المواعيد المتاحة.
            </p>
        `;

    }

}


/* ==================================================
   الحجز
================================================== */

if (form) {

    form.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();


            const fullName =
                document
                    .getElementById("fullName")
                    .value
                    .trim();


            const address =
                document
                    .getElementById("address")
                    .value
                    .trim();


            const phone =
                document
                    .getElementById("phone")
                    .value
                    .trim();


            const trainingDate =
                document
                    .getElementById("trainingDate")
                    .value;


            const trainingTime =
                document
                    .getElementById("trainingTime")
                    .value;


            /* ===============================
               المدربة المختارة
            =============================== */

            const instructorId =
                selectedTrainerInput.value;


            if (
                !fullName ||
                !address ||
                !phone ||
                !instructorId ||
                !trainingDate ||
                !trainingTime
            ) {

                alert(
                    "يرجى تعبئة جميع البيانات واختيار المدربة والموعد."
                );

                return;

            }


            /* ===============================
               الحصول على بيانات المدربة
            =============================== */

            const selectedInstructor =
                loadedInstructors.find(
                    instructor =>
                        String(instructor.instructor_id) ===
                        String(instructorId)
                );


            if (!selectedInstructor) {

                alert(
                    "تعذر العثور على بيانات المدربة المختارة."
                );

                return;

            }


            const instructorName =
                selectedInstructor.full_name || "";


            /* ===============================
               التأكيد
            =============================== */

            const summary = `

تأكيد التسجيل

👤 الاسم: ${fullName}

📱 الجوال: ${phone}

📍 المدينة: ${address}

👩🏻‍🏫 المدربة: أ. ${instructorName}

📅 بداية التدريب: ${trainingDate}

🕒 الوقت: ${trainingTime}

💰 الرسوم: ${OPENING_PRICE} ريال

هل تريد تأكيد التسجيل؟

`;


            if (!confirm(summary)) {
                return;
            }


            try {

                const bookingId =
                    "BK-" + Date.now();


                const bookingsToSave = [];


                let currentDate =
                    new Date(trainingDate);


                let lessonNumber = 1;


                /* ===============================
                   إنشاء 5 حصص
                =============================== */

                while (lessonNumber <= 5) {

                    const day =
                        currentDate.getDay();


                    // تخطي الجمعة والسبت

                    if (
                        day !== 5 &&
                        day !== 6
                    ) {

                        const lessonDate =
                            currentDate
                                .toISOString()
                                .split("T")[0];


                        const bookingData = {

                            bookingId,

                            lessonNumber,

                            totalLessons: 5,

                            fullName,

                            address,

                            phone,

                            /* =========================
                               المدربة
                            ========================= */

                            instructorId,

                            instructorName,


                            /* =========================
                               الموعد
                            ========================= */

                            trainingDate:
                                lessonDate,

                            trainingTime,


                            price:
                                OPENING_PRICE,


                            status:
                                "Pending Payment",


                            createdAt:
                                new Date().toISOString()

                        };


                        bookingsToSave.push(
                            bookingData
                        );


                        lessonNumber++;

                    }


                    currentDate.setDate(
                        currentDate.getDate() + 1
                    );

                }


                /* ===============================
                   حفظ الحجوزات
                   سيتم ربط saveBooking
                   بالجدول الجديد في firebase.js
                =============================== */

            await saveBooking(bookingsToSave);


                console.log(
                    "تم حفظ جميع الحصص للمدربة:",
                    instructorName
                );


                /* ===============================
                   بيانات الدفع
                =============================== */

                sessionStorage.setItem(
                    "bookingId",
                    bookingId
                );


                sessionStorage.setItem(
                    "fullName",
                    fullName
                );


                sessionStorage.setItem(
                    "phone",
                    phone
                );


                sessionStorage.setItem(
                    "trainingDate",
                    trainingDate
                );


                sessionStorage.setItem(
                    "trainingTime",
                    trainingTime
                );


                /* ===============================
                   حفظ المدربة
                =============================== */

                sessionStorage.setItem(
                    "instructorId",
                    instructorId
                );


                sessionStorage.setItem(
                    "instructorName",
                    instructorName
                );


                alert(
                    "تم التسجيل بنجاح، سيتم تحويلك لاختيار طريقة الدفع."
                );


                window.location.href =
                    "payment-method.html";


            } catch (error) {

                console.error(
                    "Booking error:",
                    error
                );


                alert(
                    error.message ||
                    "حدث خطأ أثناء حفظ التسجيل."
                );

            }

        }
    );

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


    function goToCaptainStep(stepNumber) {

        captainSteps.forEach(step => {

            const stepValue =
                Number(step.dataset.captainStep);

            step.style.display =
                stepValue === stepNumber
                    ? "block"
                    : "none";

            step.classList.toggle(
                "active",
                stepValue === stepNumber
            );

        });


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
    // التالي
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


                // الاسم باللغة العربية فقط

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

alert(
    "قريبًا سينطلق التسجيل 🩵\n\n" +
    "سيتم فتح التسجيل في دورة الكابتن المحترف قريبًا.\n" +
    "تابعنا لمعرفة موعد بدء التسجيل."
);

            }
        );

    }


    // ========================================
    // السابق
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


            // رقم حجز خاص بالكابتن

            const bookingId =
                "CPT-" + Date.now();


            // حفظ البيانات

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


            // لا يوجد موعد للكابتن حاليًا

            sessionStorage.setItem(
                "trainingDate",
                ""
            );

            sessionStorage.setItem(
                "trainingTime",
                ""
            );


            // السعر

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


            // صفحة دفع الكابتن

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

/* ==================================================
   TRAINER SELECTION (ديناميكي حسب المدينة)
================================================== */

const trainerListBox = document.getElementById("trainerList");
const selectedTrainerInput = document.getElementById("selectedTrainer");
const cityInput = document.getElementById("address");

let loadedInstructors = [];

async function loadInstructorsByCity(city) {

  if (!trainerListBox) return;

  trainerListBox.innerHTML = `
    <p style="text-align:center; color:#8b999f; font-size:13px;">
      جاري تحميل المدربات...
    </p>
  `;

  try {

    const { data, error } =
      await supabaseClient
        .from("instructors")
        .select("*")
        .eq("city", city)
        .eq("status", "active");

    if (error) throw error;

    loadedInstructors = data || [];

    if (loadedInstructors.length === 0) {
      trainerListBox.innerHTML = `
        <p style="text-align:center; color:#8b999f; font-size:13px;">
          لا توجد مدربات متاحات في مدينتك حاليًا.
        </p>
      `;
      return;
    }

    trainerListBox.innerHTML = loadedInstructors.map(instructor => `
      <div class="trainer-card" data-trainer-id="${instructor.instructor_id}">
        <div class="trainer-select-mark">✓</div>
        <div class="trainer-illustration">
          <div class="trainer-placeholder">TDrive</div>
        </div>
        <div class="trainer-info">
          <h5>أ. ${instructor.full_name || "مدربة"}</h5>
          <span class="trainer-role">مدربة معتمدة في TDrive</span>
          <div class="trainer-audio">
            <button type="button" class="audio-play-btn" data-audio-for="${instructor.instructor_id}" aria-label="تشغيل التسجيل الصوتي">
              <i class="fa-solid fa-play"></i>
            </button>
            <div class="audio-content">
              <strong>استمعي لتعريف المدربة</strong>
            </div>
          </div>
          <audio id="audio_${instructor.instructor_id}" preload="none"></audio>
        </div>
        <label class="trainer-radio-option">
          <input type="radio" name="selectedTrainer" value="${instructor.instructor_id}">
          <span class="custom-radio"></span>
          <span>اختيار المدربة</span>
        </label>
      </div>
    `).join("");

    attachTrainerCardEvents();

  } catch (error) {
    console.error("Load instructors error:", error);
    trainerListBox.innerHTML = `
      <p style="text-align:center; color:#8b999f; font-size:13px;">
        تعذر تحميل قائمة المدربات.
      </p>
    `;
  }

}

function attachTrainerCardEvents() {

  document.querySelectorAll(".trainer-card").forEach(card => {

    card.addEventListener("click", function (event) {

      if (event.target.closest(".audio-play-btn")) return;

      document.querySelectorAll(".trainer-card").forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");

      selectedTrainerInput.value = card.dataset.trainerId;
refreshTrainerSchedule();
    });

  });

  document.querySelectorAll(".audio-play-btn").forEach(btn => {

    btn.addEventListener("click", async function (event) {

      event.stopPropagation();

      const instructorId = btn.dataset.audioFor;
      const audioEl = document.getElementById(`audio_${instructorId}`);
      if (!audioEl) return;

      if (!audioEl.src) {

        const instructor = loadedInstructors.find(i => i.instructor_id === instructorId);
        if (!instructor || !instructor.voice_recording_path) return;

        const { data: signed } =
          await supabaseClient
            .storage
            .from("instructor-documents")
            .createSignedUrl(instructor.voice_recording_path, 3600);

        if (signed?.signedUrl) audioEl.src = signed.signedUrl;
      }

      if (audioEl.paused) {
        audioEl.play();
        btn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      } else {
        audioEl.pause();
        btn.innerHTML = '<i class="fa-solid fa-play"></i>';
      }

      audioEl.onended = () => {
        btn.innerHTML = '<i class="fa-solid fa-play"></i>';
      };

    });

  });

}

document.querySelectorAll('[data-next="2"]').forEach(btn => {
  btn.addEventListener("click", () => {
    const currentStep = btn.closest(".form-step");
    const requiredInputs = currentStep.querySelectorAll("[required]");

    for (const input of requiredInputs) {
      if (!input.value.trim()) {
        alert("يرجى تعبئة جميع الحقول المطلوبة");
        input.focus();
        return;
      }
    }

    const city = cityInput.value.trim();
    if (city) {
      loadInstructorsByCity(city);
    }

    goToStep(2);
  });
});

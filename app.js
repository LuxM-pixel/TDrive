/* ==================================================
   TDRIVE BOOKING SYSTEM
   SUPABASE + BOOKING + TRAINERS + REVIEWS
================================================== */


/* ==================================================
   SUPABASE
   بيانات المدربات + جداول المدربات
================================================== */

const supabaseUrl =
    "https://ytesjbrtkqnjqqeoswkc.supabase.co";

const supabaseKey =
    "sb_publishable_c8DXQsWq3W1-1Nm3LBSUvA_PVEkO87j";

const supabaseClient =
    window.supabase.createClient(
        supabaseUrl,
        supabaseKey
    );

/* ==================================================
   SUPABASE - مشروع دورة الكابتن (TDrive Captain)
================================================== */

const captainSupabaseUrl =
    "https://sbevfklawymyducaqerb.supabase.co";

const captainSupabaseKey =
    "sb_publishable_ZpiNxVUY26CHEAZoNPCX6g_8N5tOcP2";

const captainSupabaseClient =
    window.supabase.createClient(
        captainSupabaseUrl,
        captainSupabaseKey
    );

/* ==================================================
   FIREBASE
================================================== */

import {
    saveBooking,
    saveReview,
    getApprovedReviews,
    getInstructorBookedTimes
} from "./firebase.js";


/* ==================================================
   الأسعار
================================================== */

const OPENING_PRICE = 375;


/* ==================================================
   عناصر الحجز
================================================== */

const form =
    document.getElementById("bookingForm");

const dateInput =
    document.getElementById("trainingDate");

const trainingTimeInput =
    document.getElementById("trainingTime");

const timeSlotsGrid =
    document.getElementById("timeSlotsGrid");

const trainerListBox =
    document.getElementById("trainerList");

const selectedTrainerInput =
    document.getElementById("selectedTrainer");

const cityInput =
    document.getElementById("address");


let loadedInstructors = [];


/* ==================================================
   أدوات مساعدة
================================================== */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function formatLocalDate(date) {

    const year =
        date.getFullYear();

    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            date.getDate()
        ).padStart(2, "0");

    return `${year}-${month}-${day}`;

}


function createLocalDate(dateString) {

    const parts =
        String(dateString)
            .split("-")
            .map(Number);

    if (parts.length !== 3) {
        return null;
    }

    const [
        year,
        month,
        day
    ] = parts;

    const date =
        new Date(
            year,
            month - 1,
            day
        );

    if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
    ) {
        return null;
    }

    return date;

}


function normalizeTime(time) {

    return String(time ?? "")
        .trim()
        .replace(/\s+/g, " ");

}


/* ==================================================
   نسخ الآيبان
================================================== */

window.copyIBAN = async function () {

    const input =
        document.getElementById("iban");

    if (!input) return;

    try {

        await navigator.clipboard.writeText(
            input.value
        );

        alert("تم نسخ رقم الآيبان");

    } catch (error) {

        console.error(
            "Clipboard error:",
            error
        );

        input.select();

        document.execCommand("copy");

        alert("تم نسخ رقم الآيبان");

    }

};


/* ==================================================
   نسخ اسم المستفيد
================================================== */

window.copyName = async function () {

    const input =
        document.getElementById("name");

    if (!input) return;

    try {

        await navigator.clipboard.writeText(
            input.value
        );

        alert("تم نسخ اسم المستفيد");

    } catch (error) {

        console.error(
            "Clipboard error:",
            error
        );

        input.select();

        document.execCommand("copy");

        alert("تم نسخ اسم المستفيد");

    }

};


/* ==================================================
   DATEPICKER
   منع التواريخ الماضية
   منع الجمعة والسبت
================================================== */

if (
    dateInput &&
    typeof AirDatepicker !== "undefined"
) {

    new AirDatepicker(
        "#trainingDate",
        {

            locale: {

                days: [
                    "الأحد",
                    "الإثنين",
                    "الثلاثاء",
                    "الأربعاء",
                    "الخميس",
                    "الجمعة",
                    "السبت"
                ],

                daysShort: [
                    "أحد",
                    "إثنين",
                    "ثلاثاء",
                    "أربعاء",
                    "خميس",
                    "جمعة",
                    "سبت"
                ],

                daysMin: [
                    "ح",
                    "ن",
                    "ث",
                    "ر",
                    "خ",
                    "ج",
                    "س"
                ],

                months: [
                    "يناير",
                    "فبراير",
                    "مارس",
                    "أبريل",
                    "مايو",
                    "يونيو",
                    "يوليو",
                    "أغسطس",
                    "سبتمبر",
                    "أكتوبر",
                    "نوفمبر",
                    "ديسمبر"
                ],

                monthsShort: [
                    "ينا",
                    "فبر",
                    "مار",
                    "أبر",
                    "ماي",
                    "يون",
                    "يول",
                    "أغس",
                    "سبت",
                    "أكت",
                    "نوف",
                    "ديس"
                ],

                today: "اليوم",

                clear: "مسح",

                dateFormat: "yyyy-MM-dd",

                firstDay: 0

            },

            minDate: new Date(),

            autoClose: true,

            onRenderCell({
                date,
                cellType
            }) {

                if (
                    cellType === "day"
                ) {

                    const day =
                        date.getDay();

                    if (
                        day === 5 ||
                        day === 6
                    ) {

                        return {
                            disabled: true
                        };

                    }

                }

            }

        }
    );

}


/* ==================================================
   أسماء أيام الأسبوع
================================================== */

function getArabicDayName(
    dayNumber
) {

    const days = [

        "الأحد",
        "الإثنين",
        "الثلاثاء",
        "الأربعاء",
        "الخميس",
        "الجمعة",
        "السبت"

    ];

    return days[dayNumber] || "";

}


function getTimesForInstructorDate(instructor, selectedDate) {

    if (!instructor || !selectedDate) {
        return [];
    }

    const date = createLocalDate(selectedDate);

    if (!date) {
        return [];
    }

    const schedule = instructor.available_training_times;

    if (!schedule || typeof schedule !== "object" || Array.isArray(schedule)) {
        return [];
    }

    if (!schedule.startDate) {
        return [];
    }

    const startDate = createLocalDate(schedule.startDate);

    if (!startDate) {
        return [];
    }

    const duration = Number(schedule.durationDays) || 30;

    const diffDays = Math.round(
        (date - startDate) / (1000 * 60 * 60 * 24)
    );

    if (diffDays < 0 || diffDays >= duration) {
        return [];
    }

    const dayNumber = date.getDay();

    const workDays = Array.isArray(schedule.workDays)
        ? schedule.workDays.map(Number)
        : [];

    if (!workDays.includes(dayNumber)) {
        return [];
    }

    const hours = Array.isArray(schedule.selectedHourLabels)
        ? schedule.selectedHourLabels
        : [];

    return hours.map(normalizeTime).filter(Boolean);

}



/* ==================================================
   الحصول على المدربة
================================================== */

function findInstructor(
    instructorId
) {

    return loadedInstructors.find(
        instructor =>
            String(
                instructor.instructor_id
            ) ===
            String(
                instructorId
            )
    );

}


/* ==================================================
   عرض رسالة داخل جدول الأوقات
================================================== */

function showTimeMessage(
    message,
    color = "#8b999f"
) {

    if (!timeSlotsGrid) {
        return;
    }

    timeSlotsGrid.innerHTML = `

        <p style="
            text-align:center;
            color:${color};
            font-size:13px;
            width:100%;
        ">

            ${escapeHTML(message)}

        </p>

    `;

}


/* ==================================================
   تحديث الأوقات المتاحة
================================================== */

async function updateAvailableTimes() {

    const selectedDate =
        dateInput?.value?.trim();

    const instructorId =
        selectedTrainerInput?.value?.trim();

    if (
        trainingTimeInput
    ) {

        trainingTimeInput.value = "";

    }

    if (
        !selectedDate ||
        !instructorId
    ) {

        showTimeMessage(
            "اختاري المدربة أولًا ثم اختاري التاريخ."
        );

        return;

    }

    showTimeMessage(
        "جاري التحقق من المواعيد..."
    );

    try {

        const instructor =
            findInstructor(
                instructorId
            );

        if (!instructor) {

            throw new Error(
                "تعذر العثور على بيانات المدربة."
            );

        }

        const instructorTimes =
            getTimesForInstructorDate(
                instructor,
                selectedDate
            );

        if (
            instructorTimes.length === 0
        ) {

            showTimeMessage(
                "المدربة غير متاحة في هذا اليوم."
            );

            return;

        }

        let bookedTimes = [];

        try {

            bookedTimes =
                await getInstructorBookedTimes(
                    instructorId,
                    selectedDate
                );

        } catch (error) {

            console.error(
                "تعذر تحميل الحجوزات:",
                error
            );

            showTimeMessage(
                "تعذر التحقق من المواعيد المحجوزة. حاولي مرة أخرى.",
                "#c0392b"
            );

            return;

        }

        bookedTimes =
            Array.isArray(bookedTimes)
                ? bookedTimes.map(normalizeTime)
                : [];

        if (timeSlotsGrid) {

            timeSlotsGrid.innerHTML = "";

        }

        instructorTimes.forEach(
            time => {

                const normalizedTime =
                    normalizeTime(time);

                const isBooked =
                    bookedTimes.includes(
                        normalizedTime
                    );

                const btn =
                    document.createElement(
                        "button"
                    );

                btn.type =
                    "button";

                btn.className =
                    "time-slot-btn";

                btn.textContent =
                    isBooked
                        ? `${normalizedTime} - محجوز`
                        : normalizedTime;

                if (isBooked) {

                    btn.disabled =
                        true;

                    btn.classList.add(
                        "booked"
                    );

                } else {

                    btn.addEventListener(
                        "click",
                        function () {

                            document
                                .querySelectorAll(
                                    ".time-slot-btn"
                                )
                                .forEach(
                                    button =>
                                        button.classList.remove(
                                            "selected"
                                        )
                                );

                            this.classList.add(
                                "selected"
                            );

                            if (
                                trainingTimeInput
                            ) {

                                trainingTimeInput.value =
                                    normalizedTime;

                            }

                        }
                    );

                }

                timeSlotsGrid.appendChild(
                    btn
                );

            }
        );

    } catch (error) {

        console.error(
            "Error loading instructor schedule:",
            error
        );

        showTimeMessage(
            "تعذر تحميل مواعيد المدربة.",
            "#c0392b"
        );

    }

}


/* ==================================================
   تغيير التاريخ
================================================== */

if (dateInput) {

    dateInput.addEventListener(
        "change",
        updateAvailableTimes
    );

}


/* ==================================================
   عند تغيير المدربة
================================================== */

function refreshTrainerSchedule() {

    if (
        trainingTimeInput
    ) {

        trainingTimeInput.value = "";

    }

    if (
        dateInput
    ) {

        dateInput.value = "";

    }

    showTimeMessage(
        "اختاري تاريخ التدريب لعرض مواعيد المدربة."
    );

}


/* ==================================================
   تحميل المدربات حسب المدينة
================================================== */

async function loadInstructorsByCity(
    city
) {

    if (!trainerListBox) {
        return;
    }

    const cleanCity =
        String(city || "").trim();

    if (!cleanCity) {

        trainerListBox.innerHTML = `
            <p style="
                text-align:center;
                color:#8b999f;
                font-size:13px;
            ">
                اختاري مدينة التدريب أولًا.
            </p>
        `;

        return;

    }

    trainerListBox.innerHTML = `
        <p style="
            text-align:center;
            color:#8b999f;
            font-size:13px;
        ">
            جاري تحميل المدربات...
        </p>
    `;

    loadedInstructors = [];

    if (
        selectedTrainerInput
    ) {

        selectedTrainerInput.value = "";

    }

    try {

        const {
            data,
            error
        } =
            await supabaseClient
                .from("instructors")
                .select("*")
                .eq("city", cleanCity)
                .eq("status", "active");

        if (error) {
            throw error;
        }

        loadedInstructors =
            Array.isArray(data)
                ? data
                : [];

        if (
            loadedInstructors.length === 0
        ) {

            trainerListBox.innerHTML = `
                <p style="
                    text-align:center;
                    color:#8b999f;
                    font-size:13px;
                ">
                    لا توجد مدربات متاحات في مدينتك حاليًا.
                </p>
            `;

            return;

        }

        trainerListBox.innerHTML =
            loadedInstructors
                .map(
                    instructor => {

                        const instructorId =
                            escapeHTML(
                                instructor.instructor_id
                            );

                        const instructorName =
                            escapeHTML(
                                instructor.full_name ||
                                "مدربة"
                            );

                        return `

                            <div
                                class="trainer-card"
                                data-trainer-id="${instructorId}"
                            >

                                <div class="trainer-select-mark">
                                    ✓
                                </div>

                                <div class="trainer-illustration">

                                    <div class="trainer-placeholder">
                                        TDrive
                                    </div>

                                </div>

                                <div class="trainer-info">

                                    <h5>
                                        أ. ${instructorName}
                                    </h5>

                                   <span class="trainer-role">
    مؤسس TDrive
</span>

                                    <div class="trainer-audio">

                                        <button
                                            type="button"
                                            class="audio-play-btn"
                                            data-audio-for="${instructorId}"
                                            aria-label="تشغيل التسجيل الصوتي"
                                        >

                                            <i class="fa-solid fa-play"></i>

                                        </button>

                                        <div class="audio-content">

                                            <strong>
                                                استمعي لتعريف المدربة
                                            </strong>

                                        </div>

                                    </div>

                                    <audio
                                        id="audio_${instructorId}"
                                        preload="none"
                                    ></audio>

                                </div>

                                <label class="trainer-radio-option">

                                    <input
                                        type="radio"
                                        name="selectedTrainer"
                                        value="${instructorId}"
                                    >

                                    <span class="custom-radio"></span>

                                    <span>
                                        اختيار المدربة
                                    </span>

                                </label>

                            </div>

                        `;

                    }
                )
                .join("");

        attachTrainerCardEvents();

    } catch (error) {

        console.error(
            "Load instructors error:",
            error
        );

        loadedInstructors = [];

        trainerListBox.innerHTML = `
            <p style="
                text-align:center;
                color:#c0392b;
                font-size:13px;
            ">
                تعذر تحميل قائمة المدربات.
            </p>
        `;

    }

}


/* ==================================================
   أحداث بطاقات المدربات
================================================== */

function attachTrainerCardEvents() {

    if (!trainerListBox) {
        return;
    }

    trainerListBox
        .querySelectorAll(
            ".trainer-card"
        )
        .forEach(
            card => {

                card.addEventListener(
                    "click",
                    function (event) {

                        if (
                            event.target.closest(
                                ".audio-play-btn"
                            )
                        ) {

                            return;

                        }

                        trainerListBox
                            .querySelectorAll(
                                ".trainer-card"
                            )
                            .forEach(
                                otherCard =>
                                    otherCard.classList.remove(
                                        "selected"
                                    )
                            );

                        card.classList.add(
                            "selected"
                        );

                        const trainerId =
                            card.dataset.trainerId;

                        if (
                            selectedTrainerInput
                        ) {

                            selectedTrainerInput.value =
                                trainerId;

                        }

                        const radio =
                            card.querySelector(
                                'input[type="radio"]'
                            );

                        if (radio) {

                            radio.checked =
                                true;

                        }

                        refreshTrainerSchedule();

                    }
                );

            }
        );


    trainerListBox
        .querySelectorAll(
            ".audio-play-btn"
        )
        .forEach(
            btn => {

                btn.addEventListener(
                    "click",
                    async function (event) {

                        event.stopPropagation();

                        const instructorId =
                            String(
                                btn.dataset.audioFor
                            );

                        const audioEl =
                            document.getElementById(
                                `audio_${instructorId}`
                            );

                        if (!audioEl) {
                            return;
                        }

                        try {

                            if (
                                !audioEl.src
                            ) {

                                const instructor =
                                    loadedInstructors.find(
                                        item =>
                                            String(
                                                item.instructor_id
                                            ) ===
                                            instructorId
                                    );

                                if (
                                    !instructor ||
                                    !instructor.voice_recording_path
                                ) {

                                    alert(
                                        "لا يوجد تسجيل صوتي لهذه المدربة حاليًا."
                                    );

                                    return;

                                }

                                const {
                                    data: signed,
                                    error
                                } =
                                    await supabaseClient
                                        .storage
                                        .from(
                                            "instructor-documents"
                                        )
                                        .createSignedUrl(
                                            instructor.voice_recording_path,
                                            3600
                                        );

                                if (error) {
                                    throw error;
                                }

                                if (
                                    signed?.signedUrl
                                ) {

                                    audioEl.src =
                                        signed.signedUrl;

                                } else {

                                    throw new Error(
                                        "تعذر إنشاء رابط التسجيل الصوتي."
                                    );

                                }

                            }

                            if (
                                audioEl.paused
                            ) {

                                await audioEl.play();

                                btn.innerHTML =
                                    '<i class="fa-solid fa-pause"></i>';

                            } else {

                                audioEl.pause();

                                btn.innerHTML =
                                    '<i class="fa-solid fa-play"></i>';

                            }

                            audioEl.onended =
                                function () {

                                    btn.innerHTML =
                                        '<i class="fa-solid fa-play"></i>';

                                };

                        } catch (error) {

                            console.error(
                                "Audio error:",
                                error
                            );

                            alert(
                                "تعذر تشغيل التسجيل الصوتي."
                            );

                        }

                    }
                );

            }
        );

}


/* ==================================================
   BOOKING STEPPER
================================================== */

const formSteps =
    document.querySelectorAll(
        ".form-step"
    );

const stepCircles =
    document.querySelectorAll(
        ".step-circle[data-step]"
    );

const stepLines =
    document.querySelectorAll(
        ".step-line"
    );


function goToStep(
    stepNum
) {

    formSteps.forEach(
        step => {

            step.classList.toggle(
                "active",
                Number(
                    step.dataset.step
                ) === stepNum
            );

        }
    );

    stepCircles.forEach(
        circle => {

            const num =
                Number(
                    circle.dataset.step
                );

            circle.classList.toggle(
                "active",
                num === stepNum
            );

            circle.classList.toggle(
                "done",
                num < stepNum
            );

        }
    );

    stepLines.forEach(
        (line, index) => {

            if (
                line.closest(
                    ".captain-stepper"
                )
            ) {

                return;

            }

            line.classList.toggle(
                "active",
                index < stepNum - 1
            );

        }
    );

}


/* ==================================================
   التحقق من الحقول المطلوبة
================================================== */

function validateStep(
    currentStep
) {

    if (!currentStep) {
        return false;
    }

    const requiredInputs =
        currentStep.querySelectorAll(
            "[required]"
        );

    for (
        const input
        of requiredInputs
    ) {

        if (
            !String(
                input.value || ""
            ).trim()
        ) {

            alert(
                "يرجى تعبئة جميع الحقول المطلوبة."
            );

            input.focus();

            return false;

        }

    }

    return true;

}

/* ==================================================
   التقييمات
================================================== */

let selectedRating = 0;


const stars =
    document.querySelectorAll(
        "#reviewStars span"
    );


console.log(
    "عدد النجوم:",
    stars.length
);


if (
    stars.length > 0
) {

    stars.forEach(
        star => {

            star.addEventListener(
                "click",
                function () {

                    selectedRating =
                        Number(
                            this.dataset.rate
                        );


                    stars.forEach(
                        currentStar => {

                            if (
                                Number(
                                    currentStar.dataset.rate
                                ) <=
                                selectedRating
                            ) {

                                currentStar.style.color =
                                    "#FFD700";

                            } else {

                                currentStar.style.color =
                                    "#d0d0d0";

                            }

                        }
                    );

                }
            );

        }
    );

}


/* ==================================================
   نموذج التقييم
================================================== */

const reviewForm =
    document.getElementById(
        "reviewForm"
    );


if (
    reviewForm
) {

    reviewForm.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();


            if (
                selectedRating === 0
            ) {

                alert(
                    "يرجى اختيار عدد النجوم."
                );

                return;

            }


            const program =
                document
                    .getElementById(
                        "reviewProgram"
                    )
                    ?.value
                    ?.trim() || "";


            const comment =
                document
                    .getElementById(
                        "reviewComment"
                    )
                    ?.value
                    ?.trim() || "";


            if (
                !program ||
                !comment
            ) {

                alert(
                    "يرجى تعبئة جميع الحقول."
                );

                return;

            }


            try {

                await saveReview({

                    program,

                    rating:
                        selectedRating,

                    comment,

                    status:
                        "pending",

                    createdAt:
                        new Date()

                });


                alert(
                    "🩵 شكرًا لتقييمك.\n\n" +
                    "تم استلام تقييمك بنجاح، ونقدّر وقتك ومشاركتك. " +
                    "سيساعدنا رأيك في تطوير خدمات TDrive."
                );


                reviewForm.reset();


                selectedRating =
                    0;


                stars.forEach(
                    star => {

                        star.style.color =
                            "#bbb";

                    }
                );


            } catch (error) {

                console.error(
                    "Review error:",
                    error
                );


                alert(
                    "حدث خطأ أثناء إرسال التقييم."
                );

            }

        }
    );

}


/* ==================================================
   عرض التقييمات
================================================== */

const reviewsContainer =
    document.getElementById(
        "reviewsContainer"
    );


if (
    reviewsContainer
) {

    loadReviews();

}


async function loadReviews() {

    try {

        const reviews =
            await getApprovedReviews();


        reviewsContainer.innerHTML =
            "";


        if (
            !Array.isArray(reviews) ||
            reviews.length === 0
        ) {

            reviewsContainer.innerHTML =
                "<p>لا توجد تقييمات منشورة حتى الآن.</p>";

            return;

        }


        reviews.forEach(
            review => {

                const rating =
                    Math.max(
                        0,
                        Math.min(
                            5,
                            Number(
                                review.rating
                            ) || 0
                        )
                    );


                const program =
                    escapeHTML(
                        review.program
                    );


                const comment =
                    escapeHTML(
                        review.comment
                    );


                reviewsContainer.innerHTML += `

                    <div class="review-card">

                        <div class="review-stars">
                            ${"⭐".repeat(rating)}
                        </div>

                        <h4>
                            ${program}
                        </h4>

                        <p>
                            ${comment}
                        </p>

                    </div>

                `;

            }
        );


    } catch (error) {

        console.error(
            "Load reviews error:",
            error
        );

    }

}


/* ==================================================
   تبويبات الخدمات
================================================== */

const tabButtons =
    document.querySelectorAll(
        ".tab-btn"
    );


const drivingPanel =
    document.getElementById(
        "drivingPanel"
    );


const captainPanel =
    document.getElementById(
        "captainPanel"
    );


tabButtons.forEach(
    btn => {

        btn.addEventListener(
            "click",
            function () {

                const service =
                    this.dataset.service;


                if (
                    service === "car"
                ) {

                    alert(
                        "قريبًا 🚗"
                    );

                    return;

                }


                tabButtons.forEach(
                    button =>
                        button.classList.remove(
                            "active"
                        )
                );


                this.classList.add(
                    "active"
                );


                if (
                    service === "driving"
                ) {

                    if (
                        drivingPanel
                    ) {

                        drivingPanel.style.display =
                            "block";

                    }


                    if (
                        captainPanel
                    ) {

                        captainPanel.style.display =
                            "none";

                    }

                }


                else if (
                    service === "captain"
                ) {

                    if (
                        drivingPanel
                    ) {

                        drivingPanel.style.display =
                            "none";

                    }


                    if (
                        captainPanel
                    ) {

                        captainPanel.style.display =
                            "block";

                    }

                }

            }
        );

    }
);


/* ==================================================
   دورة الكابتن المحترف
================================================== */

/* ==================================================
   دورة الكابتن المحترف
================================================== */

const captainForm =
    document.getElementById("captainForm");


if (captainForm) {

    const captainNextBtn =
        document.getElementById("captainNextBtn");

    const captainStep2BackBtn =
        document.getElementById("captainStep2BackBtn");

    const captainStep2NextBtn =
        document.getElementById("captainStep2NextBtn");

    const captainBackBtn =
        document.getElementById("captainBackBtn");

    const captainSteps =
        document.querySelectorAll(".captain-form-step");

    const captainSessionsList =
        document.getElementById("captainSessionsList");

    const selectedCaptainSessionInput =
        document.getElementById("selectedCaptainSession");

    let loadedCaptainSessions = [];


    function goToCaptainStep(stepNumber) {

        captainSteps.forEach(step => {

            const stepValue =
                Number(step.dataset.captainStep);

            step.style.display =
                stepValue === stepNumber ? "block" : "none";

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


    /* ==========================================
       تحميل المواعيد المتاحة
    ========================================== */

      async function loadCaptainSessions() {

        captainSessionsList.innerHTML = `
            <p style="text-align:center; color:#8b999f; font-size:13px;">
                جاري تحميل المواعيد المتاحة...
            </p>
        `;

        try {
            // 1. جلب الجلسات
            const { data: sessions, error } =
                await captainSupabaseClient
                    .from("captain_sessions")
                    .select("*")
                    .eq("active", true)
                    .order("session_date", { ascending: true });

            if (error) throw error;

            loadedCaptainSessions =
                Array.isArray(sessions) ? sessions : [];

            // 2. جلب عدد الحجوزات الفعلية لكل جلسة من جدول التسجيلات لضمان الدقة المطلقة
            const { data: registrations, error: regError } =
                await captainSupabaseClient
                    .from("captain_registrations")
                    .select("session_id");

            if (regError) throw regError;

            // حساب عدد الحجوزات لكل جلسة
            const countsMap = {};
            if (Array.isArray(registrations)) {
                registrations.forEach(reg => {
                    countsMap[reg.session_id] = (countsMap[reg.session_id] || 0) + 1;
                });
            }

            // دمج الحساب مع الجلسات
            const availableSessions = loadedCaptainSessions.filter(session => {
                const bookedCount = countsMap[session.id] || 0;
                return bookedCount < session.max_seats;
            });

            if (availableSessions.length === 0) {

                captainSessionsList.innerHTML = `
                    <p style="text-align:center; color:#8b999f; font-size:13px;">
                        لا توجد مواعيد متاحة حاليًا.
                    </p>
                `;

                return;

            }

            captainSessionsList.innerHTML =
                availableSessions
                    .map(session => {

                        const bookedCount = countsMap[session.id] || 0;
                        const remaining = session.max_seats - bookedCount;

                        return `
                            <div class="trainer-card" data-session-id="${session.id}">
                                <div class="trainer-select-mark">✓</div>
                                <div class="trainer-info">
                                    <h5>${session.day_name} — ${session.time_slot}</h5>
                                    <span class="trainer-role">
                                        متبقي ${remaining} مقعد من ${session.max_seats}
                                    </span>
                                </div>
                                <label class="trainer-radio-option">
                                    <input type="radio" name="selectedCaptainSessionRadio" value="${session.id}">
                                    <span class="custom-radio"></span>
                                    <span>اختيار الموعد</span>
                                </label>
                            </div>
                        `;

                    })
                    .join("");

            attachCaptainSessionEvents();

        } catch (error) {

            console.error("Load captain sessions error:", error);

            captainSessionsList.innerHTML = `
                <p style="text-align:center; color:#c0392b; font-size:13px;">
                    تعذر تحميل المواعيد.
                </p>
            `;

        }

    }



    function attachCaptainSessionEvents() {

        captainSessionsList
            .querySelectorAll(".trainer-card")
            .forEach(card => {

                card.addEventListener("click", function () {

                    captainSessionsList
                        .querySelectorAll(".trainer-card")
                        .forEach(other =>
                            other.classList.remove("selected")
                        );

                    card.classList.add("selected");

                    const sessionId =
                        card.dataset.sessionId;

                    selectedCaptainSessionInput.value =
                        sessionId;

                    const radio =
                        card.querySelector('input[type="radio"]');

                    if (radio) radio.checked = true;

                });

            });

    }


    /* ==========================================
       التنقل بين الخطوات
    ========================================== */

    if (captainNextBtn) {

        captainNextBtn.addEventListener("click", function () {

            const name =
                document.getElementById("captainName").value.trim();

            const identity =
                document.getElementById("captainId").value.trim();

            const phone =
                document.getElementById("captainPhone").value.trim();

            if (!name || !identity || !phone) {

                alert("يرجى تعبئة جميع البيانات المطلوبة.");
                return;

            }

            const nameParts =
                name.split(/\s+/).filter(Boolean);

            if (nameParts.length < 2 || nameParts.length > 3) {

                alert("يرجى إدخال الاسم الثنائي أو الثلاثي فقط.");
                return;

            }

            const arabicNamePattern =
                /^[\u0600-\u06FF\u0750-\u077F\s]+$/;

            if (!arabicNamePattern.test(name)) {

                alert("يرجى إدخال الاسم باللغة العربية.");
                return;

            }

            if (!/^\d{10}$/.test(identity)) {

                alert("رقم الهوية يجب أن يتكون من 10 أرقام.");
                return;

            }

            if (!/^05\d{8}$/.test(phone)) {

                alert("يرجى إدخال رقم جوال صحيح يبدأ بـ 05 ويتكون من 10 أرقام.");
                return;

            }

            goToCaptainStep(2);
            loadCaptainSessions();

        });

    }


    if (captainStep2BackBtn) {

        captainStep2BackBtn.addEventListener("click", function () {

            goToCaptainStep(1);

        });

    }


    if (captainStep2NextBtn) {

        captainStep2NextBtn.addEventListener("click", function () {

            if (!selectedCaptainSessionInput.value) {

                alert("يرجى اختيار الموعد أولًا.");
                return;

            }

            goToCaptainStep(3);

        });

    }


    if (captainBackBtn) {

        captainBackBtn.addEventListener("click", function () {

            goToCaptainStep(2);

        });

    }


    /* ==========================================
       إرسال نموذج الكابتن
    ========================================== */

    captainForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const captainName =
            document.getElementById("captainName").value.trim();

        const captainId =
            document.getElementById("captainId").value.trim();

        const captainPhone =
            document.getElementById("captainPhone").value.trim();

        const sessionId =
            selectedCaptainSessionInput.value;

        if (!captainName || !captainId || !captainPhone || !sessionId) {

            alert("يرجى إكمال جميع الخطوات قبل المتابعة.");
            return;

        }

        const bookingId =
            "CPT-" + Date.now();

        sessionStorage.setItem("bookingId", bookingId);
        sessionStorage.setItem("fullName", captainName);
        sessionStorage.setItem("identityNumber", captainId);
        sessionStorage.setItem("phone", captainPhone);
        sessionStorage.setItem("captainSessionId", sessionId);
        sessionStorage.setItem("program", "دورة الكابتن المحترف");
        sessionStorage.setItem("originalPrice", "300");
        sessionStorage.setItem("finalPrice", "100");


            try {

            const { error: insertError } =
                await captainSupabaseClient
                    .from("captain_registrations")
                    .insert({
                        booking_id: bookingId,
                        session_id: sessionId,
                        full_name: captainName,
                        national_id: captainId,
                        phone: captainPhone,
                        payment_method: "bank_transfer",
                        status: "pending"
                    });

            if (insertError) throw insertError;

        } catch (error) {

            console.error("Insert registration error:", error);
            alert("حدث خطأ أثناء حفظ التسجيل: " + error.message);
            return;

        }


        window.location.href = "captain-payment-method.html";

    });

}


/* ==================================================
   النهاية
================================================== */

console.log(
    "TDrive Booking System loaded successfully."
);


/* ==================================================
   ربط أزرار التالي والسابق بالخطوات
================================================== */

document.querySelectorAll("[data-next]").forEach(btn => {

    btn.addEventListener("click", function () {

        const currentStep =
            this.closest(".form-step");

        if (!validateStep(currentStep)) {
            return;
        }

        const nextStepNum =
            Number(this.dataset.next);

        goToStep(nextStepNum);

        if (nextStepNum === 2 && cityInput) {
            loadInstructorsByCity(cityInput.value.trim());
        }

    });

});

document.querySelectorAll("[data-back]").forEach(btn => {

    btn.addEventListener("click", function () {

        goToStep(Number(this.dataset.back));

    });

});

/* ==================================================
   إرسال نموذج الحجز وحفظه
================================================== */

if (form) {

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        const fullName =
            document.getElementById("fullName")?.value?.trim() || "";

        const address =
            cityInput?.value?.trim() || "";

        const phone =
            document.getElementById("phone")?.value?.trim() || "";

        const instructorId =
            selectedTrainerInput?.value?.trim() || "";

        const trainingDate =
            dateInput?.value?.trim() || "";

        const trainingTime =
            trainingTimeInput?.value?.trim() || "";

        if (!fullName || !address || !phone || !instructorId || !trainingDate || !trainingTime) {
            alert("يرجى تعبئة جميع البيانات واختيار المدربة والموعد.");
            return;
        }

        const instructor = findInstructor(instructorId);

        const summary = `
تأكيد التسجيل

👤 الاسم: ${fullName}
📱 الجوال: ${phone}
📍 المدينة: ${address}
👩‍🏫 المدربة: ${instructor?.full_name || ""}
📅 بداية التدريب: ${trainingDate}
🕒 الوقت: ${trainingTime}
💰 الرسوم: ${OPENING_PRICE} ريال

هل تريد تأكيد التسجيل؟
`;

        if (!confirm(summary)) return;

        try {

            const bookingId = "BK-" + Date.now();
            const bookingsToSave = [];

            let currentDate = createLocalDate(trainingDate);
            let lessonNumber = 1;

            while (lessonNumber <= 5) {

                const day = currentDate.getDay();

                if (day !== 5 && day !== 6) {

                    bookingsToSave.push({
                        bookingId,
                        lessonNumber,
                        totalLessons: 5,
                        fullName,
                        address,
                        phone,
                        instructorId,
                        trainingDate: formatLocalDate(currentDate),
                        trainingTime,
                        price: OPENING_PRICE,
                        status: "Pending Payment",
                        createdAt: new Date().toISOString()
                    });

                    lessonNumber++;

                }

                currentDate.setDate(currentDate.getDate() + 1);

            }

            for (const bookingData of bookingsToSave) {

                const bookedTimes = await getInstructorBookedTimes(
                    bookingData.instructorId,
                    bookingData.trainingDate
                );

                if (Array.isArray(bookedTimes) && bookedTimes.includes(bookingData.trainingTime)) {
                    throw new Error(
                        `يوجد حجز مسبق يوم ${bookingData.trainingDate} الساعة ${bookingData.trainingTime}`
                    );
                }

            }

            await saveBooking(bookingsToSave);

            alert("تم التسجيل بنجاح، سيتم تحويلك لاختيار طريقة الدفع.");

            sessionStorage.setItem("bookingId", bookingId);
            sessionStorage.setItem("fullName", fullName);
            sessionStorage.setItem("phone", phone);
            sessionStorage.setItem("trainingDate", trainingDate);
            sessionStorage.setItem("trainingTime", trainingTime);

            window.location.href = "payment-method.html";

        } catch (error) {

            console.error(error);
            alert(error.message || "تعذر إتمام الحجز.");

        }

    });

}

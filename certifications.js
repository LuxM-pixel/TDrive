document.addEventListener("DOMContentLoaded", () => {

    // الحقول
    const studentInput = document.getElementById("studentInput");
    const programInput = document.getElementById("programInput");
    const hoursInput = document.getElementById("hoursInput");
    const dateInput = document.getElementById("dateInput");
    const managerInput = document.getElementById("managerInput");

    // عناصر الشهادة
    const studentName = document.getElementById("studentName");
    const programText = document.getElementById("programText");
    const hoursText = document.getElementById("hoursText");
    const dateText = document.getElementById("dateText");
    const managerText = document.getElementById("managerText");


    /* ==============================
       اسم المتدربة
    ============================== */

    function updateStudentName() {
        studentName.textContent =
            studentInput.value || "المتدربة";
    }

    studentInput.addEventListener("input", updateStudentName);


    /* ==============================
       اسم البرنامج (تم التعديل)
    ============================== */

    function updateProgramName() {
        const selectedProgram = programInput.value;

        // التحقق من أن القيمة المختارة موجودة وليست فارغة
        programText.textContent =
            (selectedProgram !== "" && selectedProgram !== null && selectedProgram !== undefined)
            ? selectedProgram
            : "احترفي القيادة على الطريق";
    }

    // عند تغيير الاختيار
    programInput.addEventListener("change", updateProgramName);

    // للتوافق مع المتصفحات المختلفة
    programInput.addEventListener("input", updateProgramName);


    /* ==============================
       عدد الساعات
    ============================== */

    function updateHours() {
        hoursText.textContent =
            hoursInput.value || "5";
    }

    hoursInput.addEventListener("input", updateHours);


    /* ==============================
       التاريخ
    ============================== */

    function updateDate() {

        if (!dateInput.value) {
            dateText.textContent = "—";
            return;
        }

        const [year, month, day] =
            dateInput.value.split("-");

        const months = [
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
        ];

        dateText.textContent =
            `${day} ${months[Number(month) - 1]} ${year}`;
    }

    dateInput.addEventListener("change", updateDate);


    /* ==============================
       اسم المديرة
    ============================== */

    function updateManagerName() {
        managerText.textContent =
            managerInput.value || "منى حمود";
    }

    managerInput.addEventListener("input", updateManagerName);


    /* ==============================
       تحديث كل بيانات الشهادة
    ============================== */

    function updateCertificate() {

        updateStudentName();
        updateProgramName();
        updateHours();
        updateDate();
        updateManagerName();

    }


    /* ==============================
       مهم جدًا للطباعة
    ============================== */

    window.addEventListener("beforeprint", () => {

        // نعيد قراءة كل البيانات
        // مباشرة قبل دخول وضع الطباعة
        updateCertificate();

    });


    /* ==============================
       زر الطباعة
    ============================== */

    document.getElementById("printBtn").addEventListener("click", () => {

        // تحديث الشهادة أولًا
        updateCertificate();

        // إعطاء Safari فرصة لتحديث DOM
        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                window.print();

            });

        });

    });


    /* ==============================
       التشغيل الأول
    ============================== */

    updateCertificate();

});

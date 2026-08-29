document.addEventListener("DOMContentLoaded", () => {

    // الحقول
    const studentInput = document.getElementById("studentInput");
    const identityInput = document.getElementById("identityInput"); // حقل الهوية
    const programInput = document.getElementById("programInput");
    const hoursInput = document.getElementById("hoursInput");
    const dateInput = document.getElementById("dateInput");
    const managerInput = document.getElementById("managerInput");

    // عناصر الشهادة
    const studentName = document.getElementById("studentName");
    const identityText = document.getElementById("identityText"); // نص الهوية في الشهادة
    const programText = document.getElementById("programText");
    const hoursText = document.getElementById("hoursText");
    const dateText = document.getElementById("dateText");
    const managerText = document.getElementById("managerText");


    /* ==============================
       قراءة البيانات من الرابط (تلقائي من الإدارة)
    ============================== */
    const urlParams = new URLSearchParams(window.location.search);
    const paramName = urlParams.get("name");
    const paramId = urlParams.get("id");

    if (paramName && studentInput) {
        studentInput.value = paramName;
    }

    if (paramId) {
        if (identityInput) identityInput.value = paramId;
        if (identityText) identityText.textContent = paramId;
    }


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

        programText.textContent =
            (selectedProgram !== "" && selectedProgram !== null && selectedProgram !== undefined)
            ? selectedProgram
            : "احترفي القيادة على الطريق";
    }

    programInput.addEventListener("change", updateProgramName);
    programInput.addEventListener("input", updateProgramName);


    /* ==============================
       عدد الساعات
    ============================== */

    function updateHours() {
        hoursText.textContent =
            hoursInput.value || "1.5";
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
        
        // تحديث الهوية لو وُجدت
        if (identityInput && identityText) {
            identityText.textContent = identityInput.value || "—";
        }
    }


    /* ==============================
       مهم جدًا للطباعة
    ============================== */

    window.addEventListener("beforeprint", () => {
        updateCertificate();
    });


    /* ==============================
       زر الطباعة
    ============================== */

    document.getElementById("printBtn").addEventListener("click", () => {
        updateCertificate();

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

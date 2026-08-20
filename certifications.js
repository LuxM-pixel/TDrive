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


    // اسم المتدربة
    studentInput.addEventListener("input", () => {
        studentName.textContent =
            studentInput.value || "المتدربة";
    });


    // اسم البرنامج
    function updateProgramName() {
        programText.textContent =
            programInput.value || "احترفي القيادة على الطريق";
    }

    programInput.addEventListener("change", updateProgramName);
    programInput.addEventListener("input", updateProgramName);


    // عدد الساعات
    hoursInput.addEventListener("input", () => {
        hoursText.textContent =
            hoursInput.value || "5";
    });


    // التاريخ
    dateInput.addEventListener("change", () => {

        if (!dateInput.value) {
            dateText.textContent = "—";
            return;
        }

        const [year, month, day] = dateInput.value.split("-");

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
    });


    // اسم المديرة
    managerInput.addEventListener("input", () => {
        managerText.textContent =
            managerInput.value || "منى حمود";
    });


    // الطباعة
    document.getElementById("printBtn").addEventListener("click", () => {

        // مهم جدًا:
        // نعيد أخذ البرنامج المختار مباشرة قبل الطباعة
        updateProgramName();

        setTimeout(() => {
            window.print();
        }, 100);

    });

});

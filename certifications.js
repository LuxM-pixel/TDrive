document.addEventListener("DOMContentLoaded", () => {

    // الحقول
    const studentInput = document.getElementById("studentInput");
    const identityInput = document.getElementById("identityInput");
    const programInput = document.getElementById("programInput");
    const hoursInput = document.getElementById("hoursInput");
    const dateInput = document.getElementById("dateInput");
    const managerInput = document.getElementById("managerInput");

    // عناصر الشهادة
    const studentName = document.getElementById("studentName");
    const identityText = document.getElementById("identityText");
    const programText = document.getElementById("programText");
    const hoursText = document.getElementById("hoursText");
    const dateText = document.getElementById("dateText");
    const managerText = document.getElementById("managerText");

    // تحديث اسم المتدربة
    studentInput.addEventListener("input", () => {
        studentName.textContent =
            studentInput.value || "المتدربة";
    });

    // تحديث رقم الهوية
    identityInput.addEventListener("input", () => {
        identityText.textContent =
            identityInput.value || "—";
    });

    // تحديث اسم البرنامج
    programInput.addEventListener("input", () => {
        programText.textContent =
            programInput.value || "برنامج احتراف القيادة على الطريق";
    });

    // تحديث عدد الساعات
    hoursInput.addEventListener("input", () => {
        hoursText.textContent =
            hoursInput.value || "5";
    });

    // تحديث التاريخ
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

    // تحديث اسم المديرة
    managerInput.addEventListener("input", () => {
        managerText.textContent =
            managerInput.value || "منى حمود";
    });

    // زر الطباعة
    document.getElementById("printBtn").addEventListener("click", () => {
        window.print();
    });

});

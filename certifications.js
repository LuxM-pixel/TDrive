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

    // تحديث مباشر
    studentInput.addEventListener("input", () => {
        studentName.textContent = studentInput.value || "فلانة الفلاني";
    });

    programInput.addEventListener("input", () => {
        programText.textContent =
            programInput.value || "برنامج احتراف القيادة على الطريق";
    });

    hoursInput.addEventListener("input", () => {
        hoursText.textContent = hoursInput.value || "5";
    });

    dateInput.addEventListener("input", () => {
        dateText.textContent = dateInput.value || "26 مايو 2026";
    });

    managerInput.addEventListener("input", () => {
        managerText.textContent = managerInput.value || "منى حمود";
    });

    // زر الطباعة
    document.getElementById("printBtn").addEventListener("click", () => {
        window.print();
    });

});

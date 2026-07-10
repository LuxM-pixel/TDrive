document.addEventListener("DOMContentLoaded", () => {

    const studentInput = document.getElementById("studentInput");
    const programInput = document.getElementById("programInput");
    const hoursInput = document.getElementById("hoursInput");
    const dateInput = document.getElementById("dateInput");

    const studentName = document.getElementById("studentName");
    const programName = document.getElementById("programName");
    const hoursValue = document.getElementById("hoursValue");
    const dateValue = document.getElementById("dateValue");

    // تحديث مباشر

    studentInput.addEventListener("input", () => {

        studentName.textContent =
            studentInput.value || "فلانه الفلاني";

    });

    programInput.addEventListener("input", () => {

        programName.textContent =
            programInput.value || "برنامج احتراف القيادة على الطريق";

    });

    hoursInput.addEventListener("input", () => {

        hoursValue.textContent =
            hoursInput.value || "5";

    });

    dateInput.addEventListener("input", () => {

        dateValue.textContent =
            dateInput.value || "26 مايو 2024";

    });

    // الطباعة

    document.getElementById("printBtn").addEventListener("click", () => {

        window.print();

    });

});

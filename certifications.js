// =========================================================
// TDrive — Certificate Generator
// Handles live preview binding + print trigger
// =========================================================

(function () {
  "use strict";

  const arabicMonths = [
    "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
  ];

  // ---- element references ----
  const studentNameInput = document.getElementById("studentName");
  const programNameInput = document.getElementById("programName");
  const hoursInput = document.getElementById("hoursCount");
  const dateInput = document.getElementById("issueDate");
  const printBtn = document.getElementById("printBtn");

  const outName = document.getElementById("outName");
  const outProgram = document.getElementById("outProgram");
  const outHours = document.getElementById("outHours");
  const outDate = document.getElementById("outDate");

  // ---- helpers ----
  function formatArabicDate(dateValue) {
    if (!dateValue) return "";
    const parts = dateValue.split("-"); // YYYY-MM-DD
    if (parts.length !== 3) return dateValue;

    const year = parseInt(parts[0], 10);
    const monthIndex = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);

    const monthName = arabicMonths[monthIndex] || "";
    return `${day} ${monthName} ${year}`;
  }

  function updatePreview() {
    const name = studentNameInput.value.trim();
    const program = programNameInput.value.trim();
    const hours = hoursInput.value.trim();
    const dateFormatted = formatArabicDate(dateInput.value);

    outName.textContent = name || "فلانه الفلاني";
    outProgram.textContent = program || "برنامج احتراف القيادة على الطريق";
    outHours.textContent = hours || "5";
    outDate.textContent = dateFormatted || "26 مايو 2024";
  }

  function setDefaultDateToToday() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    dateInput.value = `${yyyy}-${mm}-${dd}`;
  }

  // ---- wire up events ----
  [studentNameInput, programNameInput, hoursInput, dateInput].forEach((el) => {
    el.addEventListener("input", updatePreview);
  });

  printBtn.addEventListener("click", () => {
    window.print();
  });

  // ---- init ----
  setDefaultDateToToday();
  updatePreview();
})();

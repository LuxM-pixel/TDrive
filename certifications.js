// ==========================================
// TDrive | Certifications
// ==========================================

// تاريخ اليوم
const dateInput = document.getElementById("date");

dateInput.value = new Date().toISOString().split("T")[0];

// تحديث بيانات الشهادة
function updateCertificate() {

    document.getElementById("studentName").textContent =
        document.getElementById("name").value || "فلانة الفلاني";

    document.getElementById("programName").textContent =
        document.getElementById("program").value;

    document.getElementById("certificateDate").textContent =
        document.getElementById("date").value;

}

// مراقبة التغييرات
document.getElementById("name")
.addEventListener("input", updateCertificate);

document.getElementById("program")
.addEventListener("change", updateCertificate);

document.getElementById("date")
.addEventListener("change", updateCertificate);

// تشغيل أول مرة
updateCertificate();

// ==========================================
// طباعة الشهادة
// ==========================================

function printCertificate(){

    updateCertificate();

    window.print();

}

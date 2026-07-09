// ==========================================
// TDrive | Certifications
// ==========================================


// تعيين تاريخ اليوم تلقائياً

document.getElementById("date").value =
new Date().toISOString().split("T")[0];


// تحديث بيانات الشهادة

function updateCertificate(){

    const name =
    document.getElementById("name").value || "فلانة الفلاني";

    const program =
    document.getElementById("program").value;

    const date =
    document.getElementById("date").value;

    document.getElementById("studentName").textContent =
    name;

    document.getElementById("programName").textContent =
    program;

    document.getElementById("certificateDate").textContent =
    date;

}


// مراقبة التغييرات

document.getElementById("name")
.addEventListener("input", updateCertificate);

document.getElementById("program")
.addEventListener("change", updateCertificate);

document.getElementById("date")
.addEventListener("change", updateCertificate);


// تشغيل أولي

updateCertificate();
// ==========================================
// طباعة الشهادة
// ==========================================

function printCertificate(){

    // تحديث البيانات قبل الطباعة
    updateCertificate();

    // طباعة الصفحة
    window.print();

}

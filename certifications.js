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

    // تحديث البيانات أولاً
    updateCertificate();

    const certificate = document.getElementById("certificate");

    const options = {

        margin: 0,

        filename: "TDrive-Certificate.pdf",

        image: {
            type: "jpeg",
            quality: 1
        },

        html2canvas: {
            scale: 3,
            useCORS: true
        },

        jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "landscape"
        }

    };

    html2pdf()
        .set(options)
        .from(certificate)
        .save();

}

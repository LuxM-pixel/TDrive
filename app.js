// إظهار بيانات الدفع
function showPayment() {
    const box = document.getElementById("paymentBox");
    if (box) {
        box.style.display = "block";
        box.scrollIntoView({
            behavior: "smooth"
        });
    }
}

// نسخ النص
function copyText(id) {
    const input = document.getElementById(id);

    navigator.clipboard.writeText(input.value).then(() => {
        alert("✅ تم النسخ");
    });
}

// رسالة نجاح
function bookingSuccess() {
    alert("تم إرسال طلب التسجيل بنجاح، سيتم التواصل معك عبر واتساب بعد مراجعة البيانات.");
}

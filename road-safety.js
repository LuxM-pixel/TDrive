/*
=========================================
TDrive - Road Safety
road-safety.js
=========================================
*/

document.addEventListener("DOMContentLoaded", () => {

    console.log("🚦 Road Safety Center Loaded");

    // عرض اللوحات داخل البطاقات

    document.getElementById("warningSigns").innerHTML = `

<div class="mini-sign">
    ${svgBump()}
</div>

<div class="mini-sign">
    ${svgPedestrian()}
</div>

<div class="mini-sign">
    ${svgGiveWay()}
</div>

<div class="mini-sign">
    ${svgStop()}
</div>

`;

    document.getElementById("regulatorySign").innerHTML =
        svgNoEntry();

    document.getElementById("guideSign").innerHTML =
        svgStraightAhead();

    document.getElementById("workSign").innerHTML =
        svgPedestrian();

    document.getElementById("prioritySign").innerHTML =
        svgGiveWay();

    // =====================================
    // سيتم إضافة الميزات لاحقًا
    // =====================================
    // - البحث داخل الدروس
    // - الاختبارات التفاعلية
    // - حفظ تقدم المستخدم
    // - الرسوم المتحركة
    // - الفلاتر
    // - الإحصائيات

});

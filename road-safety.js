/*
=========================================
TDrive - Road Safety
road-safety.js
=========================================
*/

document.addEventListener("DOMContentLoaded", () => {

    console.log(" Road Safety Center Loaded");

    // عرض اللوحات داخل البطاقات

    document.getElementById("warningSigns").innerHTML = `

<div class="mini-sign">
    ${svgBump()}
    <span>مطبات</span>
</div>

<div class="mini-sign">
    ${svgPedestrian()}
    <span>ممر مشاة</span>
</div>

`;

document.getElementById("regulatorySigns").innerHTML = `

<div class="mini-sign">
    ${svgNoEntry()}
    <span>ممنوع الدخول</span>
</div>

<div class="mini-sign">
    ${svgNoStop()}
      <span>ممنوع الوقوف والانتظار</span>
</div>

<div class="mini-sign">
    ${svgNoVehicles()}
    <span>ممنوع سير المركبات</span>
</div>

<div class="mini-sign">
    ${svgNoOvertaking()}
    <span>ممنوع التجاوز</span>
</div>

`;

document.getElementById("guideSigns").innerHTML = `

<div class="mini-sign">
    ${svgStraightAhead()}
    <span>اتجاه مستقيم</span>
</div>

<div class="mini-sign">
    ${svgTurnRight()}
    <span>اتجاه يمين</span>
</div>

<div class="mini-sign">

    ${svgTurnLeft()}

    <span>اتجاه يسار</span>

</div>

<div class="mini-sign">

    ${svgUTurn()}

    <span>دوران للخلف</span>

</div>

`;

document.getElementById("prioritySigns").innerHTML = `

<div class="mini-sign">
    ${svgGiveWay()}
    <span>أفسح الطريق</span>
</div>

<div class="mini-sign">
    ${svgStop()}
    <span>قف</span>
</div>

`;

document.getElementById("workSigns").innerHTML = `

<div class="mini-sign">
    ${svgPedestrian()}
    <span>منطقة أعمال</span>
</div>

`;


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

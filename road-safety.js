/*
=========================================
TDrive - Road Safety
road-safety.js
=========================================
*/

document.addEventListener("DOMContentLoaded", () => {

    console.log(" Road Safety Center Loaded");

    // عرض اللوحات داخل البطاقات

    // 1. اللوحات التحذيرية (أضفنا أمامك إشارة ضوئية)
    document.getElementById("warningSigns").innerHTML = `
        <div class="mini-sign">
            ${svgBump()}
            <span>مطبات</span>
        </div>

        <div class="mini-sign">
            ${svgPedestrian()}
            <span>ممر مشاة</span>
        </div>

        <div class="mini-sign">
            ${svgTrafficLight()}
            <span>أمامك إشارة ضوئية</span>
        </div>
    `;

    // 2. اللوحات التنظيمية (أضفنا ممنوع الدوران للخلف)
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

        <div class="mini-sign">
            ${svgNoUTurn()}
            <span>ممنوع الدوران للخلف</span>
        </div>
    `;

    // 3. اللوحات الإرشادية والإلزامية (أضفنا دوار إجباري)
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

        <div class="mini-sign">
            ${svgRoundabout()}
            <span>دوار إجباري</span>
        </div>
    `;

    // 4. لوحات الأسبقية
    document.getElementById("prioritySigns").innerHTML = `
        <div class="mini-sign">
            ${svgPriorityRoad()}
            <span>طريق ذو أولوية</span>
        </div>

        <div class="mini-sign">
            ${svgGiveWay()}
            <span>أفسح الطريق</span>
        </div>

        <div class="mini-sign">
            ${svgStop()}
            <span>قف</span>
        </div>
    `;

    // 5. لوحات مناطق العمل (تم التعديل هنا لتظهر لوحة أعمال الطريق الصحيحة)
    document.getElementById("workSigns").innerHTML = `
        <div class="mini-sign">
            ${svgRoadWork()}
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

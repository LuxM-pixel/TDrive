import { saveEvaluation } from "./firebase.js";
alert("نسخة جديدة");
// =====================================
// TDrive Evaluation System
// الجزء الأول
// =====================================

// الحصص
const lessons = [
    document.getElementById("lesson1"),
    document.getElementById("lesson2"),
    document.getElementById("lesson3"),
    document.getElementById("lesson4"),
    document.getElementById("lesson5"),
    document.getElementById("resultSection")
];

// شريط التقدم
const steps = document.querySelectorAll(".step");

// عرض حصة
function showLesson(index){

    lessons.forEach((lesson,i)=>{

        lesson.style.display = (i===index) ? "block" : "none";

    });

    steps.forEach((step,i)=>{

        if(i<5){

            step.classList.toggle("active",i<=index);

        }

    });

}

// تشغيل الصفحة
showLesson(0);

// =====================================
// التنقل بين الحصص
// =====================================

document.getElementById("next1").addEventListener("click",()=>{

    showLesson(1);

});

document.getElementById("next2").addEventListener("click",()=>{

    showLesson(2);

});

document.getElementById("next3").addEventListener("click",()=>{

    showLesson(3);

});

document.getElementById("next4").addEventListener("click",()=>{

    showLesson(4);

});

document.getElementById("finishEvaluation").addEventListener("click",()=>{

    calculateResult();

    showLesson(5);

});
// =====================================
// تشغيل النجوم
// =====================================

document.querySelectorAll(".stars").forEach((stars)=>{

    const items = stars.querySelectorAll("span");

    items.forEach((star,index)=>{

        star.addEventListener("click",()=>{

            stars.dataset.rating = index + 1;

            items.forEach((item,i)=>{

                if(i <= index){

                    item.textContent = "★";
                    item.style.color = "#FFD700";

                }else{

                    item.textContent = "☆";
                    item.style.color = "#BBBBBB";

                }

            });

        });

    });

});
// =====================================
// حساب الدرجات
// =====================================

function getRating(id){

    return Number(document.getElementById(id).dataset.rating || 0);

}

function calculateResult(){

    const practical =

        getRating("engineStars") +
        getRating("forwardStars") +
        getRating("laneStars") +
        getRating("gasStars") +
        getRating("turnStars") +
        getRating("parallelStars") +
        getRating("parkingStars") +
        getRating("xStars") +
        getRating("overtakeStars") +
        getRating("speedStars") +
        getRating("angleStars");
    alert(
getRating("engineStars")+" | "+
getRating("forwardStars")+" | "+
getRating("laneStars")+" | "+
getRating("gasStars")
);

    const practicalScore = practical * 75 / 55;

    const road = Number(document.getElementById("roadScore").value || 0);

    const theory = Number(document.getElementById("theoryScore").value || 0);

    const total = practicalScore + road + theory;

    document.getElementById("practicalResult").textContent =
        practicalScore.toFixed(1) + " / 75";

    document.getElementById("roadResult").textContent =
        road + " / 10";

    document.getElementById("theoryResult").textContent =
        theory + " / 10";

    document.getElementById("finalResult").textContent =
        total.toFixed(1) + " / 95";

}
// =====================================
// حفظ التقييم
// =====================================

document.getElementById("saveEvaluation").addEventListener("click", async ()=>{

    const data = {

        studentName:
        document.getElementById("studentName").value,

        roadScore:
        Number(document.getElementById("roadScore").value||0),

        theoryScore:
        Number(document.getElementById("theoryScore").value||0),

        engine:getRating("engineStars"),
        forward:getRating("forwardStars"),
        lane:getRating("laneStars"),
        gas:getRating("gasStars"),
        turn:getRating("turnStars"),
        parallel:getRating("parallelStars"),
        parking:getRating("parkingStars"),
        x:getRating("xStars"),
        overtake:getRating("overtakeStars"),
        speed:getRating("speedStars"),
        angle:getRating("angleStars"),

        practical:
        document.getElementById("practicalResult").textContent,

        final:
        document.getElementById("finalResult").textContent,

        notes:
        document.getElementById("notes").value,

        createdAt:
        new Date().toISOString()

    };

    try{

        await saveEvaluation(data);

        alert("✅ تم حفظ التقييم في Firebase بنجاح");

    }catch(error){

        console.error(error);

        alert("❌ فشل حفظ التقييم");

    }

});

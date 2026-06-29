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

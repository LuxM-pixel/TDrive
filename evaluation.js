// ==========================
// TDrive Evaluation
// الجزء الأول
// ==========================

// الحصص
const lessons = [
  document.getElementById("lesson1"),
  document.getElementById("lesson2"),
  document.getElementById("lesson3"),
  document.getElementById("lesson4"),
  document.getElementById("lesson5"),
  document.getElementById("resultSection")
];

// دوائر التقدم
const steps = document.querySelectorAll(".step");

// إظهار حصة وإخفاء البقية
function showLesson(index){

    lessons.forEach((lesson,i)=>{

        lesson.style.display = i===index ? "block" : "none";

    });

    steps.forEach((step,i)=>{

        if(i<=index && i<5){

            step.classList.add("active");

        }else{

            step.classList.remove("active");

        }

    });

}

// تبدأ الصفحة بالحصة الأولى
showLesson(0);

// ==========================
// أزرار التالي
// ==========================

document.getElementById("next1").onclick = ()=>{

    showLesson(1);

};

document.getElementById("next2").onclick = ()=>{

    showLesson(2);

};

document.getElementById("next3").onclick = ()=>{

    showLesson(3);

};

document.getElementById("next4").onclick = ()=>{

    showLesson(4);

};

document.getElementById("finishEvaluation").onclick = ()=>{

    showLesson(5);

};
// ==========================
// تشغيل النجوم
// ==========================

document.querySelectorAll(".stars").forEach(stars => {

    const items = stars.querySelectorAll("span");

    items.forEach((star,index)=>{

        star.style.cursor="pointer";

        star.onclick=()=>{

            stars.dataset.rating=index+1;

            items.forEach((s,i)=>{

                s.textContent=i<=index ? "★" : "☆";

                s.style.color=i<=index ? "#FFD700" : "#999";

            });

        };

    });

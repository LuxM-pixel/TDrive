const data = JSON.parse(localStorage.getItem("lastEvaluation"));

if(data){

    document.getElementById("student").textContent =
        data.studentName;

    document.getElementById("practical").textContent =
        data.practical;

    document.getElementById("road").textContent =
        data.roadScore + " / 10";

    document.getElementById("theory").textContent =
        data.theoryScore + " / 10";

    document.getElementById("final").textContent =
        data.final;

    document.getElementById("notes").textContent =
        data.notes || "لا توجد ملاحظات.";

}

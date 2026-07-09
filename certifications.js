document.getElementById("date").value =
new Date().toISOString().split("T")[0];

function printCertificate(){

const name =
document.getElementById("name").value;

const program =
document.getElementById("program").value;

const date =
document.getElementById("date").value;

const win = window.open("", "_blank");

win.document.write(`

<!DOCTYPE html>

<html lang="ar" dir="rtl">

<head>

<meta charset="UTF-8">

<title>شهادة TDrive</title>

<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:'Cairo',sans-serif;
}

body{

background:white;
padding:40px;

}

.certificate{

width:1120px;
height:790px;
margin:auto;
border:4px solid #1c7d8d;
padding:55px;
position:relative;

}

.title{

text-align:center;
font-size:64px;
font-weight:800;
color:#1c7d8d;
margin-top:10px;

}

.subtitle{

text-align:center;
font-size:28px;
margin-top:25px;

}

.name{

text-align:center;
font-size:72px;
font-weight:800;
color:#1c7d8d;
margin-top:45px;
margin-bottom:30px;

}

.line{

width:70%;
margin:auto;
border-bottom:2px solid #1c7d8d;
margin-bottom:35px;

}

.text{

text-align:center;
font-size:30px;
line-height:2;

}

.program{

font-size:36px;
font-weight:bold;
color:#1c7d8d;

}

.footer{

margin-top:90px;
display:flex;
justify-content:space-between;
align-items:flex-end;

}

.manager{

text-align:right;
font-size:26px;

}

.date{

text-align:center;
font-size:26px;

}

</style>

</head>

<body>

<div class="certificate">

<div class="title">

شهادة إتمام دورة

</div>

<div class="subtitle">

تشهد <b>TDrive</b> أن المتدربة

</div>

<div class="name">

${name}

</div>

<div class="line"></div>

<div class="text">

قد أكملت برنامج تدريب

<br><br>

<div class="program">

${program}

</div>
<div class="footer">

<div class="manager">

<b>مدير TDrive</b>

<br><br>

منى حمود

</div>

<div class="date">

🏅

<br><br>

${date}

</div>

<div style="text-align:left">

____________________

<br>

التوقيع

</div>

</div>

<div style="

position:absolute;

bottom:35px;

left:0;

right:0;

text-align:center;

font-size:28px;

color:#1c7d8d;

font-weight:bold;

">

تعلم، قد بأمان، وامتلك سيارتك بثقة

</div>

</div>

</body>

</html>

`);
  win.document.close();

win.onload = function(){

    win.print();

    win.onafterprint = function(){

        win.close();

    };

};

}

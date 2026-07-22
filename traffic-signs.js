// =====================================
// TDrive | Traffic Signs SVG Library
// traffic-signs.js
// =====================================

// 🚫 ممنوع الوقوف والانتظار
function svgNoStop() {
    return `
    <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45"
            fill="#2e6da4"
            stroke="#1a3a5c"
            stroke-width="2"/>

        <circle cx="50" cy="50" r="35"
            fill="none"
            stroke="#dc2626"
            stroke-width="9"/>

        <line x1="26" y1="26"
              x2="74" y2="74"
              stroke="#dc2626"
              stroke-width="8"/>

        <line x1="74" y1="26"
              x2="26" y2="74"
              stroke="#dc2626"
              stroke-width="8"/>
    </svg>`;
}

// ⛔ ممنوع الدخول
function svgNoEntry() {
    return `
    <svg viewBox="0 0 100 100">
        <circle
            cx="50"
            cy="50"
            r="45"
            fill="#dc2626"
            stroke="#8b0000"
            stroke-width="3"/>
        <rect
            x="20"
            y="42"
            width="60"
            height="16"
            fill="white"/>
    </svg>`;
}

// 🚫 ممنوع سير جميع المركبات
function svgNoVehicles() {
    return `
    <svg viewBox="0 0 100 100">
        <circle
            cx="50"
            cy="50"
            r="45"
            fill="white"
            stroke="#dc2626"
            stroke-width="9"/>
    </svg>`;
}

// 🚫 ممنوع التجاوز
function svgNoOvertaking() {
    return `
    <svg viewBox="0 0 100 100">
        <!-- الإطار -->
        <circle
            cx="50"
            cy="50"
            r="45"
            fill="white"
            stroke="#d32f2f"
            stroke-width="8"/>

        <!-- السيارة الحمراء (أصغر) -->
        <g transform="translate(20,34) scale(0.75)">
            <rect x="8" y="16" width="22" height="10" rx="2" fill="#d32f2f"/>
            <path d="M10 16 L15 9 H24 L29 16 Z" fill="#d32f2f"/>
            <circle cx="13" cy="28" r="3" fill="#222"/>
            <circle cx="25" cy="28" r="3" fill="#222"/>
            <rect x="15" y="11" width="9" height="5" rx="1" fill="#ffffff"/>
        </g>

        <!-- السيارة السوداء (أكبر) -->
        <g transform="translate(48,28) scale(1)">
            <rect x="8" y="18" width="26" height="12" rx="2" fill="#222"/>
            <path d="M10 18 L16 9 H28 L34 18 Z" fill="#222"/>
            <circle cx="14" cy="32" r="3" fill="#222"/>
            <circle cx="28" cy="32" r="3" fill="#222"/>
            <rect x="17" y="11" width="10" height="6" rx="1" fill="#ffffff"/>
        </g>
    </svg>`;
}

// 🔄 دوار إجباري
function svgRoundabout() {
    return `
    <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45"
            fill="#2e6da4"
            stroke="#1a3a5c"
            stroke-width="2"/>

        <!-- الأسهم الدائرية الثلاثة للتعامل مع الدوار -->
        <g stroke="white" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <!-- سهم 1 -->
            <path d="M 45 25 A 25 25 0 0 1 71 40" />
            <!-- سهم 2 -->
            <path d="M 71 55 A 25 25 0 0 1 45 75" />
            <!-- سهم 3 -->
            <path d="M 33 65 A 25 25 0 0 1 33 35" />
        </g>
        
        <!-- رؤوس الأسهم للاتجاهات -->
        <polygon points="71,45 77,35 65,37" fill="white" />
        <polygon points="38,74 48,78 43,67" fill="white" />
        <polygon points="40,29 30,22 34,34" fill="white" />
    </svg>`;
}

// 🚗 السرعة القصوى
function svgMaxSpeed(speed = "60") {
    return `
    <svg viewBox="0 0 100 100">
        <circle
            cx="50"
            cy="50"
            r="45"
            fill="white"
            stroke="#dc2626"
            stroke-width="9"/>
        <text
            x="50"
            y="63"
            text-anchor="middle"
            font-size="30"
            font-weight="bold"
            fill="#222">
            ${speed}
        </text>
    </svg>`;
}

// 🔻 أفسح الطريق
function svgGiveWay() {
    return `
    <svg viewBox="0 0 100 90">
        <polygon
            points="50,85 5,5 95,5"
            fill="white"
            stroke="#dc2626"
            stroke-width="7"/>
        <polygon
            points="50,72 18,18 82,18"
            fill="#dc2626"/>
    </svg>`;
}

// 🛑 قف
function svgStop() {
    return `
    <svg viewBox="0 0 100 100">
        <polygon
            points="35,5 65,5 95,35 95,65 65,95 35,95 5,65 5,35"
            fill="#dc2626"
            stroke="#8b0000"
            stroke-width="3"/>
        <text
            x="50"
            y="58"
            text-anchor="middle"
            font-family="Cairo"
            font-size="22"
            font-weight="bold"
            fill="white">
            قف
        </text>
    </svg>`;
}

// 🟡 طريق ذو أولوية
function svgPriorityRoad() {
    return `
    <svg viewBox="0 0 100 100">
        <!-- المعين الخارجي بإطار أبيض أو أسود -->
        <polygon
            points="50,5 95,50 50,95 5,50"
            fill="white"
            stroke="#1a1a1a"
            stroke-width="3"/>
            
        <!-- المعين الداخلي الأصفر -->
        <polygon
            points="50,15 85,50 50,85 15,50"
            fill="#f5c518"
            stroke="#1a1a1a"
            stroke-width="1.5"/>
    </svg>`;
}


// ⬆️ اتجاه إجباري مستقيم
function svgStraightAhead() {
    return `
    <svg viewBox="0 0 100 100">
        <circle
            cx="50"
            cy="50"
            r="45"
            fill="#2e6da4"
            stroke="#1a3a5c"
            stroke-width="2"/>
        <line
            x1="50"
            y1="75"
            x2="50"
            y2="30"
            stroke="white"
            stroke-width="9"
            stroke-linecap="round"/>
        <polygon
            points="50,18 35,40 65,40"
            fill="white"/>
    </svg>`;
}

// ➡️ اتجاه إجباري يمين
function svgTurnRight() {
    return `
    <svg viewBox="0 0 100 100">
        <circle
            cx="50"
            cy="50"
            r="45"
            fill="#2e6da4"
            stroke="#1a3a5c"
            stroke-width="2"/>
        <path
            d="M30 35 L30 65 L65 65"
            fill="none"
            stroke="white"
            stroke-width="9"
            stroke-linecap="round"
            stroke-linejoin="round"/>
        <polygon
            points="78,65 58,52 58,78"
            fill="white"/>
    </svg>`;
}

// ⬅️ اتجاه إجباري يسار
function svgTurnLeft() {
    return `
    <svg viewBox="0 0 100 100">
        <circle
            cx="50"
            cy="50"
            r="45"
            fill="#2e6da4"
            stroke="#1a3a5c"
            stroke-width="2"/>
        <path
            d="M70 35 L70 65 L35 65"
            fill="none"
            stroke="white"
            stroke-width="9"
            stroke-linecap="round"
            stroke-linejoin="round"/>
        <polygon
            points="22,65 42,52 42,78"
            fill="white"/>
    </svg>`;
}

// ↩️ دوران للخلف
function svgUTurn() {
  return `
  <svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#2f69a8" stroke="#1d3d63" stroke-width="3" />
    <path d="M 62 70 L 62 48 A 12 12 0 0 0 38 48 L 38 60" 
          fill="none" 
          stroke="#ffffff" 
          stroke-width="7" 
          stroke-linecap="square" />
    <polygon points="30,56 46,56 38,70" fill="#ffffff" />
  </svg>
  `;
}

// 🚳 ممنوع الدوران للخلف
function svgNoUTurn() {
    return `
    <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45"
            fill="white"
            stroke="#dc2626"
            stroke-width="9"/>
        <path d="M 58 68 L 58 48 A 10 10 0 0 0 38 48 L 38 58" 
              fill="none" 
              stroke="#222" 
              stroke-width="6" 
              stroke-linecap="square" />
        <polygon points="32,54 44,54 38,66" fill="#222" />
        <line x1="25" y1="25" x2="75" y2="75" stroke="#dc2626" stroke-width="8"/>
    </svg>`;
}

// 🚸 ممر مشاة - المطور والمعدل بالخطوط الأرضية الصحيحة
function svgPedestrian() {
    return `
    <svg viewBox="0 0 100 90">
        <!-- المثلث التحذيري الأصفر -->
        <polygon
            points="50,5 95,85 5,85"
            fill="#f5c518"
            stroke="#dc2626"
            stroke-width="6"/>

        <!-- رمز الشخص (المشاة) -->
        <circle
            cx="50"
            cy="33"
            r="5.5"
            fill="#1a1a1a"/>

        <path
            d="M50 40 L50 56
               M50 44 L38 52
               M50 44 L60 51
               M50 56 L42 69
               M50 56 L58 69"
            stroke="#1a1a1a"
            stroke-width="4.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            fill="none"/>

        <!-- خطوط ممر المشاة الأرضية داخل اللوحة -->
        <g stroke="#1a1a1a" stroke-width="4" stroke-linecap="round">
            <line x1="32" y1="73" x2="42" y2="73" />
            <line x1="45" y1="73" x2="55" y2="73" />
            <line x1="58" y1="73" x2="68" y2="73" />
        </g>
    </svg>`;
}

// 🚦 أمامك إشارة ضوئية
function svgTrafficLight() {
    return `
    <svg viewBox="0 0 100 90">
        <polygon
            points="50,5 95,85 5,85"
            fill="#f5c518"
            stroke="#dc2626"
            stroke-width="6"/>
        <rect x="42" y="32" width="16" height="38" rx="3" fill="#1a1a1a" />
        <circle cx="50" cy="38" r="4.5" fill="#dc2626" />
        <circle cx="50" cy="51" r="4.5" fill="#ffeb3b" />
        <circle cx="50" cy="64" r="4.5" fill="#4caf50" />
    </svg>`;
}

// ⚠️ مطبات
function svgBump() {
    return `
    <svg viewBox="0 0 100 90">
        <polygon
            points="50,5 95,85 5,85"
            fill="#f5c518"
            stroke="#dc2626"
            stroke-width="6"/>
        <path
            d="M20 70 Q50 45 80 70"
            fill="none"
            stroke="#1a1a1a"
            stroke-width="6"
            stroke-linecap="round"/>
    </svg>`;
}

// ⚠️ لوحات مناطق العمل - أعمال الطريق (عامل يحفر وبجانبه كومة تراب)
function svgRoadWork() {
    return `
    <svg viewBox="0 0 100 90">
        <!-- المثلث التحذيري الأصفر -->
        <polygon
            points="50,5 95,85 5,85"
            fill="#f5c518"
            stroke="#dc2626"
            stroke-width="6"/>
            
        <!-- خط الأرضية السفلي -->
        <line x1="25" y1="70" x2="75" y2="70" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round"/>

        <!-- كومة التراب على اليمين -->
        <path d="M58 70 Q68 54 78 70 Z" fill="#1a1a1a"/>

        <!-- رأس العامل -->
        <circle cx="42" cy="38" r="5" fill="#1a1a1a"/>
        
        <!-- جسد العامل والأرجل -->
        <path d="M42 43 L45 54 
                 M45 54 L38 70 
                 M45 54 L48 70" 
              stroke="#1a1a1a" 
              stroke-width="4.5" 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              fill="none"/>
        
        <!-- الذراع والمجرفة المتجهة نحو كومة التراب -->
        <path d="M42 46 Q50 48 58 58" stroke="#1a1a1a" stroke-width="4" stroke-linecap="round" fill="none"/>
        <line x1="44" y1="50" x2="62" y2="66" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round"/>
        <polygon points="60,62 65,67 59,68" fill="#1a1a1a"/>
    </svg>`;
}

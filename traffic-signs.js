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
    <svg viewBox="0 0 100 100">

        <!-- الدائرة -->
        <circle
            cx="50"
            cy="50"
            r="45"
            fill="#2e6da4"
            stroke="#1a3a5c"
            stroke-width="2"/>

        <!-- السهم -->
        <path
            d="
                M55 80
                L55 38
                Q55 18 35 18
                Q20 18 20 35
                Q20 45 30 50
            "
            fill="none"
            stroke="white"
            stroke-width="10"
            stroke-linecap="round"
            stroke-linejoin="round"/>

        <!-- رأس السهم -->
        <polygon
            points="
                30,50
                16,44
                22,58
            "
            fill="white"/>

    </svg>`;
}

// 🚸 ممر مشاة
function svgPedestrian() {

    return `
    <svg viewBox="0 0 100 90">

        <polygon
            points="50,5 95,85 5,85"
            fill="#f5c518"
            stroke="#dc2626"
            stroke-width="6"/>

        <circle
            cx="50"
            cy="38"
            r="6"
            fill="#1a1a1a"/>

        <path
            d="M50 46 L50 62
               M50 50 L38 58
               M50 50 L62 58
               M50 62 L40 75
               M50 62 L60 75"
            stroke="#1a1a1a"
            stroke-width="4"
            stroke-linecap="round"
            fill="none"/>

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

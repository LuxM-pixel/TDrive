document.addEventListener('DOMContentLoaded', () => {
    alert("JS Loaded");
    // --- 1. DOM Elements Selection ---
    const inputName = document.getElementById('inputName');
    const inputHours = document.getElementById('inputHours');
    const inputProgram = document.getElementById('inputProgram');
    const inputDate = document.getElementById('inputDate');
    const inputManager = document.getElementById('inputManager');

    const certName = document.getElementById('certName');
    const certHours = document.getElementById('certHours');
    const certProgram = document.getElementById('certProgram');
    const certDate = document.getElementById('certDate');
    const certManager = document.getElementById('certManager');

    const downloadBtn = document.getElementById('downloadBtn');
    const certificate = document.getElementById('certificate');

    // --- 2. Live Update Synchronization ---
    inputName.addEventListener('input', (e) => {
        certName.textContent = e.target.value || 'فلانه الفلاني';
    });

    inputHours.addEventListener('input', (e) => {
        certHours.textContent = e.target.value || '5';
    });

    inputProgram.addEventListener('input', (e) => {
        certProgram.textContent = e.target.value || 'برنامج احتراف القيادة على الطريق';
    });

    inputDate.addEventListener('input', (e) => {
        certDate.textContent = e.target.value || '26 مايو 2024';
    });

    inputManager.addEventListener('input', (e) => {
        certManager.textContent = e.target.value || 'منى حمود';
    });

// --- Print Certificate ---
downloadBtn.addEventListener("click", () => {
    window.print();
});
    });

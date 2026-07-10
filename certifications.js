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

    // --- 3. Robust iOS Safari A4 Landscape PDF Generation ---
    downloadBtn.addEventListener('click', () => {
        // Change button state temporarily to show progress
        const originalBtnText = downloadBtn.textContent;
        downloadBtn.textContent = 'جاري إعداد الملف...';
        downloadBtn.disabled = true;

        // Custom config tailored to override mobile Safari viewport restrictions
        const options = {
            margin:       0,
            filename:     `certificate-${inputName.value.trim() || 'tdrive'}.pdf`,
            image:        { type: 'jpeg', quality: 1.0 },
            html2canvas:  { 
                scale: 2,            // Increases resolution quality
                useCORS: true,        // Handles potential loaded font/asset glitches
                logging: false,
                scrollX: 0,
                scrollY: 0
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4', 
                orientation: 'landscape' // Explicitly hardcodes the landscape orientation
            }
        };

        // Render target element directly to a true landscape PDF binary blob
        html2pdf().set(options).from(certificate).save().then(() => {
            // Restore button properties once complete
            downloadBtn.textContent = originalBtnText;
            downloadBtn.disabled = false;
        }).catch((err) => {
            console.error('PDF Generation error:', err);
            downloadBtn.textContent = originalBtnText;
            downloadBtn.disabled = false;
        });
    });
});

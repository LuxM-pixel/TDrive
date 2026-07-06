import {
    getFirestore,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyDEjf_HrBdJSn1EVaHeyvMubUkPjVZH5i0",
    authDomain: "tdrive-4fed8.firebaseapp.com",
    projectId: "tdrive-4fed8",
    storageBucket: "tdrive-4fed8.firebasestorage.app",
    messagingSenderId: "107257320648",
    appId: "1:107257320648:web:30d142684f936a374041fd",
    measurementId: "G-QBEPEKERXV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const tbody = document.getElementById("bookingsTable");

async function loadBookings() {

    const snapshot = await getDocs(collection(db, "bookings"));

    const bookings = snapshot.docs.map(doc => doc.data());
const bookings = snapshot.docs.map(doc => doc.data());

bookings.sort((a, b) => {
    return a.trainingDate.localeCompare(b.trainingDate)
        || a.trainingTime.localeCompare(b.trainingTime);
});

tbody.innerHTML = "";


    tbody.innerHTML = "";

    bookings.forEach(booking => {

        tbody.innerHTML += `
        <tr>

            <td>${booking.fullName}</td>

            <td>${booking.phone}</td>

            <td>${booking.trainingDate}</td>

            <td>${booking.trainingTime}</td>

            <td>${booking.lessonNumber}</td>

            <td>
                <a class="button" href="evaluation.html?bookingId=${booking.bookingId}">
                    تقييم
                </a>
            </td>

        </tr>
        `;

    });
    
}

loadBookings();

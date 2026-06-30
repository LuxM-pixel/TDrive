import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getFirestore,
collection,
addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

export async function saveBooking(data){

    alert("دخلت saveBooking");

    console.log("سيتم الحفظ...", data);

    try{

        const docRef = await addDoc(collection(db,"bookings"), data);

        alert("تم الحفظ في Firebase");

        console.log("تم الحفظ", docRef.id);

        return docRef.id;

    }catch(error){

        alert("Firebase Error: " + error.message);

        console.error(error);

        throw error;

    }

}
export async function saveEvaluation(data){

    try{

        const docRef = await addDoc(collection(db,"evaluations"), data);

        return docRef.id;

    }catch(error){

        console.error(error);

        throw error;

    }

}

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getFirestore,
collection,
addDoc,
getDocs,
query,
where
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

    try{

        const docRef = await addDoc(collection(db,"bookings"), data);


        return docRef.id;

    }catch(error){

        console.error("Firebase Error:", error);

        alert(error.message);

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
export async function saveReview(data){

    try{

        const docRef = await addDoc(collection(db,"reviews"),{

            ...data,

            status:"pending",

            createdAt:new Date()

        });

        return docRef.id;

    }catch(error){

        console.error(error);

        throw error;

    }

}
export async function getApprovedReviews() {

    const q = query(
        collection(db, "reviews"),
        where("status", "==", "approved")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => doc.data());

}
export async function getBookedTimes(trainingDate){

    const q = query(
        collection(db,"bookings"),
        where("trainingDate","==",trainingDate)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => doc.data().trainingTime);

}

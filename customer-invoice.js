import { getCustomerInvoice } from "./firebase.js";

const bookingId = sessionStorage.getItem("bookingId");

const invoice = await getCustomerInvoice(bookingId);

if(!invoice){

alert("لم يتم العثور على الفاتورة");

location.href="index.html";

}

document.getElementById("invoiceId").textContent =
invoice.invoiceId;

document.getElementById("fullName").textContent =
invoice.fullName;

document.getElementById("phone").textContent =
invoice.phone;

document.getElementById("paymentMethod").textContent =
invoice.paymentMethod;

document.getElementById("paymentStatus").textContent =
invoice.paymentStatus;

document.getElementById("invoiceDate").textContent =
invoice.invoiceDate;

document.getElementById("amount").textContent =
invoice.finalPrice + " ريال";

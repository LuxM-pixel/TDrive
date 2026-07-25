import { getCustomerInvoice } from "./firebase.js";

const invoiceId = sessionStorage.getItem("invoiceId");

if (!invoiceId) {

    alert("لم يتم العثور على رقم الفاتورة");

    location.href = "index.html";

}

const invoice = await getCustomerInvoice(invoiceId);

if (!invoice) {

    alert("لم يتم العثور على الفاتورة");

    location.href = "index.html";

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
    new Date(invoice.createdAt).toLocaleDateString("ar-SA");

document.getElementById("amount").textContent =
    invoice.finalPrice + " ريال";

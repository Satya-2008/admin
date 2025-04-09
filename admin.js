import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA5YUhpgFScfmaPw9EEiXwwNl3j-n0Fz5Q",
  authDomain: "cyber-auth-e504c.firebaseapp.com",
  projectId: "cyber-auth-e504c",
  storageBucket: "cyber-auth-e504c.appspot.com",
  messagingSenderId: "125074118764",
  appId: "1:125074118764:web:a5656962cbf3990f56e049",
  measurementId: "G-WNCQE8J1BL"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fetch pending users
async function fetchRequests() {
  const querySnapshot = await getDocs(collection(db, "requests"));
  const list = document.getElementById("requestList");
  list.innerHTML = "";

  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    if (data.status === "pending") {
      const div = document.createElement("div");
      div.innerHTML = `
        <p>${data.name} - ${data.phone}</p>
        <button onclick="approve('${docSnap.id}')">Approve</button>
      `;
      list.appendChild(div);
    }
  });
}

// Approve function
window.approve = async function(id) {
  const ref = doc(db, "requests", id);
  await updateDoc(ref, { status: "approved" });
  alert("Access approved!");
  fetchRequests();
};

window.onload = fetchRequests;

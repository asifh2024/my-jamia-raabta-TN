
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBD6CdV8fPvNfc8_naJytU6l_dBPKnugNs",
  authDomain: "jmi-project-auth.firebaseapp.com",
  databaseURL: "https://jmi-project-auth-default-rtdb.firebaseio.com",
  projectId: "jmi-project-auth",
  storageBucket: "jmi-project-auth.firebasestorage.app",
  messagingSenderId: "423421146247",
  appId: "1:423421146247:web:23c783395eb45ccb943422",
  measurementId: "G-3071XZBCC7"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);


document.getElementById("register-form-element").addEventListener("submit", function(event) {
    event.preventDefault(); 

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    const role = document.getElementById("role").value;
    const password = document.getElementById("password").value;

    if (!role || !gender || !password) {
        alert("Please fill all required fields (gender, role, and password).");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            const userData = {
                name: name,
                email: email,
                gender: gender,
                role: role
            };

         
            const userRef = ref(database, 'users/' + user.uid);
            set(userRef, userData)
                .then(() => {
                    console.log("User data stored successfully!");
                    redirectBasedOnRole(role);
                })
                .catch(error => {
                    console.error("Error storing user data: ", error);
                });

        })
        .catch(error => {
            console.error("Error signing up: ", error.message);
            alert(error.message); 
        });
});


function redirectBasedOnRole(role) {
    if (role === "student") {
        window.location.href = "student.html";
    } else if (role === "alumni") {
        window.location.href = "alumni.html";
    } else if (role === "teaching_staff") {
        window.location.href = "teaching_staff.html";
    } else if (role === "non_teaching_staff") {
        window.location.href = "non_teaching_staff.html";
    }
}

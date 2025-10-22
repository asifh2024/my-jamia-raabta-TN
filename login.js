
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";


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


document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }


    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Logged in as:", user.email);
            getUserRole(user.uid);
        })
        .catch((error) => {
            console.error("Error logging in:", error.message);
            alert(error.message);
        });
});


function getUserRole(uid) {
    const userRef = ref(database, 'users/' + uid);
    get(userRef)
        .then((snapshot) => {
            const userData = snapshot.val();
            if (userData) {
                const role = userData.role;
                redirectBasedOnRole(role);
            } else {
                alert("Invalid credentials! User data not found.");
            }
        })
        .catch((error) => {
            console.error("Error fetching user data:", error.message);
            alert("An error occurred while fetching your data.");
        });
}


function redirectBasedOnRole(role) {
    switch (role) {
        case "student":
            window.location.href = "student.html";
            break;
        case "alumni":
            window.location.href = "alumni.html";
            break;
        case "teaching_staff":
            window.location.href = "teaching_staff.html";
            break;
        case "non_teaching_staff":
            window.location.href = "non_teaching_staff.html";
            break;
        default:
            alert("Unknown role, please contact support.");
    }
}

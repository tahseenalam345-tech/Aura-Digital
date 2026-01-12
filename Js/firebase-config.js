// Import the functions you need from the SDKs
// We use the specific version 12.7.0 as requested
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBZvaC_js2bWokwfpP9K_K6yT8Jn3cL0xE",
    authDomain: "aura-digital-c95e9.firebaseapp.com",
    databaseURL: "https://aura-digital-c95e9-default-rtdb.firebaseio.com",
    projectId: "aura-digital-c95e9",
    storageBucket: "aura-digital-c95e9.firebasestorage.app",
    messagingSenderId: "35512018772",
    appId: "1:35512018772:web:1cbc3e04a6f37b99200ac1"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const database = getDatabase(app);

// Export function to save data (used by main.js)
export function saveMessageToFirebase(data) {
    // This creates a reference to the 'messages' path in your database
    const messagesRef = ref(database, 'messages');
    
    // Push creates a unique ID for every new entry automatically
    return push(messagesRef, {
        ...data,
        timestamp: new Date().toISOString()
    });
}

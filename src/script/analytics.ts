import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBP_SyAanZ-KeKeicJB2YCD7KrtnipNRW8",
  authDomain: "reost-mc.firebaseapp.com",
  projectId: "reost-mc",
  storageBucket: "reost-mc.appspot.com",
  messagingSenderId: "518240377853",
  appId: "1:518240377853:web:3d399a29e63ed1b439d794",
  measurementId: "G-QZHNL45GXZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);


import { initializeApp } from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID
// };
const firebaseConfig = {
  apiKey: "AIzaSyAkiNSiQu6yko3I7z2WMRg1pkXJQu-IsiU",
  authDomain: "sns-sample-c20b2.firebaseapp.com",
  projectId: "sns-sample-c20b2",
  storageBucket: "sns-sample-c20b2.appspot.com",
  messagingSenderId: "688031245751",
  appId: "1:688031245751:web:96d9d7c0943af9702c3432"
};

//初期化
export const app = initializeApp(firebaseConfig);
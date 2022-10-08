import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/index.css";
import store from "./store/store";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdsugfb5maBzzc7UADH88ykmOsHbcMIh0",
  authDomain: "userdata-c16bc.firebaseapp.com",
  projectId: "userdata-c16bc",
  storageBucket: "userdata-c16bc.appspot.com",
  messagingSenderId: "386939086912",
  appId: "1:386939086912:web:bdedab2f85a970390c97a5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// const analytics = getAnalytics(app);

createApp(App).use(store).use(router).use(app).use(auth).mount("#app");

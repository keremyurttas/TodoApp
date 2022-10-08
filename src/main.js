import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/index.css";
import store from "./store/store";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWismL2AJyZHh6rqZJZr0_4EpliF_vT2U",
  authDomain: "vuejs-vue-resource-6f650.firebaseapp.com",
  databaseURL: "https://vuejs-vue-resource-6f650-default-rtdb.firebaseio.com",
  projectId: "vuejs-vue-resource-6f650",
  storageBucket: "vuejs-vue-resource-6f650.appspot.com",
  messagingSenderId: "114261711164",
  appId: "1:114261711164:web:e532d99c569b3cea2fe639",
  measurementId: "G-F972W57BKC",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);

createApp(App).use(store).use(router).use(firebase).mount("#app");

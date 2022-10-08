<!-- eslint-disable vue/no-deprecated-v-on-native-modifier -->
<!-- eslint-disable vue/no-deprecated-router-link-tag-prop -->
<template>
  <div>
    <ul
      class="flex space-x-4 text-center fixed items-center w-full bg-white h-20"
    >
      <li><router-link v-if="!user" to="/" tag="a">Log-in</router-link></li>

      <li>
        <router-link @click="allDiscussions" to="/discussions" tag="a"
          >All Discussions</router-link
        >
      </li>
      <hr />
      <li>
        <router-link v-if="!user" to="/register" tag="a">Register</router-link>
      </li>
      <hr />
      <li>
        <router-link @click="logOut" v-if="user" to="/register" tag="a"
          >Log-Out</router-link
        >
      </li>
      <div v-if="user" class="absolute right-4">
        Current user : {{ user.email }}
      </div>
    </ul>
  </div>
</template>
<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default {
  data() {
    return {
      user: null,
    };
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        this.user = user;
        // ...
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    logOut() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          // Sign-out successful.
        })
        .catch((error) => {
          console.log(error);
          // An error happened.
        });
    },
  },
};
</script>

<template>
  <nav>
    <div class="navbar">
      <div class="navbar-brand">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <span v-if="loggedIn" class="navbar-item">Admin |</span>
          <router-link
            v-if="loggedIn"
            to="/"
            class="navbar-item"
            @click="logout"
            >Logout</router-link
          >
          <router-link v-else to="/login" class="navbar-item"
            >Login</router-link
          >
        </div>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<script>
export default {
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("setLoggedIn", false); // Update loggedIn state to false
      // Perform any additional logout logic if needed
      // For example, clear user data from localStorage, reset form fields, etc.
      this.$router.push("/login"); // Redirect to login page after logout
    },
  },
};
</script>

<style>
.navbar {
  background-color: #f5f5f5;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.navbar-brand {
  display: flex;
}

.navbar-brand a {
  color: #333;
  text-decoration: none;
  margin-right: 20px;
  font-weight: bold;
}

.navbar-menu {
  display: flex;
  align-items: center;
}

.navbar-end {
  display: flex;
}

.navbar-item {
  color: #333;
  text-decoration: none;
  margin-left: 10px;
  font-weight: bold;
}

.navbar-item:hover {
  color: #42b983;
}

.router-link-exact-active {
  color: #42b983;
}
</style>

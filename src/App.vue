<template>
  <nav>
    <div class="navbar">
      <div class="navbar-brand">
        <router-link to="/">Home | </router-link>
        <!-- Add dropdown menu for Assessment topics -->
        <div class="dropdown" @click="toggleAssessmentTopics">
          <button class="dropdown-toggle">Assessment</button>
          <div class="dropdown-menu" :class="{ show: showAssessmentTopics }">
            <router-link to="/compact_as">Compact Assessment</router-link>
            <router-link to="/complete_as">Complete Assessment</router-link>
            <router-link to="/calendar_as">Calendar Assessment</router-link>
          </div>
        </div>
        <router-link to="/forecast">Forecast</router-link>
        <router-link to="/feedback">Feedback</router-link>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <span v-if="loggedIn" class="navbar-item">Admin |</span>
          <router-link
            v-if="loggedIn"
            to="/"
            class="navbar-item"
            @click="logout"
          >
            Logout
          </router-link>
          <router-link v-else to="/login" class="navbar-item">
            Login
          </router-link>
        </div>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<script>
export default {
  data() {
    return {
      showAssessmentTopics: false,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    },
  },
  methods: {
    toggleAssessmentTopics() {
      this.showAssessmentTopics = !this.showAssessmentTopics;
    },
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
  background-color: #d1fff7;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}

.navbar-brand {
  display: flex;
  font-weight: bold;
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
  font-weight: bold;
}

.navbar-end {
  display: flex;
  font-weight: bold;
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

.dropdown {
  position: relative;
}

.dropdown-toggle {
  background: none;
  border: none;
  color: #333;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  display: none;
  padding: 10px;
  z-index: 1;
}

.dropdown-menu.show {
  display: block;
}

.dropdown-menu a {
  display: block;
  color: #333;
  text-decoration: none;
  margin-bottom: 5px;
}

.dropdown-menu a:hover {
  color: #42b983;
}

.container {
  position: relative;
  display: flex;
  height: calc(100vh - 50px);
}
.left-sidebar {
  width: 25%;
  background-color: #71ffe5; /* Background color for left sidebar */
}

.content {
  width: 50%;
  background-color: #eafffc; /* Background color for main content */
}

.right-sidebar {
  width: 25%;
  background-color: #71ffe5; /* Background color for right sidebar */
}
</style>

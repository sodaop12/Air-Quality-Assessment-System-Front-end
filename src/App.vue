<template>
  <div class="container">
    <nav>
      <div class="navbar">
        <div class="navbar-brand">
          <router-link to="/">Home</router-link>
          <!-- Modify the router-link to have a click event -->
          <router-link @click="toggleAssessmentTopics" to="#"
            >Assessment</router-link
          >
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
              >Logout</router-link
            >
            <router-link v-else to="/login" class="navbar-item"
              >Login</router-link
            >
          </div>
        </div>
      </div>
    </nav>
    <!-- Render the subtopics if showAssessmentTopics is true -->
    <div v-if="showAssessmentTopics">
      <ul>
        <li>
          <router-link to="/compact_as">Compact Assessment</router-link>
        </li>
        <li>
          <router-link to="/complete_as">Complete Assessment</router-link>
        </li>
        <li>
          <router-link to="/calendar_as">Calendar Assessment</router-link>
        </li>
      </ul>
    </div>
    <router-view />
  </div>
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

.container {
  position: relative;

  background: #71ffe5;
}
</style>

<template>
  <nav>
    <div class="navbar">
      <div class="navbar-brand">
        <p class="nav-title"><router-link to="/">Home |</router-link></p>
        <!-- Add dropdown menu for Assessment topics -->
        <div class="dropdown" @click="toggleAssessmentTopics">
          <div class="nav-sub">Assessment ▼</div>
          <div class="dropdown-menu" :class="{ show: showAssessmentTopics }">
            <router-link to="/compact_as" class="mini_topic"
              >Compact Assessment</router-link
            >
            <router-link to="/complete_as" class="mini_topic"
              >Complete Assessment</router-link
            >
            <router-link to="/calendar_as" class="mini_topic"
              >Calendar Assessment</router-link
            >
          </div>
        </div>
        <p class="nav-sub">
          <router-link to="/forecast" class="links">Forecast</router-link>
        </p>
        <p class="nav-sub">
          <router-link to="/feedback" class="links">Feedback</router-link>
        </p>
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
.navbar {
  background-color: #d1fff7;
  color: #00926f;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}

.navbar-brand,
.dropdown {
  font-family: "Inter", sans-serif;
  display: flex;
  font-size: 20px;
  font-weight: 500;
  line-height: 100%;
  text-decoration: none;
  margin-right: 20px;
  font-weight: bold;
}

.navbar-brand a {
  text-decoration: none;
  margin-right: 20px;
  font-weight: bold;
}

.nav-title {
  font-size: 25px;
  font-weight: 500;
  line-height: 100%;
  color: green; /* Default title color */
  transition: color 0.3s; /* Smooth transition for color change */
}

.nav-sub,
.mini_topic {
  transition: background-color 0.3s, color 0.3s;
  display: flex;
  align-items: center;
}

.mini_topic:hover {
  background: white;
}

.navbar-menu {
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
  line-height: 100%;
}

.navbar-end {
  display: flex;
  font-weight: bold;
}

.navbar-item {
  text-decoration: none;
  margin-left: 10px;
  font-weight: bold;
}

.router-link-exact-active {
  color: #42b983;
}

.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #d1fff7;
  display: none;
  padding: 10px;
  z-index: 1;
}

.box {
  width: 15px;
} /* space between object */

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

.dropdown.active .nav-sub {
  color: #fff; /* Text color when dropdown is active */
}
</style>

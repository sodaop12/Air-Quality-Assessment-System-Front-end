<template>
  <div>
    <nav>
      <v-toolbar color="#71ffe5">
        <v-btn>
          <v-toolbar-title>
            <router-link to="/"
              ><a class="title-home">AQAS | </a></router-link
            ></v-toolbar-title
          >
        </v-btn>
        <v-btn>
          <v-toolbar-title>
            <router-link to="/compact_as" class="sub-home"
              >ASSESSMENT</router-link
            ></v-toolbar-title
          >
        </v-btn>
        <v-btn>
          <v-toolbar-title>
            <router-link to="/forecast" class="sub-home"
              >FORECAST</router-link
            ></v-toolbar-title
          >
        </v-btn>
        <v-btn>
          <v-toolbar-title>
            <router-link to="/feedback" class="sub-home"
              >FEEDBACK</router-link
            ></v-toolbar-title
          >
        </v-btn>
        <v-btn>
          <v-toolbar-title>
            <p v-if="loggedIn" class="nav-sub">
              <router-link to="/allfeedback" class="sub-home"
                >All Feedback</router-link
              >
            </p></v-toolbar-title
          >
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn>
          <template v-if="loggedIn">
            <span>Feedback Auditor |</span>
            <router-link to="/" @click="logout">Logout</router-link>
          </template>
          <template v-else>
            <router-link to="/login">for auditor</router-link>
          </template>
        </v-btn>
      </v-toolbar>
    </nav>
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/FeedbackComponent.vue";
export default {
  components: {
    Footer, // Register the Footer component
  },
  data() {
    return {
      showAssessmentTopics: false,
      value: 1,
      assessmentMenuOpen: false, // Control the visibility of the dropdown menu
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
  padding: 5px;
}
.nav-title:hover,
.navbar-item:hover,
.nav-sub:hover {
  transition: background-color 0.3s, color 0.3s;
}
.mini_topic:hover {
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
  color: #00ba00;
}
.router-link {
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

.mat-bar {
  background: #71ffe5;
}

.nav-title-text-color {
  color: #00926f;
  font-weight: 800;
}
.title-home {
  font-weight: 900;
}
a {
  font-weight: 700;
}
.sub-home {
  font-size: 16px;
}
</style>

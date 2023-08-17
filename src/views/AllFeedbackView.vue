<template>
  <div>
    <div class="container">
      <div class="left-sidebar">
        <!-- Left sidebar content -->
      </div>
      <div class="content">
        <!-- Main content -->
        <div class="forecast">
          <h1>All Feedback</h1>
          <ul>
            <li v-for="(feedback, index) in getFetchedFeedback" :key="index">
              {{ feedback }}
            </li>
          </ul>
        </div>
      </div>
      <div class="right-sidebar">
        <!-- Right sidebar content -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["getFetchedFeedback"]),
  },
  methods: {
    ...mapActions(["fetchFeedback"]), // Map the fetchFeedback action
  },
  created() {
    this.fetchFeedback(); // Call fetchFeedback when the component is created
  },
};
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
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

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .content {
    width: 100%;
  }
}
</style>

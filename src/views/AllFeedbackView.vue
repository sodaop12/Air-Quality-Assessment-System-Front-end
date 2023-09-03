<template>
  <div>
    <div class="container">
      <div class="left-sidebar">
        <!-- Left sidebar content -->
      </div>
      <div class="content">
        <!-- Main content -->
        <h1>Feedback</h1>
        <div v-for="(feedbackItem, index) in feedback" :key="index">
          <div
            class="out-box"
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 10px;
            "
          >
            <div class="card-set" style="width: 500px; height: 200px">
              <img
                :src="getImagePath(feedbackItem.rating)"
                alt="Rating Image"
                style="width: 250px; height: 50px"
              />

              <p>Rating: {{ feedbackItem.rating }}</p>
              <p>Comment: {{ feedbackItem.feedback }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="right-sidebar">
        <!-- Right sidebar content -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      feedback: [],
    };
  },
  mounted() {
    this.fetchFeedback();
  },
  methods: {
    async fetchFeedback() {
      try {
        const response = await fetch("http://127.0.0.1:5000/get_feedback");
        const data = await response.json();

        this.feedback = data.feedback; // Assign the fetched data to the component data
        console.log(data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    },
    getImagePath(rating) {
      return require(`@/assets/images/star${rating}.png`); // Assuming images are named star1.png, star2.png, etc.
    },
  },
};
</script>

<style scope>
@import "../assets/css/Based_Element.css";
@import "../assets/css/Action_Element.css";

.feedback-card {
  margin-bottom: 10px;
}

.card-set {
  background-color: #f0f0f0; /* Add your desired background color here */
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
}

.out-box {
  margin-bottom: 2%;
}
</style>

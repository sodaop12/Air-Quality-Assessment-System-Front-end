<template>
  <div>
    <h1>Feedback</h1>
    <div v-for="(feedbackItem, index) in feedback" :key="index">
      <div class="out-box">
        <div class="card-set">
          <img :src="getImagePath(feedbackItem.rating)" alt="Rating Image" />
          <p>Rating: {{ feedbackItem.rating }}</p>
          <p>Comment: {{ feedbackItem.feedback }}</p>
        </div>
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
      return require(`@/assets/images/star${rating}.jpg`); // Assuming images are named star1.png, star2.png, etc.
    },
  },
};
</script>

<style scope>
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

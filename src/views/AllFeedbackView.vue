<template>
  <div>
    <div class="container">
      <div class="left-sidebar">
        <!-- Left sidebar content -->
      </div>
      <div class="content">
        <!-- Main content -->
        <h1 class="section-title">Feedback</h1>
        <div class="feedback-cards">
          <div
            v-for="(feedbackItem, index) in feedback"
            :key="index"
            class="feedback-card"
          >
            <div class="card-set">
              <div class="image-container">
                <img
                  :src="getImagePath(feedbackItem.rating)"
                  alt="Rating Image"
                  class="rating-image"
                />
              </div>
              <p class="feedback-text">{{ feedbackItem.feedback }}</p>
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
@import "../assets/css/custom_main_font.css";
.feedback-card {
  margin-bottom: 10px;
}

.card-set {
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* Add this property */
  word-wrap: break-word; /* Add this property */
  width: 647px;
  height: auto;
  background-color: #c1fff7;
}

.out-box {
  margin-bottom: 2%;
}

.feedback-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.feedback-card {
  margin: 10px; /* Add some margin between cards */
}

.card-set {
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  word-wrap: break-word;
  width: 647px;
  height: auto;
  background-color: #c1fff7;
  text-align: center; /* Center card content */
}

.image-container {
  display: flex;
  justify-content: center;
}

.rating-image {
  width: 200px; /* Set a fixed width for the image */
  height: 40px;
}

.feedback-text {
  text-align: center;
  margin-top: 20px;
  font-size: 20px; /* Adjust the font size as needed */
  font-weight: 600; /* Add font-weight as needed, e.g., 'bold' or 'normal' */
}
</style>

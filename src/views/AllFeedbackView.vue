<template>
  <div>
    <div class="container">
      <div class="left-sidebar">
        <!-- Left sidebar content -->
      </div>
      <div class="content">
        <!-- Main content -->
        <h2 class="section-title">Feedback</h2>
        <v-table class="big-table">
          <thead>
            <tr>
              <th class="text-left table-header">Rating</th>
              <th class="text-left table-header">Comment</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="feedbackItem in feedback" :key="feedbackItem.id">
              <td>
                <div class="rating-image-container">
                  <img
                    :src="getImagePath(feedbackItem.rating)"
                    alt="Rating Image"
                    class="rating-image"
                  />
                </div>
              </td>
              <td>
                <p class="feedback-text">{{ feedbackItem.feedback }}</p>
              </td>
            </tr>
          </tbody>
        </v-table>
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

.v-data-table {
  background-color: transparent; /* Adjust background color as needed */
}

.rating-header {
  font-weight: bold; /* Set font weight for table headers */
  font-size: 24px; /* Adjust font size for table headers */
  color: #00926f; /* Set color for table headers */
  text-align: center; /* Center header text */
}

.table-header {
  font-weight: 800; /* Set font weight for table headers */
  font-size: 25px; /* Adjust font size for table headers */
  color: #00926f; /* Set color for table headers */
}

.rating-image-container {
  display: flex;
  justify-content: center;
}

.rating-image {
  width: 280; /* Set a fixed width for the image */
  height: 40px;
}

.feedback-text {
  font-size: 20px; /* Adjust the font size as needed */
  font-weight: 400; /* Add font-weight as needed, e.g., 'bold' or 'normal' */
  text-align: center; /* Center feedback text */
}

.big-table {
  padding: 20px;
}
</style>

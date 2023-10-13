<template>
  <div>
    <div class="container">
      <div class="left-sidebar">
        <!-- Left sidebar content -->
      </div>
      <div class="content">
        <!-- Main content -->
        <div class="feedback">
          <h2 class="section-title">Feedback</h2>

          <div class="center-content" style="width: 60%">
            <div class="DH_Box"></div>
            <label class="title">Rating</label>

            <!-- Use v-slider for rating with custom styles -->
            <v-slider
              v-model="rating"
              :step="1"
              min="1"
              max="5"
              thumb-color="#00926f"
              tick-size="10"
            />

            <!-- Display the selected rating -->
            <div class="selected-rating">Selected Rating: {{ rating }}</div>

            <label class="title">Comment</label>
            <div class="comment">
              <v-textarea
                class="comment-background"
                v-model="feedback"
                rows="4"
                placeholder="Enter your feedback"
                variant="solo-inverted"
              ></v-textarea>
            </div>
          </div>
          <button class="submit-button" @click="submitFeedback">Submit</button>
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
      rating: 3,
      feedback: "",
    };
  },
  methods: {
    async submitFeedback() {
      if (!this.feedback.trim()) {
        alert("Please provide feedback before submitting.");
        return;
      }
      const feedbackWithScore = `${this.feedback} (${this.rating})`;
      console.log("Feedback with Score:", feedbackWithScore);
      try {
        const response = await fetch("http://127.0.0.1:5000/submit_feedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ feedback: feedbackWithScore }),
        });

        const data = await response.json();
        console.log(data);

        alert("Thank you for your feedback!");
        this.feedback = ""; // Clear the feedback field
      } catch (error) {
        console.error("API error:", error);
        alert("An error occurred while submitting feedback.");
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/css/Based_Element.css";
@import "../assets/css/Action_Element.css";
@import "../assets/css/custom_main_font.css";
.container {
  display: flex;
  height: 100vh;
}

/* Center the button */
button {
  display: block;
  margin: 20px auto;
}

/* Set width and height for input and comment areas */
.comment textarea,
label {
  width: 70%;
  line-height: 40px;
  display: inline-block;
}
/* Add this to your style section */
.rating label {
  width: 130px;
  height: 40px;
  line-height: 40px;
  display: inline-block;
  cursor: pointer;
}

.rating {
}

.rating label i {
  font-size: 24px; /* Adjust the size as needed */
  color: #ccc; /* Default star color */
}

.rating label i.selected {
  color: #ffc107; /* Active star color */
}

.comment textarea {
  resize: none; /* Prevent textarea from being resized */
}
/* Add this to your style section */
.star-label {
  display: block;
  font-size: 12px;
}
label,
input {
  margin-bottom: 10px;
}
.feedback-center {
  display: flex;
  justify-content: center;
  height: 100%;
}

/* Add these styles */
.title {
  font-weight: bold;
  font-size: larger;
  font-family: "Inter", sans-serif;
  color: #00926f;
  text-align: left;
}
.center-content {
  text-align: center;
  width: 100%;
  margin: 0 auto; /* Center the content horizontally */
  display: flex;
  flex-direction: column;
}

.content {
  background-color: white;
}
</style>

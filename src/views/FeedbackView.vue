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
          <div class="center-content">
            <div class="DH_Box"></div>
            <label class="title">Rating</label>
            <div class="rating">
              <label class="rate-background" v-for="score in 5" :key="score">
                <input
                  type="radio"
                  :id="'rating-' + score"
                  :value="score"
                  v-model="selectedScore"
                  @click="updateSelectedScore(score)"
                />
                <label :for="'rating-' + score">
                  <i
                    class="fas fa-star"
                    :class="{ selected: selectedScore >= score }"
                  ></i>
                  <span class="star-label">{{ score }}</span>
                </label>
              </label>
            </div>

            <label class="title">Comment</label>
            <div class="comment">
              <textarea
                class="comment-background"
                v-model="feedback"
                rows="4"
                placeholder="Enter your feedback"
                style="outline: none"
              ></textarea>
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
      feedback: "",
      selectedScore: null,
    };
  },
  methods: {
    updateSelectedScore(score) {
      if (this.selectedScore === score) {
        this.selectedScore = score - 1; // Deselect the star
      } else {
        this.selectedScore = score; // Select the star
      }
    },
    async submitFeedback() {
      if (!this.feedback.trim()) {
        alert("Please provide feedback before submitting.");
        return;
      }
      const feedbackWithScore = `${this.feedback} (${this.selectedScore})`;
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
/* Center the button */
button {
  display: block;
  margin: 20px auto;
}

/* Set width and height for input and comment areas */
.comment textarea,
label {
  width: 70%;
  height: 100px;
  line-height: 40px;
}
/* Add this to your style section */
.rating label {
  width: 100px;
  height: 40px;
  line-height: 40px;
  display: inline-block;
  cursor: pointer;
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
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .content {
    width: 100%;
  }
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
}

.rate-background,
.comment-background {
  background: #c1fff7;
}

.content {
  background-color: white;
}
</style>

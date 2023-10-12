<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-title
        color="rgb(245, 245, 245)"
        expand-icon="mdi-plus"
        collapse-icon="mdi-minus"
      >
        <a> Feedback</a>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <div class="feedback">
          <textarea
            v-model="feedback"
            rows="4"
            placeholder="Enter your feedback"
          ></textarea>
          <div class="rating">
            <span>Rate your experience:</span>
            <label v-for="score in 5" :key="score">
              <input
                type="radio"
                :id="'rating-' + score"
                :value="score"
                v-model="selectedScore"
              />
              <label :for="'rating-' + score">{{ score }}</label>
            </label>
          </div>
          <button @click="submitFeedback">Submit</button>
          <p v-if="showValidationMessage" class="validation-message">
            Please provide both feedback and a rating before submitting.
          </p>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  data() {
    return {
      feedback: "",
      selectedScore: null,
      panel: [0, 1],
      disabled: false,
    };
  },
  methods: {
    async submitFeedback() {
      if (!this.feedback.trim() || !this.selectedScore) {
        alert("Please provide both feedback and a rating before submitting.");
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
        this.selectedScore = null; // Clear the selectedScore
      } catch (error) {
        console.error("API error:", error);
        alert("An error occurred while submitting feedback.");
      }
    },
  },
};
</script>

<style scoped>
.footer {
  background-color: #f7f7f7;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.feedback {
  flex: 1;
  margin-right: 20px;
}

.feedback textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
}

.feedback button {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.social-media {
  flex: 1;
  text-align: right;
}

.social-icons a {
  margin-left: 10px;
  color: #333;
  font-size: 20px;
  transition: color 0.3s;
}

.validation-message {
  color: red;
  margin-top: 10px;
}
.a {
  font-weight: bold;
}
</style>

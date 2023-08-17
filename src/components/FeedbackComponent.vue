<template>
  <footer class="footer">
    <div class="feedback">
      <h3>Feedback</h3>
      <textarea
        v-model="feedback"
        rows="4"
        placeholder="Enter your feedback"
      ></textarea>
      <button @click="submitFeedback">Submit</button>
    </div>
    <div class="social-media">
      <h3>Follow Us</h3>
      <div class="social-icons">
        <!-- Add social media icons here -->
        <!-- Example: <a href="#"><i class="fab fa-facebook"></i></a> -->
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      feedback: "",
    };
  },
  methods: {
    async submitFeedback() {
      if (!this.feedback.trim()) {
        alert("Please provide feedback before submitting.");
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:5000/submit_feedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ feedback: this.feedback }),
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

.social-icons a:hover {
  color: #007bff;
}
</style>

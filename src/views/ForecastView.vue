<template>
  <div>
    <div class="container">
      <div class="left-sidebar">
        <!-- Left sidebar content -->
      </div>
      <div class="content">
        <!-- Main content -->
        <div class="forecast">
          <h1>Forecast Home</h1>
          <form @submit.prevent="submitNumbers" class="input-form">
            <label for="numberInput">Enter 5 Numbers:</label>
            <div class="input-container">
              <input
                id="numberInput"
                type="number"
                v-for="(number, index) in numbers"
                :key="index"
                v-model="numbers[index]"
                required
                class="number-input"
              />
            </div>
            <button type="submit" class="submit-button">Submit</button>
          </form>

          <div class="response-section">
            <h2>Response from Flask:</h2>
            <p v-if="forecast !== null">{{ forecast }}</p>
            <p v-else>No prediction yet.</p>
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
      numbers: [null, null, null, null, null],
      forecast: null,
    };
  },
  methods: {
    async submitNumbers() {
      console.log("Submitted numbers:", this.numbers);

      if (this.numbers.length >= 2) {
        try {
          const response = await fetch("http://127.0.0.1:5000/forecast", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ numbers: this.numbers }),
          });

          const data = await response.json();
          this.forecast = data.forecast;
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        console.error("At least 2 numbers are required for forecast.");
      }
    },
  },
};
</script>

<style scoped>
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .content {
    width: 100%;
  }
}

.container {
  display: flex;
  height: 100vh;
}

.left-sidebar {
  width: 25%;
  background-color: #71ffe5;
}

.content {
  width: 50%;
  background-color: #eafffc;
  display: flex;
  justify-content: center;
  align-items: center;
}

.forecast {
  width: 80%;
  max-width: 400px;
  margin: auto;
  text-align: center;
}

.input-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-container {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.number-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 40px;
  text-align: center;
}

.submit-button {
  background-color: #71ffe5;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  margin-top: 10px;
}

.submit-button:hover {
  background-color: #48e0c2;
}

.response-section {
  margin-top: 20px;
}
</style>

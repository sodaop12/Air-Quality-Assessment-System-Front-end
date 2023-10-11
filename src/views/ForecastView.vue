<template>
  <div>
    <div class="container">
      <div class="left-sidebar">
        <!-- Left sidebar content -->
      </div>
      <div class="content">
        <h1 class="section-title">Forecast</h1>
        <!-- Main content -->
        <div class="forecast">
          <form @submit.prevent="submitNumbers" class="input-form">
            <table>
              <thead>
                <tr class="select_Head_day">
                  <th>Day</th>
                  <th>AQI</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(number, index) in numbers" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>
                    <input
                      type="number"
                      v-model="numbers[index]"
                      required
                      class="number-input"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button type="submit" class="submit-button">Submit</button>
          </form>

          <div class="response-section">
            <table>
              <thead>
                <tr class="select_Head_day">
                  <th>Next Date AQI</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p v-if="forecast !== null">{{ forecast }}</p>
                    <p v-else>No prediction yet.</p>
                  </td>
                </tr>
              </tbody>
            </table>
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
@import "../assets/css/custom_main_font.css";
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .content {
    width: 100%;
  }
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
.content {
  width: 50%;
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

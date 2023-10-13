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
                      style="border: none; border-bottom: 1px solid black"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>

          <v-dialog width="1000">
            <template v-slot:activator="{ props }">
              <div class="button-container">
                <v-btn
                  v-bind="props"
                  text="submit"
                  @click="submitNumbers"
                  class="submit-button"
                  v-if="showOpenDialogButton"
                >
                </v-btn>
              </div>
            </template>

            <template v-slot:default="{ isActive }">
              <v-card title="Forecast System">
                <v-card-text>
                  <div class="response-section">
                    <v-table>
                      <thead>
                        <tr class="select_Head_day">
                          <th>Next Date AQI</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <p
                              v-if="forecast !== null"
                              class="centered-bold-text"
                            >
                              {{ forecast }}
                            </p>
                            <p v-else class="centered-bold-text">
                              No prediction yet.
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </v-table>
                  </div>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn text="Close" @click="isActive.value = false"></v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
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
  computed: {
    showOpenDialogButton() {
      return this.numbers.every((number) => number !== null);
    },
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

          console.log(this.forecast);
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

<style>
@import "../assets/css/Based_Element.css";
@import "../assets/css/custom_main_font.css";

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
  border-radius: 2px;
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

.response-section {
  margin-top: 20px;
}
/* In your style section */
.centered-bold-text {
  text-align: center;
  font-weight: bold;
  font-size: 30px;
}
</style>

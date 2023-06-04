<template>
  <div>
    <nav class="navbar">
      <!-- Navigation bar content -->
    </nav>
    <div class="container">
      <div class="left-sidebar">
        <!-- Left sidebar content -->
      </div>
      <div class="content">
        <!-- Main content -->
        <div class="complete_as">
          <h1>Complete Home</h1>
        </div>
        <div>
          <label for="dropdown">Select number of days:</label>
          <select
            id="dropdown"
            v-model="selectedDays"
            @change="generateAdditionalInputs"
          >
            <option value="">Select</option>
            <option v-for="day in days" :value="day" :key="day">
              {{ day }}
            </option>
          </select>
          <div v-if="selectedDays >= 1 && selectedDays <= 7">
            <div v-for="inputIndex in additionalInputsCount" :key="inputIndex">
              <label :for="'additionalInput' + inputIndex">Enter Date :</label>
              <input
                :id="'additionalInput' + inputIndex"
                type="number"
                v-model="additionalDays[inputIndex - 1]"
              />
              <label :for="'hoursInput' + inputIndex">Enter hours:</label>
              <input
                :id="'hoursInput' + inputIndex"
                type="number"
                v-model="additionalHours[inputIndex - 1]"
              />
            </div>
            <label>Enter text:</label>
            <input
              :id="'textInput' + inputIndex"
              type="text"
              v-model="additionalText"
            />
          </div>
          <div v-if="selectedDays >= 8 && selectedDays <= 29">
            <input
              :id="'startDateInput' + inputIndex"
              type="number"
              v-model="additionalStartDate"
              min="1"
              max="31"
            />
            <span>to</span>
            <input
              :id="'endDateInput' + inputIndex"
              type="number"
              v-model="additionalEndDate"
              min="1"
              max="31"
            />
            <label>average hours</label>
            <input
              :id="'hoursInput' + inputIndex"
              type="number"
              v-model="Hours"
            />
            <label>Enter text:</label>
            <input
              :id="'textInput' + inputIndex"
              type="text"
              v-model="additionalText"
            />
          </div>
          <div v-if="selectedDays == 30">
            <label>average hours</label>
            <input
              :id="'hoursInput' + inputIndex"
              type="number"
              v-model="Hours"
            />
          </div>
          <button @click="submitData">Submit</button>
        </div>
      </div>
      <pre>{{ additionalHours }}</pre>
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
      selectedDays: "",
      additionalDays: [],
      additionalHours: [],
      Hours: null,
      additionalText: null,
      additionalStartDate: null,
      additionalEndDate: null,
      days: Array.from({ length: 30 }, (_, index) => index + 1), // Generate an array of numbers from 1 to 30
    };
  },
  computed: {
    additionalInputsCount() {
      return this.selectedDays;
    },
  },
  methods: {
    generateAdditionalInputs() {
      this.additionalDays = [];
      this.additionalStartDate = null;
      this.additionalEndDate = null;
      this.additionalHours = [];

      for (let i = 0; i < this.selectedDays; i++) {
        if (i < 7) {
          this.additionalDays.push(null);
        } else if (i >= 7 && i <= 28) {
          this.additionalStartDate = null;
          this.additionalEndDate = null;
          this.additionalHours.push(null);
        }
      }
    },
    submitData() {
      // Validate the input and submit the data to the API
      // ...
    },
  },
};
</script>
<style scoped>
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
</style>

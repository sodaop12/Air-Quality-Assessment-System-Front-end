<template>
  <div class="compact_as">
    <h1>Compact Home</h1>
  </div>
  <div>
    <label for="dropdown">Select number of days:</label>
    <select
      id="dropdown"
      v-model="selectedDays"
      @change="generateAdditionalInputs"
    >
      <option value="">Select</option>
      <option v-for="day in days" :value="day" :key="day">{{ day }}</option>
    </select>

    <div v-for="inputIndex in additionalInputsCount" :key="inputIndex">
      <label :for="'additionalInput' + inputIndex"
        >Enter date that you been out side:</label
      >
      <input
        :id="'additionalInput' + inputIndex"
        type="number"
        v-model="additionalDays[inputIndex - 1]"
      />
    </div>

    <button @click="submitData">Submit</button>
  </div>
  <pre>{{ selectedDays }}</pre>
  <pre>{{ additionalDays }}</pre>
</template>

<script>
export default {
  data() {
    return {
      selectedDays: "",
      additionalDays: [],
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
      for (let i = 0; i < this.selectedDays; i++) {
        this.additionalDays.push(null);
      }
    },
    submitData() {
      // Validate the input before sending the API request
      if (this.selectedDays !== "" && this.additionalDays !== null) {
        const requestData = {
          selectedDays: this.selectedDays,
          additionalDays: this.additionalDays,
        };

        // Send the API request with the collected data
        fetch("YOUR_API_URL", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        })
          .then((response) => response.json())
          .then((data) => {
            // Handle the API response
            console.log(data);
          })
          .catch((error) => {
            // Handle the error
            console.error("API error:", error);
          });
      } else {
        alert("Please select the number of days and enter additional days.");
      }
    },
  },
};
</script>

<style scoped>
label,
select,
input {
  margin-bottom: 10px;
}
</style>

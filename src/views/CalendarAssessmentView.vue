<template>
  <div class="container">
    <div class="left-sidebar">
      <!-- Left sidebar content -->
    </div>
    <div class="content">
      <!-- Main content -->
      <div class="calendar_as">
        <div class="page-links">
          <router-link to="/complete_as" class="page-link"
            >Complete</router-link
          >
          <router-link to="/calendar_as" class="page-link-middle"
            >Calendar Assessment</router-link
          >
          <router-link to="/compact_as" class="page-link">Compact</router-link>
        </div>
        <!-- Generate the table for a month with 30 days -->
        <table class="month-table">
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
          <tr v-for="week in weeks" :key="week">
            <td v-for="day in week" :key="day" class="day-cell">
              <div v-if="day !== null">
                <button @click="toggleInput(day)" class="day-button">
                  {{ day }}
                </button>
                <input
                  v-model="averageHours[day]"
                  v-if="showInput[day]"
                  class="hours-input"
                  type="number"
                  placeholder="Avg Hours"
                />
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="right-sidebar">
      <!-- Right sidebar content -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      weeks: [
        [null, 1, 2, 3, 4, 5, 6],
        [7, 8, 9, 10, 11, 12, 13],
        [14, 15, 16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25, 26, 27],
        [28, 29, 30], // Last week with fewer days
      ],
      showInput: Array(31).fill(false), // An array to track input visibility
      averageHours: Array(31).fill(0), // An array to store average hours
    };
  },
  methods: {
    toggleInput(day) {
      // Toggle the input visibility for the clicked day
      this.showInput[day] = !this.showInput[day];
    },
  },
};
</script>

<style scoped>
@import "../assets/css/Based_Element.css";
@import "../assets/css/Action_Element.css";

.month-table {
  width: 100%;
  border-collapse: collapse;
}

.month-table th,
.month-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}

.hours-input {
  width: 60px;
  margin-top: 5px;
}
.day-button {
  width: 30px;
  height: 30px;
  padding: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
}
</style>

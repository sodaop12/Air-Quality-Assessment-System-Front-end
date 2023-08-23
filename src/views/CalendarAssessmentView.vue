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
        <!-- Generate the table for a month with custom start and end dates -->
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
            <td
              v-for="day in week"
              :key="day"
              :class="['day-cell', { highlighted: isHighlighted(day) }]"
            >
              <div v-if="day !== null">
                <a class="day-button">
                  {{ day }}
                </a>
                <input
                  v-if="showInputComputed[day]"
                  v-model="averageHours[day - 1]"
                  class="hours-input"
                  type="number"
                  placeholder="Avg Hours"
                />
              </div>
            </td>
          </tr>
        </table>
      </div>
      <section class="Location">
        <h2 class="section-title">Location</h2>
        <label for="location1">Select Location 1:</label>
        <select id="location1" v-model="selectedLocations[0]">
          <option value="">-- Select Location --</option>
          <option
            v-for="(location, index) in locations"
            :key="index"
            :value="location"
          >
            {{ location }}
          </option>
        </select>
        <div class="DH_Box"></div>
        <label for="location2">Select Location 2:</label>
        <select id="location2" v-model="selectedLocations[1]">
          <option value="">-- Select Location --</option>
          <option
            v-for="(location, index) in locations"
            :key="index"
            :value="location"
          >
            {{ location }}
          </option>
        </select>
        <div class="DH_Box"></div>
        <label for="location3">Select Location 3:</label>
        <select id="location3" v-model="selectedLocations[2]">
          <option value="">-- Select Location --</option>
          <option
            v-for="(location, index) in locations"
            :key="index"
            :value="location"
          >
            {{ location }}
          </option>
        </select>
      </section>
      <!-- Input boxes for start date and end date -->
      <div class="date-inputs">
        <label for="start-date">Start Date:</label>
        <input
          id="start-date"
          v-model="startDate"
          type="number"
          min="1"
          max="30"
          class="date-input"
        />
        <label for="end-date">End Date:</label>
        <input
          id="end-date"
          v-model="endDate"
          type="number"
          min="1"
          max="30"
          class="date-input"
        />

        <button @click="submitData" class="submit-button">Submit</button>
      </div>
      <!-- Display the logged data as a table -->
      <div class="logged-data">
        <!-- <p>Total Active Average Hours: {{ totalActiveHours }}</p>-->
        <table>
          <tr>
            <th>Date</th>
            <th>Average Hours</th>
          </tr>
          <tr v-for="dayData in filteredLoggedData" :key="dayData.day">
            <td>{{ dayData.day }}</td>
            <td>
              <ul>
                <li>
                  {{ averageHours[dayData.day - 1] }}
                </li>
              </ul>
            </td>
          </tr>
        </table>
        <!-- Split table for selected locations -->
        <table>
          <tr>
            <th>Location</th>
            <th></th>
          </tr>
          <tr
            v-for="(selectedLocation, index) in selectedLocations"
            :key="index"
          >
            <td>Location {{ index + 1 }} (30 days):</td>
            <td>{{ selectedLocation }}</td>
          </tr>
        </table>
      </div>

      <h2 class="section-title" v-if="responseReceived">Report</h2>
      <table v-if="responseReceived">
        <tr>
          <td>Average AQI:</td>
          <td>{{ calculateaverage.toFixed(2) }}</td>
        </tr>
        <tr>
          <td>Total Hour:</td>
          <td>{{ totalhour }}</td>
        </tr>
        <tr>
          <td>Maximum AQI:</td>
          <td>{{ max }}</td>
        </tr>
        <tr>
          <td>Minimum AQI:</td>
          <td>{{ min }}</td>
        </tr>
        <tr>
          <td>Cigarettes according to AQI:</td>
          <td>{{ Cgrs.toFixed(2) }}</td>
        </tr>
        <tr>
          <td colspan="2">
            <p v-html="output_text"></p>
          </td>
        </tr>
      </table>
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
      output_text: null,
      totalhour: null,
      responseReceived: false,
      max: null,
      min: null,
      Cgrs: null,
      startDate: 1,
      endDate: 30,
      loggedData: Array(30).fill({ day: 0, averageHours: 0 }), // Initialize loggedData array
      showInput: Array(31).fill(false), // Initialize showInput array
      averageHours: Array(30).fill(0), // Initialize averageHours array

      weeks: [
        [null, 1, 2, 3, 4, 5, 6],
        [7, 8, 9, 10, 11, 12, 13],
        [14, 15, 16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25, 26, 27],
        [28, 29, 30],
      ],
      selectedLocations: ["", "", ""],
      locations: [
        "Innovative Village ต.ป่าแดด อ.เมือง จ.เชียงใหม่",
        "คณะบริหารธุรกิจ มช. ต.สุเทพ อ.เมือง จ.เชียงใหม่",
        "คณะมนุษยศาสตร์ มช. (HB5) ต.สุเทพ อ.เมือง จ.เชียงใหม่",
        "คณะสังคมศาสตร์ มช. ต.สุเทพ อ.เมือง จ.เชียงใหม่",
        "ชุมชนล่ามช้าง ต.ช้างม่อย อ.เมือง จ.เชียงใหม่ จุดที่ 1 (Indoor)",
        "ชุมชนวัดเกต ต.วัดเกต อ.เมือง จ.เชียงใหม่ จุดที่ 1 (Indoor)",
        "ชุมชนสวนดอก ต.สุเทพ อ.เมือง จ.เชียงใหม่",
        "ชุมชนหมื่นสาร จุดที่ 1B (อาสา DustBoy, Outdoor) ต.หายยา อ.เมือง จ.เชียงใหม่",
        "ทต.เมืองนะ ต.เมืองนะ อ.เชียงดาว จ.เชียงใหม่",
        "บ.พะอัน ต.สบโขง อ.อมก๋อย จ.เชียงใหม่",
        "บ้านดอยสันเกี๋ยง ต.ช่างเคิ่ง อ.แม่แจ่ม จ.เชียงใหม่",
        "บ้านห้วยบง ต.ทาเหนือ อ.แม่ออน จ.เชียงใหม่",
        "บ้านห้วยริน ต.ช่างเคิ่ง อ.แม่แจ่ม จ.เชียงใหม่",
        "มช. แคมปัสแม่เหียะ ต.สุเทพ อ.เมือง จ.เชียงใหม่",
        "มทร.ล้านนา (ดอยสะเก็ด) ต.ป่าป้อง อ.ดอยสะเก็ด จ.เชียงใหม่",
        "รพ.ฝาง ต.เวียง อ.ฝาง จ.เชียงใหม่",
        "รพ.พร้าว ต.เวียง อ.พร้าว จ.เชียงใหม่",
        "รพ.สต.บ้านไตรสภาวคาม ต.เมืองงาย อ.เชียงดาว จ.เชียงใหม่",
        "รพ.หางดง ต.หางดง อ.หางดง จ.เชียงใหม่",
        "สสอ.ฮอด ต.หางดง อ.ฮอด จ.เชียงใหม่",
        "ศพด.บ้านทับเดื่อ ต.อินทขิล อ.แม่แตง จ.เชียงใหม่",
      ],
    };
  },
  computed: {
    totalActiveHours() {
      return this.filteredLoggedData.reduce(
        (total, dayData) => total + this.averageHours[dayData.day - 1],
        0
      );
    },
    filteredLoggedData() {
      return this.loggedData.filter(
        (dayData) => this.averageHours[dayData.day - 1] !== 0
      );
    },
    // Calculate the number of days in the range (start date to end date)
    daysInRange() {
      return this.endDate - this.startDate + 1;
    },
    showInputComputed() {
      // Generate the showInputData array based on the selected start and end dates
      const showInputArray = Array(31).fill(false);
      for (let day = this.startDate; day <= this.endDate; day++) {
        showInputArray[day] = true;
        console.log(
          "day = " +
            day +
            " // start = " +
            this.startDate +
            " // end = " +
            this.endDate
        );
      }
      return showInputArray;
    },
  },
  methods: {
    submitData() {
      const dataToSend = {
        startDate: this.startDate,
        endDate: this.endDate,
        selectedLocations: this.selectedLocations,
        averageHours: this.averageHours,
      };

      fetch("http://127.0.0.1:5000/submitcalenderdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      })
        .then((response) => response.json())
        .then((data) => {
          this.calculateaverage = data.calculateaverage;
          this.totalhour = data.totalhour;
          this.output_text = data.output_text;
          this.responseReceived = true;
          this.max = data.max;
          this.min = data.min;
          this.Cgrs = data.CGRS;
          // Log the updated loggedData and averageHours arrays
          console.log("Updated loggedData:", this.loggedData);
          console.log("Updated averageHours:", this.averageHours);

          // Update loggedData with average hours data
          for (let day = this.startDate; day <= this.endDate; day++) {
            this.loggedData[day - 1].averageHours = this.averageHours[day - 1];
          }
          this.loading = false;
        })
        .catch((error) => {
          console.error("API error:", error);
          this.loading = false;
        });
    },
    isHighlighted(day) {
      return day >= this.startDate && day <= this.endDate;
    },
  },
  mounted() {
    // Automatically set showInput to true for the selected date range
    for (let day = this.startDate; day <= this.endDate; day++) {
      this.showInputComputed[day] = true;
      this.loggedData[day - 1] = { day: day };
    }
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
.date-input {
  width: 40px;
  margin: 0 5px;
}
.date-inputs {
  margin-top: 10px;
}

.highlighted {
  background-color: yellow; /* You can choose your desired highlighting color */
}

.logged-data {
  margin-top: 20px;
}

.logged-data table {
  border-collapse: collapse;
  width: 100%;
}

.logged-data th,
.logged-data td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}
</style>

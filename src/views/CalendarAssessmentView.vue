<template>
  <div class="container">
    <div class="left-sidebar">
      <!-- Left sidebar content -->
    </div>
    <div class="content">
      <!-- Loading pop-up -->
      <div class="loading-popup" v-if="loading">
        <div class="loading-text" v-if="responseReceived">
          Loading Result...
        </div>
      </div>
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

        <h2 class="section-title">Calendar (1/5/2023 - 30/5/2023)</h2>
        <table class="month-table">
          <tr class="select_Head_day">
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
              <div v-if="day !== null" style="display: inline-block">
                <a class="day-button">
                  {{ day }}
                </a>
                <input
                  v-if="showInputComputed[day]"
                  v-model="averageHours[day - 1]"
                  class="hours-input"
                  type="number"
                  placeholder="Average hours"
                  style="
                    display: block;
                    border: none;
                    border-bottom: 1px solid black;
                  "
                  min="0"
                  max="24"
                />
              </div>
            </td>
          </tr>
        </table>
      </div>

      <h2 class="section-title">Start Date - End Date</h2>
      <!-- Add a container div to center align the date input boxes -->
      <table class="date-input-table">
        <tr>
          <td style="background-color: #bcfff4">
            <label for="start-date">Start Date:</label>
          </td>
          <td style="background-color: #e2fefa">
            <input
              id="start-date"
              v-model="startDate"
              type="number"
              min="1"
              max="30"
              class="date-input"
              style="border: none; border-bottom: 1px solid black"
            />
          </td>
          <td style="background-color: #bcfff4">
            <label for="end-date">End Date:</label>
          </td>
          <td style="background-color: #e2fefa">
            <input
              id="end-date"
              v-model="endDate"
              type="number"
              min="1"
              max="30"
              class="date-input"
              style="border: none; border-bottom: 1px solid black"
            />
          </td>
        </tr>
      </table>

      <section class="Location">
        <h2 class="section-title">Location</h2>
        <label class="select_Head_day2" for="location1"
          >Select Location 1:</label
        >
        <v-autocomplete
          id="location1"
          v-model="selectedLocations[0]"
          label="-- Select Location 1 --"
          :items="locations"
          item-text="location"
          item-value="location"
          clearable
          class="fixed-autocomplete"
          variant="outlined"
        ></v-autocomplete>

        <div class="DH_Box"></div>
        <label class="select_Head_day2" for="location2"
          >Select Location 2:</label
        >
        <v-autocomplete
          id="location1"
          v-model="selectedLocations[1]"
          label="-- Select Location 2 --"
          :items="locations"
          item-text="location"
          item-value="location"
          clearable
          class="fixed-autocomplete"
          variant="outlined"
        ></v-autocomplete>
        <div class="DH_Box"></div>
        <label class="select_Head_day2" for="location3"
          >Select Location 3:</label
        >
        <v-autocomplete
          id="location1"
          v-model="selectedLocations[2]"
          label="-- Select Location 3 --"
          :items="locations"
          item-text="location"
          item-value="location"
          clearable
          class="fixed-autocomplete"
          variant="outlined"
        ></v-autocomplete>
      </section>

      <h2 class="section-title">Summary</h2>
      <!-- Display the logged data as a table -->
      <div class="logged-data" v-if="hasInputData">
        <!-- <p>Total Active Average Hours: {{ totalActiveHours }}</p>-->
        <table>
          <tr>
            <th>Date</th>
            <th>Average Hours</th>
          </tr>
          <tr v-for="dayData in filteredLoggedData" :key="dayData.day">
            <td>{{ dayData.day }}/5/2023</td>
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
      </div>
      <div class="logged-data" v-if="hasInputData2">
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

      <v-dialog width="1000">
        <template v-slot:activator="{ props }">
          <div class="button-container">
            <v-btn
              v-bind="props"
              text="Submit"
              @click="validateAndSubmitData"
              class="submit-button"
              v-if="showOpenDialogButton"
            >
            </v-btn>
          </div>
        </template>

        <template v-slot:default="{ isActive }" v-if="responseReceived">
          <v-card title="Calendar Assessment">
            <v-card-text>
              <h2 class="section-title" v-if="responseReceived">Report</h2>
              <v-table v-if="responseReceived">
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
                    <p
                      v-html="formattedOutputText"
                      style="font-size: 16px; line-height: 1.6"
                    ></p>
                  </td>
                </tr>
              </v-table>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn text="Close" @click="isActive.value = false"></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
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
      loading: false, // Add this loading property,
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
    showOpenDialogButton() {
      return (
        this.startDate >= 1 &&
        this.endDate <= 30 &&
        this.selectedLocations[0] != "" &&
        this.selectedLocations[1] != "" &&
        this.selectedLocations[2] != "" &&
        this.averageHours != null
      );
    },
    hasInputData() {
      // Check if any input fields in the table have non-zero values
      const hasAverageHours = this.averageHours.some((hours) => hours !== 0);

      // Return true if either input fields or locations are selected
      return (
        hasAverageHours ||
        this.selectedLocations.some((location) => location !== "")
      );
    },
    hasInputData2() {
      // Return true if either input fields or locations are selected
      return this.selectedLocations.some((location) => location !== "");
    },
    formattedOutputText() {
      // Replace spaces with <br> to create new lines
      let formattedText = this.output_text.replace(/(\d+\.)\s+/g, "<br>$1 ");
      // Change font-weight for specific words
      // Add HTML tags to make specific words bold
      formattedText = formattedText.replace(/Diagnosis:/g, "<b>Diagnosis:</b>");
      formattedText = formattedText.replace(/Diagnosis/g, "<b>Diagnosis</b>");
      formattedText = formattedText.replace(
        /Diagnosis and/g,
        "<b>Diagnosis and</b>"
      );
      formattedText = formattedText.replace(
        /Relate to Air Quality Index table:/g,
        "<b>Relate to Air Quality Index table:</b>"
      );
      formattedText = formattedText.replace(
        /Relate to Air Quality Index Table:/g,
        "<b>Relate to Air Quality Index Table:</b>"
      );
      formattedText = formattedText.replace(
        /Emphasizing Preventive Care:/g,
        "<b>Emphasizing Preventive Care:</b>"
      );
      formattedText = formattedText.replace(
        /Explanation:/g,
        "<b>Explanation:</b>"
      );
      formattedText = formattedText.replace(
        /Air Quality Index Table:/g,
        "<b>Air Quality Index Table:</b>"
      );
      formattedText = formattedText.replace(
        /Preventive Care:/g,
        "<b>Preventive Care:</b>"
      );
      formattedText = formattedText.replace(
        /Follow-up Plan:/g,
        "<b>Follow-up Plan:</b>"
      );
      formattedText = formattedText.replace(
        /Personalized Recommendations:/g,
        "<b>Personalized Recommendations</b>"
      );
      formattedText = formattedText.replace(
        /Detailed Suggestions:/g,
        "<b>Detailed Suggestions:</b>"
      );
      formattedText = formattedText.replace(
        /Detailed of Suggestions:/g,
        "<b>Detailed of Suggestions:</b>"
      );
      formattedText = formattedText.replace(
        /Give Details of suggestions as a doctor:/g,
        "<b>Give Details of suggestions as a doctor:</b>"
      );

      return formattedText;
    },
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
      }
      return showInputArray;
    },
  },
  methods: {
    validateAndSubmitData() {
      console.log("Validation started...");

      // Check if any input fields are empty
      const emptyInputs =
        this.selectedLocations.some((location) => location === "") ||
        !this.startDate ||
        !this.endDate;

      if (!emptyInputs) {
        console.log("Validation successful.");
        // Proceed with counting and other relevant logic
        console.log("Start Date:", this.startDate);
        console.log("End Date:", this.endDate);
        console.log("Selected Locations:", this.selectedLocations);

        // Continue with other relevant logic here
        // For example, you can count the selected locations and perform calculations.

        // Calculate the count of selected locations
        const selectedLocationCount = this.selectedLocations.filter(
          (location) => location !== ""
        ).length;
        console.log("Selected Location Count:", selectedLocationCount);

        // Perform other calculations or actions as needed

        // Call the submitData method to submit the data
        this.submitData();
      } else {
        console.log("Validation failed.");
        // Display an alert if any input fields are empty
        alert("Please fill in all location and date fields!!");
      }
    },

    submitData() {
      const dataToSend = {
        startDate: this.startDate,
        endDate: this.endDate,
        selectedLocations: this.selectedLocations,
        averageHours: this.averageHours,
      };
      this.loading = true;
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
          console.log(this.output_text);
          this.loading = false;
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
@import "../assets/css/custom_main_font.css";
label {
  margin-bottom: 10px;
}
option,
select {
  width: 60%;
  height: 40px;
  padding: 5px;
  box-sizing: border-box;
  background-color: #c1fff7;
  margin: 0 auto;
  display: block;
  text-align: center;
}
/* Add styles to target the <p> element within the <td> */
td p {
  margin: 0; /* Remove default margin from <p> element */
}
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
  background-color: rgba(
    66,
    198,
    255,
    0.233
  ); /* You can choose your desired highlighting color */
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

/* Center align the date input container */
.date-input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap; /* Allow wrapping of date inputs if necessary */
  margin-top: 10px;
}

/* Adjust the styles for labels and inputs */
.date-input-container label {
  margin-right: 5px;
  white-space: nowrap; /* Prevent labels from wrapping */
}

.date-input-container input {
  width: 40px;
  margin: 0 5px;
}

/* Center-align the "Submit" button */
.submit-button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px; /* Adjust margin-top as needed */
}

.fixed-autocomplete {
  width: 60%;
  height: 55px;
  box-sizing: border-box;
  background-color: #c1fff7;
  margin: 0 auto;
  display: block;
  text-align: center;
}

.select_Head_day2 {
  padding: 30px;
  font-size: 20x;
  /* Change the font-size as desired */
  font-weight: 700;
  color: #00926f;
}
</style>

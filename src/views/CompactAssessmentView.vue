<template>
  <div class="container">
    <div class="left-sidebar">
      <!-- Left sidebar content ASDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD-->
    </div>
    <div class="content">
      <!-- Main content -->
      <div class="page-links">
        <router-link to="/calendar_as" class="page-link">Calendar</router-link>
        <router-link to="/compact_as" class="page-link-middle"
          >Compact Assessment</router-link
        >
        <router-link to="/complete_as" class="page-link">Complete</router-link>
      </div>
      <section class="DayNum">
        <!-- Day, Number content -->
        <h2 class="section-title">Average Day&Hours (1/5/2023 - 30/5/2023)</h2>
        <div>
          <label class="select_Head_day" for="dropdown"
            >During the last 30 days, on average, how many days have you spent
            outdoors?</label
          >
          <div class="DH_Box"></div>
          <v-autocomplete
            label="-- How many days --"
            v-model="selectedDays"
            :items="days"
            outlined
            class="fixed-autocomplete"
          ></v-autocomplete>

          <div class="DH_Box"></div>
          <label class="select_Head_day" for="dropdown"
            >How much average hours have you spent outdoors each day?</label
          >
          <v-autocomplete
            label="-- Average hours/day --"
            v-model="averageHours"
            :items="hoursOptions"
            item-text="hour"
            outlined
            class="fixed-autocomplete"
          ></v-autocomplete>
        </div>
      </section>

      <section class="Location">
        <h2 class="section-title">Location</h2>
        <label class="select_Head_day" for="location1"
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
        <label class="select_Head_day" for="location2"
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
        <label class="select_Head_day" for="location3"
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

      <section class="Report">
        <h2 class="section-title">Summary</h2>
        <div class="report-content">
          <table>
            <tr>
              <th v-if="responseReceived">Content</th>
              <th v-if="responseReceived">Information</th>
            </tr>
            <tr v-if="selectedDays !== ''">
              <td>Selected Days</td>
              <td>{{ selectedDays }}</td>
            </tr>
            <tr v-if="averageHours !== null">
              <td>Average Hours</td>
              <td>{{ averageHours }}</td>
            </tr>
            <tr v-if="selectedLocations[0] !== ''">
              <td>Location 1</td>
              <td>{{ selectedLocations[0] }}</td>
            </tr>
            <tr v-if="selectedLocations[1] !== ''">
              <td>Location 2</td>
              <td>{{ selectedLocations[1] }}</td>
            </tr>
            <tr v-if="selectedLocations[2] !== ''">
              <td>Location 3</td>
              <td>{{ selectedLocations[2] }}</td>
            </tr>
            <!-- Add more table rows for other results -->
          </table>

          <!-- Loading pop-up -->
          <div class="loading-popup" v-if="loading">
            <div class="loading-text" v-if="responseReceived">
              Loading Result...
            </div>
          </div>
          <!-- Other paragraphs of text -->

          <v-dialog width="1000">
            <template v-slot:activator="{ props }">
              <div class="button-container">
                <v-btn
                  v-bind="props"
                  text="Submit"
                  @click="submitData"
                  class="submit-button"
                  v-if="showOpenDialogButton"
                >
                </v-btn>
              </div>
            </template>

            <template v-slot:default="{ isActive }" v-if="responseReceived">
              <v-card title="Compact Assessment">
                <v-card-text>
                  <h2 class="section-title">Report</h2>
                  <v-table>
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
                        <p v-html="formattedOutputText"></p>
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
      </section>
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
      loading: false,
      calculateaverage: null,
      totalhour: null,
      output_text: null,
      responseReceived: false,
      averageHours: null,
      max: null,
      min: null,
      Cgrs: null,
      selectedLocations: ["", "", ""],
      selectedDays: null, // This will hold the selected value
      days: Array.from({ length: 30 }, (_, i) => i + 1), // Creates an array from 1 to 30
      //days: Array.from({ length: 30 }, (_, index) => index + 1),
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
    hoursOptions() {
      return Array.from({ length: 24 }, (_, i) => i + 1);
    },
    showOpenDialogButton() {
      return (
        this.selectedDays >= 1 &&
        this.selectedDays <= 30 &&
        this.averageHours != null &&
        this.selectedLocations[0] != "" &&
        this.selectedLocations[1] != "" &&
        this.selectedLocations[2] != ""
      );
    },
  },

  methods: {
    //limit the average hours [from 1-24]
    adjustAverageHours() {
      if (this.averageHours < 1) {
        this.averageHours = 1;
      } else if (this.averageHours > 24) {
        this.averageHours = 24;
      }
    },
    submitData() {
      if (
        this.selectedDays !== "" &&
        this.averageHours !== null &&
        this.selectedLocations.some((location) => location !== "")
      ) {
        if (this.selectedDays >= 1 && this.selectedDays <= 30) {
          if (this.averageHours >= 1 && this.averageHours <= 24) {
            const requestData = {
              locations: this.selectedLocations,
              selectedDays: this.selectedDays,
              averageHours: this.averageHours,
            };
            this.loading = true;
            fetch("http://127.0.0.1:5000/submitcompactdata", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(requestData),
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
                console.log(data);
                this.loading = false;
                console.log(this.output_text);
              })
              .catch((error) => {
                console.error("API error:", error);
                this.loading = false;
              });
          } else {
            alert("Please enter a valid value for average hours (1-24).");
          }
        } else {
          alert("Please enter a valid value for selected days (1-30).");
        }
      } else {
        alert("Please fill in all fields.");
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/css/Based_Element.css";
@import "../assets/css/Action_Element.css";
@import "../assets/css/custom_main_font.css";
label,
input {
  margin-bottom: 10px;
}
input,
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

.fixed-autocomplete {
  width: 60%;
  height: 55px;
  box-sizing: border-box;
  background-color: #e2fefa;
  margin: 0 auto;
  display: block;
  text-align: center;
}

.select_Head_day {
  padding: 30px;
}
</style>

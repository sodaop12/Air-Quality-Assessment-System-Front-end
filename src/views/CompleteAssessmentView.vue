<template>
  <div class="container">
    <div class="left-sidebar">
      <!-- Left sidebar content -->
    </div>
    <div class="content">
      <!-- Main content -->
      <div class="page-links">
        <router-link to="/compact_as" class="page-link">Compact</router-link>
        <router-link to="/complete_as" class="page-link-middle"
          >Complete Assessment</router-link
        >
        <router-link to="/calendar_as" class="page-link">Calendar</router-link>
      </div>
      <div>
        <h3 class="section-title">Data range (1/5/2023 - 30/5/2023)</h3>
        <div class="form-wrapper">
          <div class="form-left">
            <label for="dropdown" class="select_Head_day"
              >Select Day Range:</label
            >
          </div>
          <div class="form-right">
            <v-autocomplete
              label="-- How many days --"
              v-model="selectedDays"
              :items="days"
              outlined
              class="fixed-autocomplete"
            ></v-autocomplete>
          </div>
        </div>
        <div class="DH_Box"></div>
        <!-- START 1-7 DAY [1]------------------------------------------------------------>
        <div v-if="selectedDays >= 1 && selectedDays <= 7">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Hours</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="inputIndex in additionalInputsCount" :key="inputIndex">
                <td>
                  <label
                    class="select_day"
                    :for="'additionalInput' + inputIndex"
                    >Enter Date :</label
                  >
                  <input
                    :id="'additionalInput' + inputIndex"
                    type="number"
                    v-model="additionalDays[inputIndex - 1]"
                    min="1"
                    max="30"
                    @input="adjustAdditionalDate(inputIndex - 1)"
                    style="border-bottom: 1px solid black"
                  />
                </td>
                <td>
                  <label class="select_day" :for="'hoursInput' + inputIndex"
                    >Enter hours:</label
                  >
                  <input
                    :id="'hoursInput' + inputIndex"
                    type="number"
                    v-model="additionalHours[inputIndex - 1]"
                    min="1"
                    max="24"
                    @input="adjustAdditionalHours(inputIndex - 1)"
                    style="border-bottom: 1px solid black"
                  />
                </td>
                <td>
                  <label class="select_day" for="locationDropdown"
                    >Select Locations:</label
                  >
                  <v-autocomplete
                    id="locationDropdown"
                    v-model="selectedLocations[inputIndex - 1]"
                    label=""
                    :items="locations"
                    item-text="location"
                    item-value="location"
                    class="fixed-autocomplete_2"
                    variant="underlined"
                    clearable
                  ></v-autocomplete>
                </td>
              </tr>
            </tbody>
          </table>

          <h3 class="section-title">Congenital Disease</h3>
          <div class="disease_ex">
            <label
              >Are you having any health problems? (such as congenital disease,
              illness and others)</label
            >
            <v-textarea
              label="-- Additional details --"
              variant="outlined"
              :id="'textInput' + inputIndex"
              type="text"
              v-model="additionalText"
              maxlength="50"
            ></v-textarea>
          </div>
          <h3 class="section-title">Summary</h3>
          <table>
            <!-- Table header -->
            <thead>
              <tr>
                <th>Field</th>
                <th>Data</th>
              </tr>
            </thead>

            <!-- Table body -->
            <tbody>
              <!-- Display selectedDays input -->
              <tr>
                <td>Days Range:</td>
                <td>{{ selectedDays }}</td>
              </tr>

              <!-- Display additionalDays inputs -->
              <tr v-for="(additionalDay, index) in additionalDays" :key="index">
                <td>Date for Day {{ index + 1 }}</td>
                <td>{{ additionalDay }}{{ month_now }}</td>
              </tr>

              <!-- Display additionalHours inputs -->
              <tr
                v-for="(additionalHour, index) in additionalHours"
                :key="index"
              >
                <td>Average Hour {{ index + 1 }}:</td>
                <td>{{ additionalHour }}</td>
              </tr>

              <!-- Display selectedLocations inputs -->
              <tr
                v-for="(selectedLocation, index) in selectedLocations"
                :key="index"
              >
                <td>Location {{ index + 1 }}:</td>
                <td>{{ selectedLocation }}</td>
              </tr>

              <!-- Display additionalText input -->
              <tr>
                <td>Congenital Disease:</td>
                <td>{{ additionalText }}</td>
              </tr>
            </tbody>
          </table>

          <!-- END 1-7 DAY [1]------------------------------------------------------------>
        </div>
        <!-- START 8-29 DAY [2]------------------------------------------------------------>
        <div v-if="selectedDays >= 8 && selectedDays <= 29">
          <table>
            <thead>
              <tr>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <label class="select_day" :for="'startDateInput' + inputIndex"
                    >Start Date:</label
                  >
                  <input
                    :id="'startDateInput' + inputIndex"
                    type="number"
                    v-model="additionalStartDate"
                    min="1"
                    max="30"
                    @input="adjustStartDate"
                    class="fixed-autocomplete"
                    variant="outlined"
                  />
                </td>
                <td>
                  <label class="select_day" :for="'endDateInput' + inputIndex"
                    >End Date:</label
                  >
                  <input
                    :id="'endDateInput' + inputIndex"
                    type="number"
                    v-model="additionalEndDate"
                    min="1"
                    max="30"
                    @input="adjustEndDate"
                    class="fixed-autocomplete"
                    variant="outlined"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <!-- finish Start-End -->
          <h3 class="section-title-mini">Time</h3>
          <label class="select_day">Average hours:</label>
          <input
            :id="'hoursInput' + inputIndex"
            type="number"
            v-model="Hours"
            @input="adjustAverageHours"
            class="fixed-autocomplete"
            variant="outlined"
          />
          <h3 class="section-title-mini">Location</h3>
          <label class="select_day" for="location1">Select Location 1:</label>
          <v-autocomplete
            id="location1"
            class="fixed-autocomplete"
            variant="outlined"
            v-model="selectedLocation30[0]"
            label="-- Select Location 1 --"
            :items="locations"
            item-text="location"
            item-value="location"
            return-object
          ></v-autocomplete>

          <label class="select_day" for="location1">Select Location 2:</label>
          <v-autocomplete
            id="location1"
            class="fixed-autocomplete"
            variant="outlined"
            v-model="selectedLocation30[1]"
            label="-- Select Location 2 --"
            :items="locations"
            item-text="location"
            item-value="location"
            return-object
          ></v-autocomplete>

          <label class="select_day" for="location1">Select Location 3:</label>
          <v-autocomplete
            id="location1"
            class="fixed-autocomplete"
            variant="outlined"
            v-model="selectedLocation30[2]"
            label="-- Select Location 3 --"
            :items="locations"
            item-text="location"
            item-value="location"
            return-object
          ></v-autocomplete>

          <h3 class="section-title">Congenital Disease</h3>
          <div class="disease_ex">
            <label
              >Are you having any health problems? (such as congenital disease,
              illness and others):</label
            >
            <v-textarea
              label="-- Additional details --"
              variant="outlined"
              :id="'textInput' + inputIndex"
              type="text"
              v-model="additionalText"
              maxlength="50"
            ></v-textarea>
          </div>
          <h3 class="section-title">Summary</h3>
          <table>
            <!-- Table header -->
            <thead>
              <tr>
                <th>Field</th>
                <th>Data</th>
              </tr>
            </thead>

            <!-- Table body -->
            <tbody>
              <!-- Display selectedDays input -->
              <tr>
                <td>Days Range:</td>
                <td>{{ selectedDays }}</td>
              </tr>

              <!-- Display additionalStartDate and additionalEndDate inputs -->
              <tr>
                <td>Start Date:</td>
                <td>{{ additionalStartDate }}{{ month_now }}</td>
              </tr>
              <tr>
                <td>End Date:</td>
                <td>{{ additionalEndDate }}{{ month_now }}</td>
              </tr>

              <!-- Display selectedLocation30 inputs -->
              <tr
                v-for="(selectedLocation, index) in selectedLocation30"
                :key="index"
              >
                <td>Location {{ index + 1 }} (30 days):</td>
                <td>{{ selectedLocation }}</td>
              </tr>

              <!-- Display Hours input -->
              <tr>
                <td>Average Hours:</td>
                <td>{{ Hours }}</td>
              </tr>

              <!-- Display additionalText input -->
              <tr>
                <td>Congenital Disease:</td>
                <td>{{ additionalText }}</td>
              </tr>
            </tbody>
          </table>

          <!-- END 8-29 DAY [2]------------------------------------------------------------>
        </div>
        <!-- START 30 DAY [3]------------------------------------------------------------>
        <div v-if="selectedDays == 30">
          <h3 class="section-title-mini">Time</h3>
          <div class="form-wrapper">
            <div class="form-left">
              <label class="select_Head_day">Average hours:</label>
            </div>
            <div class="form-right">
              <input
                :id="'hoursInput' + inputIndex"
                type="number"
                v-model="Hours"
                @input="adjustAverageHours"
                class="fixed-autocomplete"
                variant="outlined"
              />
            </div>
          </div>
          <h3 class="section-title-mini">Location</h3>
          <label class="select_day" for="location1">Select Location 1:</label>
          <v-autocomplete
            id="location1"
            class="fixed-autocomplete"
            variant="outlined"
            v-model="selectedLocation30[0]"
            label="-- Select Location 1 --"
            :items="locations"
            item-text="location"
            item-value="location"
            return-object
            close-on-select
          ></v-autocomplete>

          <label class="select_day" for="location1">Select Location 2:</label>
          <v-autocomplete
            id="location1"
            class="fixed-autocomplete"
            variant="outlined"
            v-model="selectedLocation30[1]"
            label="-- Select Location 2 --"
            :items="locations"
            item-text="location"
            item-value="location"
            return-object
            close-on-select
          ></v-autocomplete>

          <label class="select_day" for="location1">Select Location 3:</label>
          <v-autocomplete
            id="location1"
            class="fixed-autocomplete"
            variant="outlined"
            v-model="selectedLocation30[2]"
            label="-- Select Location 3 --"
            :items="locations"
            item-text="location"
            item-value="location"
            return-object
            close-on-select
          ></v-autocomplete>

          <h3 class="section-title">Congenital Disease</h3>
          <div class="disease_ex">
            <label
              >Are you having any health problems? (such as congenital disease,
              illness and others):</label
            >
            <v-textarea
              label="-- Additional details --"
              variant="outlined"
              :id="'textInput' + inputIndex"
              type="text"
              v-model="additionalText"
              maxlength="50"
            ></v-textarea>
          </div>
          <h3 class="section-title">Summary</h3>
          <table>
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <!-- Display selectedDays input -->
              <tr>
                <td>Days Range:</td>
                <td>{{ selectedDays }}</td>
              </tr>

              <!-- Display selectedLocation30 inputs -->
              <tr
                v-for="(selectedLocation, index) in selectedLocation30"
                :key="index"
              >
                <td>Location {{ index + 1 }} (30 days):</td>
                <td>{{ selectedLocation }}</td>
              </tr>

              <!-- Display Hours input -->
              <tr>
                <td>Average Hours:</td>
                <td>{{ Hours }}</td>
              </tr>

              <!-- Display additionalText input -->
              <tr>
                <td>Congenital Disease:</td>
                <td>{{ additionalText }}</td>
              </tr>
            </tbody>
          </table>

          <!-- END 30 DAY [3]------------------------------------------------------------>
        </div>

        <!-- Loading pop-up -->
        <div class="loading-popup" v-if="loading">
          <div class="loading-text" v-if="responseReceived">
            Loading Result...
          </div>
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
          <v-card title="Complete Assessment">
            <v-card-text>
              <h3 class="section-title" v-if="responseReceived">Report</h3>
              <v-table v-if="responseReceived">
                <tr>
                  <td>Average AQI:</td>
                  <td>{{ calculateaverage.toFixed(2) }}</td>
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
      showWarning: false,
      selectedDays: "",
      additionalDays: [],
      additionalHours: [],
      selectedLocations: [],
      selectedLocation30: ["", "", ""],
      output_text: null,
      Hours: null,
      additionalText: null,
      additionalStartDate: null,
      additionalEndDate: null,
      responseReceived: false,
      calculateaverage: null,
      max: null,
      min: null,
      Cgrs: null,
      totalhour: null,
      month_now: "/5/2023",
      days: Array.from({ length: 30 }, (_, index) => index + 1), // Generate an array of numbers from 1 to 30
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
      if (this.selectedDays >= 1 && this.selectedDays <= 7) {
        if (
          this.additionalDays != null &&
          this.additionalHours != null &&
          this.selectedLocations != "" &&
          this.additionalText != null
        ) {
          return true;
        }
      } else if (this.selectedDays >= 8 && this.selectedDays <= 29) {
        if (
          this.additionalStartDate != null &&
          this.additionalEndDate != null &&
          this.Hours != null &&
          this.selectedLocation30[0] != "" &&
          this.selectedLocation30[1] != "" &&
          this.selectedLocation30[2] != "" &&
          this.additionalText != null
        ) {
          return true;
        }
      } else if (this.selectedDays === 30) {
        if (
          this.additionalDays != null &&
          this.additionalHours != null &&
          this.selectedLocation30[0] != "" &&
          this.selectedLocation30[1] != "" &&
          this.selectedLocation30[2] != "" &&
          this.additionalText != null
        ) {
          return true;
        }
      }
      return false; // Default case
    },
    additionalInputsCount() {
      return this.selectedDays;
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
  },
  /*
  watch: {
    additionalStartDate(value) {
      this.additionalStartDate = value;
    },
    additionalEndDate(value) {
      this.additionalEndDate = value;
    },
  },*/
  methods: {
    //limit the specific date [from 1-30], for 1-7
    adjustAdditionalDate(index) {
      if (this.additionalDays[index] < 1) {
        this.additionalDays[index] = 1;
      } else if (this.additionalDays[index] > 30) {
        this.additionalDays[index] = 30;
      }
    },
    //limit the average hours [from 1-24],   for 1-7
    adjustAdditionalHours(index) {
      if (this.additionalHours[index] < 1) {
        this.additionalHours[index] = 1;
      } else if (this.additionalHours[index] > 24) {
        this.additionalHours[index] = 24;
      }
    },
    //limit the average hours [from 1-24], for 8-29/ 30
    adjustAverageHours() {
      if (this.Hours < 1) {
        this.Hours = 1;
      } else if (this.Hours > 24) {
        this.Hours = 24;
      }
    },
    //limit the Day range between Start - End [from 1-30], for 8-29
    adjustStartDate() {
      if (this.additionalStartDate > 30) {
        this.additionalStartDate = 30;
      } else if (this.additionalStartDate < 1) {
        this.additionalStartDate = 1;
      } else if (
        this.additionalStartDate + this.selectedDays >
        30 - this.selectedDays
      ) {
        this.additionalStartDate = 30 - this.selectedDays;
      }
    },
    adjustEndDate() {
      if (this.additionalEndDate > 30) {
        this.additionalEndDate = 30;
      } else if (
        this.additionalEndDate > this.additionalStartDate + this.selectedDays ||
        this.additionalEndDate < this.additionalStartDate + this.selectedDays
      ) {
        this.additionalEndDate = this.additionalStartDate + this.selectedDays;
      }
    },
    //-----------------------------------------------------------
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
      // Check if all required fields are filled
      if (this.selectedDays >= 1 && this.selectedDays <= 7) {
        for (let i = 0; i < this.additionalInputsCount; i++) {
          if (
            !this.additionalDays[i] ||
            !this.additionalHours[i] ||
            !this.selectedLocations[i] ||
            !this.additionalText
          ) {
            this.showWarning = true;
            alert("Please fill in all fields.");
            return;
          }
        } // all condition are filled

        // If all fields are filled in, continue with the submission logic
        this.showWarning = false;
        // ... continue with the submission logic
        const data = {
          selectedDays: this.selectedDays,
          additionalDays: this.additionalDays,
          additionalStartDate: this.additionalStartDate,
          additionalEndDate: this.additionalEndDate,
          additionalHours: this.additionalHours,
          additionalText: this.additionalText,
          locations: this.selectedLocations,
          locations30: this.selectedLocation30,
          hours30: this.Hours,
        };
        this.loading = true;
        fetch("http://127.0.0.1:5000/submitcompletedata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            this.max = data.max;
            this.min = data.min;
            this.Cgrs = data.CGRS;
            this.calculateaverage = data.calculateaverage;
            this.output_text = data.output_text;
            this.responseReceived = true;
            this.loading = false;
            console.log(this.output_text);
          })
          .catch((error) => {
            console.error("API error:", error);
            this.loading = false;
            // Refresh the page
            window.location.reload();
            this.showWarning = true;

            console.log(error);
            alert("Do not found API!!");
          });
      } else if (this.selectedDays >= 8 && this.selectedDays <= 29) {
        if (
          !this.additionalStartDate ||
          !this.additionalEndDate ||
          !this.Hours ||
          !this.selectedLocation30[0] ||
          !this.selectedLocation30[1] ||
          !this.selectedLocation30[2] ||
          !this.additionalText
        ) {
          this.showWarning = true;
          alert("Please fill in all fields.");
          return;
        }

        // If all fields are filled in, continue with the submission logic
        this.showWarning = false;
        // ... continue with the submission logic
        const data = {
          selectedDays: this.selectedDays,
          additionalDays: this.additionalDays,
          additionalStartDate: this.additionalStartDate,
          additionalEndDate: this.additionalEndDate,
          additionalHours: this.additionalHours,
          additionalText: this.additionalText,
          locations: this.selectedLocations,
          locations30: this.selectedLocation30,
          hours30: this.Hours,
        };
        this.loading = true;
        fetch("http://127.0.0.1:5000/submitcompletedata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            this.max = data.max;
            this.min = data.min;
            this.Cgrs = data.CGRS;
            this.calculateaverage = data.calculateaverage;
            this.output_text = data.output_text;
            this.responseReceived = true;
            this.loading = false;
          })
          .catch((error) => {
            console.error("API error:", error);
            this.loading = false;
            // Refresh the page
            window.location.reload();
            this.showWarning = true;

            console.log(error);
            alert("Do not found API!!");
          });
      } else if (this.selectedDays == 30) {
        if (
          !this.Hours ||
          !this.selectedLocation30[0] ||
          !this.selectedLocation30[1] ||
          !this.selectedLocation30[2] ||
          !this.additionalText
        ) {
          this.showWarning = true;
          alert("Please fill in all fields.");
          return;
        }
      }
      // If all fields are filled in, continue with the submission logic
      this.showWarning = false;
      // ... continue with the submission logic
      const data = {
        selectedDays: this.selectedDays,
        additionalDays: this.additionalDays,
        additionalStartDate: this.additionalStartDate,
        additionalEndDate: this.additionalEndDate,
        additionalHours: this.additionalHours,
        additionalText: this.additionalText,
        locations: this.selectedLocations,
        locations30: this.selectedLocation30,
        hours30: this.Hours,
      };
      this.loading = true;
      fetch("http://127.0.0.1:5000/submitcompletedata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          this.max = data.max;
          this.min = data.min;
          this.Cgrs = data.CGRS;
          this.calculateaverage = data.calculateaverage;
          this.output_text = data.output_text;
          this.responseReceived = true;
          this.loading = false;
        })
        .catch((error) => {
          console.error("API error:", error);
          this.loading = false;
          // Refresh the page
          window.location.reload();
          this.showWarning = true;
          console.log(error);
          alert("Do not found API!!");
        });
    },
    resetResult() {
      this.max = null;
      this.min = null;
      this.Cgrs = null;
      this.calculateaverage = null;
      this.output_text = null;
      this.responseReceived = false;
    },
  },
  // Assuming you have a watcher for the selectedDays property
  watch: {
    selectedDays() {
      this.resetResult();
    },
  },
};
</script>
<style scoped>
@import "../assets/css/Based_Element.css";
@import "../assets/css/Action_Element.css";
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
  margin: 0 auto;
  display: block;
  text-align: center;
  margin-bottom: 5px;
}

.disease_des {
  background-color: #e2fefa;
  display: flex;
  justify-content: center;
}
.disease_ex {
  text-align: center;
  font-size: 17px;
  font-weight: 550;
  color: #00926f;
}

.form-wrapper {
  display: flex;
  align-items: center;
}
.form-left,
.form-right {
  width: 100%;
  align-items: center;
}
.form-right {
  position: relative;
}
.select {
  width: 100%;
}
.form-left {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
}

.select_day {
  font-size: 14px; /* Change the font-size as desired */
  font-weight: 600;
  padding-left: 5%;
  color: #00926f;
}
.select_Head_day {
  font-size: 20x; /* Change the font-size as desired */
  font-weight: 700;
  color: #00926f;
}
.option_head,
.option_day {
  background-color: #e2fefa; /* Change the background color as desired */
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

.fixed-autocomplete_2 {
  width: 60%;
  height: 55px;
  box-sizing: border-box;
  margin: 0 auto;
  display: block;
  text-align: center;
}
</style>

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
        <h2 class="section-title">Average Day&Hours</h2>
        <div>
          <label for="dropdown"
            >During the last 30 days, on average, how many days have you spent
            outdoors?</label
          >
          <div class="DH_Box"></div>
          <select id="dropdown" v-model="selectedDays">
            <option value="">-- How much days --</option>
            <option v-for="day in days" :value="day" :key="day">
              {{ day }}
            </option>
          </select>
          <div class="DH_Box"></div>
          <label for="averageHours"
            >How much average hours have you spent outdoors each day?</label
          >
          <input
            type="number"
            id="averageHours"
            v-model="averageHours"
            required
            placeholder="-- Average hours --"
          />
        </div>
      </section>

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

      <section class="Report">
        <h2 class="section-title">Summary</h2>
        <div class="report-content">
          <table>
            <tr>
              <th>Content</th>
              <th>Information</th>
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
            <div class="loading-text">Loading Result...</div>
          </div>
          <!-- Other paragraphs of text -->
          <div class="button-container">
            <button @click="submitData" class="submit-button">Submit</button>
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
      selectedDays: "",
      calculateaverage: null,
      totalhour: null,
      output_text: null,
      responseReceived: false,
      averageHours: null,
      max: null,
      min: null,
      Cgrs: null,
      selectedLocations: ["", "", ""],
      days: Array.from({ length: 30 }, (_, index) => index + 1),
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
  methods: {
    submitData() {
      if (this.selectedDays !== "" && this.averageHours !== null) {
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
</style>

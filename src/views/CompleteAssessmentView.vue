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
              <label for="locationDropdown">Select Locations:</label>
              <select
                id="locationDropdown"
                v-model="selectedLocations[inputIndex - 1]"
              >
                <option
                  v-for="location in locations"
                  :value="location"
                  :key="location"
                >
                  {{ location }}
                </option>
              </select>
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
            <label for="locationDropdown">Select Locations:</label>
            <select
              id="locationDropdown"
              v-model="selectedLocations[inputIndex - 1]"
            >
              <option
                v-for="location in locations"
                :value="location"
                :key="location"
              >
                {{ location }}
              </option>
            </select>
          </div>
          <div v-if="selectedDays == 30">
            <label>average hours</label>
            <input
              :id="'hoursInput' + inputIndex"
              type="number"
              v-model="Hours"
            />
            <label for="location1">Select Location 1:</label>
            <select id="location1" v-model="selectedLocation30[0]">
              <option value="">-- Select Location --</option>
              <option
                v-for="(location, index) in locations"
                :key="index"
                :value="location"
              >
                {{ location }}
              </option>
            </select>
            <label for="location1">Select Location 2:</label>
            <select id="location1" v-model="selectedLocation30[1]">
              <option value="">-- Select Location --</option>
              <option
                v-for="(location, index) in locations"
                :key="index"
                :value="location"
              >
                {{ location }}
              </option>
            </select>
            <label for="location1">Select Location 3:</label>
            <select id="location1" v-model="selectedLocation30[2]">
              <option value="">-- Select Location --</option>
              <option
                v-for="(location, index) in locations"
                :key="index"
                :value="location"
              >
                {{ location }}
              </option>
            </select>
          </div>
          <pre>{{ selectedLocation30 }}</pre>
          <button @click="submitData">Submit</button>
        </div>
        <div>
          <p v-if="responseReceived">{{ calculateaverage }}</p>
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
      selectedLocations: [],
      selectedLocation30: ["", "", ""],
      Hours: null,
      additionalText: null,
      additionalStartDate: null,
      additionalEndDate: null,
      responseReceived: false,
      calculateaverage: null,
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
      fetch("http://127.0.0.1:5000/submitcompletedata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          this.calculateaverage = data.calculateaverage;
          this.responseReceived = true;
        })
        .catch((error) => {
          console.error("API error:", error);
          this.loading = false;
        });
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

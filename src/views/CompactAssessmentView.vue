<template>
  <div>
    <label for="dropdown">Select number of days:</label>
    <select id="dropdown" v-model="selectedDays">
      <option value="">Select</option>
      <option v-for="day in days" :value="day" :key="day">{{ day }}</option>
    </select>

    <label for="averageHours">Average Hours Outside:</label>
    <input type="number" id="averageHours" v-model="averageHours" required />
  </div>
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
  <button @click="submitData">Submit</button>

  <pre>{{ selectedDays }}</pre>
  <pre>{{ averageHours }}</pre>
  <pre>{{ selectedLocations }}</pre>
  <p v-if="responseReceived">averageAQI:{{ calculateaverage }}</p>
  <p v-if="responseReceived">totalhour:{{ totalhour }}</p>
  <p v-if="responseReceived">chatGPT suggestion{{ output_text }}</p>
</template>

<script>
export default {
  data() {
    return {
      selectedDays: "",
      calculateaverage: null,
      totalhour: null,
      output_text: null,
      responseReceived: false,
      averageHours: null,
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
      if (this.numberOfDays !== null && this.averageHours !== null) {
        const requestData = {
          locations: this.selectedLocations,
          selectedDays: this.selectedDays,
          averageHours: this.averageHours,
        };

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
            console.log(data);
          })
          .catch((error) => {
            console.error("API error:", error);
          });
      } else {
        alert("Please fill in all fields.");
      }
    },
  },
};
</script>

<style scoped>
label,
input {
  margin-bottom: 10px;
}
</style>

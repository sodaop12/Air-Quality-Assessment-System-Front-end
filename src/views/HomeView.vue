<template>
  <section class="part1">
    <h1>Welcome to Air Quality Assessment System</h1>
    <p>
      The Air Quality Assessment System is a web application designed to giving
      users knowledge about their health conditions as they relate to PM2.5
    </p>
  </section>
  <section class="part2">
    <v-btn rounded="sm" size="x-large" density="compact">
      <router-link to="/compact_as" class="custom-font">
        Compact Assessment
      </router-link>
    </v-btn>
  </section>
  <section class="part3">
    <v-btn rounded="sm" size="x-large" density="compact">
      <router-link to="/complete_as" class="custom-font">
        Complete Assessment
      </router-link>
    </v-btn>
  </section>
  <section class="part4">
    <v-btn rounded="sm" size="x-large" density="compact">
      <router-link to="/calendar_as" class="custom-font">
        Calendar Assessment
      </router-link>
    </v-btn>
  </section>
</template>

<script>
// @ is an alias to /src

export default {};
</script>

<style scoped>
@import "../assets/css/Based_Element.css";
.part1,
.part2,
.part3,
.part4 {
  height: 500px;
}
.part1 {
  height: 200px;
  background-color: #eafffc; /* Your background color for part1 */
}

.part2 {
  height: 200px;
  background-color: #ffefc1; /* Your background color for part2 */
}

.part3 {
  height: 200px;
  background-color: #d6f6ff; /* Your background color for part3 */
}

.part4 {
  height: 200px;
  background-color: #ffe6d5; /* Your background color for part4 */
}

.container {
  background-color: #eafffc;
  display: flex;
  align-items: center;
  justify-content: center;
}
.intro {
  text-align: center;
  margin-top: 50px;
}

.intro h1 {
  font-size: 28px;
  font-weight: bold;
}

.intro p {
  font-size: 18px;
  margin-top: 20px;
  line-height: 1.5;
}
.try-it {
  margin-top: 40px;
  padding: 10px 20px;
  font-size: 18px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
/* In your CSS stylesheet */
.custom-font {
  font-size: 24px;
  font-weight: 700;
  text-decoration: none;
}
</style>

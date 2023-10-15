<template>
  <section class="part1">
    <div>
      <div
        v-motion
        :initial="{ opacity: 0, x: 100 }"
        :visible="{ opacity: 1, x: 0 }"
      >
        <h1>Welcome to Air Quality Assessment System</h1>
        <p>
          The Air Quality Assessment System is a web application designed to
          giving users knowledge about their health conditions as they relate to
          PM2.5
        </p>
      </div>
    </div>
  </section>
  <section class="part2">
    <div
      class="background-image"
      style="background-image: url('path_to_image_part2.jpg')"
    >
      <div class="center-content">
        <div class="button-container">
          <v-btn
            class="custom-button"
            rounded="sm"
            size="x-large"
            density="compact"
            v-motion
            :initial="{ opacity: 0, x: -100 }"
            :visible="{ opacity: 1, x: 0 }"
          >
            <router-link to="/compact_as" class="custom-font">
              Compact Assessment
            </router-link>
          </v-btn>
          <p class="button-text">Compact Assessment</p>
        </div>
      </div>
    </div>
  </section>
  <section class="part3">
    <div class="background-image">
      <div class="center-content">
        <v-btn
          rounded="sm"
          size="x-large"
          density="compact"
          v-motion
          :initial="{ opacity: 0, x: -100 }"
          :visible="{ opacity: 1, x: 0 }"
        >
          <router-link to="/complete_as" class="custom-font">
            Complete Assessment
          </router-link>
        </v-btn>
      </div>
    </div>
  </section>
  <section class="part4">
    <div class="background-image">
      <div class="center-content">
        <v-btn
          rounded="sm"
          size="x-large"
          density="compact"
          v-motion
          :initial="{ opacity: 0, x: -100 }"
          :visible="{ opacity: 1, x: 0 }"
        >
          <router-link to="/calendar_as" class="custom-font">
            Calendar Assessment
          </router-link>
        </v-btn>
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src

export default {};
</script>

<style scoped>
@import "../assets/css/Based_Element.css";
.background-image {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  position: relative;
}

.part1,
.part2,
.part3,
.part4 {
  display: flex;
  align-items: center;
  justify-content: center;
}
.part1 {
  background-image: url("~@/assets/images/home-bg.jpg");
  height: 800px;
  background-image: url("@/assets/images/home-bg.jpg");
  background-size: cover; /* Set the background image size to cover */
  background-repeat: no-repeat; /* Prevent background image from repeating */
  background-position: center center;
  position: relative;
}

.part2 {
  height: 400px;
  background-color: #acfff0; /* Your background color for part2 */
}

.part3 {
  height: 400px;
  background-color: #dafef8; /* Your background color for part3 */
}

.part4 {
  height: 400px;
  background-color: #acfff0; /* Your background color for part4 */
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

.custom-button {
  width: 100%;
}

.button-text {
  font-size: 24px;
  text-align: center;
  margin: 0;
}
</style>

<template>
  <section class="part1">
    <div>
      <div v-motion-fade>
        <h1>Welcome to Air Quality Assessment System</h1>
        <p>
          The Air Quality Assessment System is a web application designed to
          giving users knowledge about their health conditions as they relate to
          PM2.5
        </p>
        <div style="padding-top: 10px"></div>
        <div v-motion-roll-bottom>
          <v-btn density="compact" style="height: 50px">
            <router-link to="/compact_as" class="custom-font2">
              Let's try
            </router-link>
          </v-btn>
        </div>
      </div>
    </div>
  </section>
  <section class="part2-2" style="width: 100%; height: auto">
    <v-window v-model="window" show-arrows style="width: 100%; height: 100%">
      <v-window-item v-for="(item, index) in items" :key="index" class="card">
        <v-btn
          rounded="sm"
          size="x-large"
          density="compact"
          variant="text"
          style="width: 100%; height: 100px; background-color: #ecfffc"
        >
          <router-link :to="item.link" class="custom-font">
            {{ item.title }}
          </router-link>
        </v-btn>
        <p class="button-text" style="padding: 20px">
          {{ item.description }}
        </p>
      </v-window-item>
    </v-window>
  </section>
</template>

<script>
export default {
  data() {
    return {
      window: 0, // Initialize this with the desired active item index
      items: [
        {
          title: "Compact Assessment",
          description:
            "Compact assessments are user-friendly and take minimal time to complete. They are designed for quick and efficient evaluation.",
          link: "/compact_as",
        },
        {
          title: "Complete Assessment",
          description:
            "Complete assessments provide a comprehensive evaluation and cover all relevant aspects. They may take more time to complete but offer a thorough analysis.",
          link: "/complete_as",
        },
        {
          title: "Calendar Assessment",
          description:
            "Calendar assessments are designed to help you plan and manage your schedule effectively. They provide tools for organizing your time and tasks.",
          link: "/calendar_as",
        },
      ],
    };
  },
};
</script>

<style scoped>
@import "../assets/css/Based_Element.css";

.card {
}
.background-image {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  position: relative;
}

.part2,
.part3,
.part4 {
  display: flex;
  align-items: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  position: relative;
  height: 400px; /* Adjust the height as needed */
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
  font-size: larger;
  font-weight: bolder;
  background-image: url("~@/assets/images/home-bg.jpg");
  height: 800px;
  background-size: cover; /* Set the background image size to cover */
  background-repeat: no-repeat; /* Prevent background image from repeating */
  background-position: center center;
  position: relative;
}

.part2-2 {
  height: 200px;

  background-color: #ecfffc; /* Your background color for part3 */
}

.part3 {
  height: 400px;

  background-color: #acfff0; /* Your background color for part2 */
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
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
/* In your CSS stylesheet */
.custom-font {
  font-size: 24px;
  font-weight: 700;
}
.custom-font2 {
  font-size: 16px;
  font-weight: 700;
}
.custom-button {
  width: 100%;
}

.button-text {
  font-size: 20px;
  text-align: center;
  margin: 0;
}
</style>

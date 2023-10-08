<template>
  <div class="container">
    <div class="intro">
      <div class="content-row">
        <h1>Welcome to Air Quality Assessment System</h1>
        <p>
          The Air Quality Assessment System is a web application designed to
          giving users knowledge about their health conditions as they relate to
          PM2.5
        </p>
        <h1>Let's try some!</h1>
        <div class="column-container">
          <v-btn rounded="sm" size="x-large" density="compact">
            <router-link to="/compact_as" class="custom-font">
              Compact Assessment
            </router-link>
          </v-btn>
          <v-btn rounded="sm" size="x-large" density="compact">
            <router-link to="/complete_as" class="custom-font">
              Complete Assessment
            </router-link>
          </v-btn>
          <v-btn rounded="sm" size="x-large" density="compact">
            <router-link to="/calendar_as" class="custom-font">
              Calendar Assessment
            </router-link>
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {};
</script>

<style scoped>
@import "../assets/css/Based_Element.css";

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
.content-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 50px;
  text-align: center;
}

.column-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  margin-top: 40px;
}

.column {
  background-color: #d1fff7;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
  border: 4px solid #333;
}

.column:hover {
  background-color: #71ffe5;
  padding: 10px;
}
.column-description {
  margin-left: 10px;
  margin-right: 10px;
}

/* In your CSS stylesheet */
.custom-font {
  font-size: 24px;
  font-weight: 700;
  text-decoration: none;
}
</style>

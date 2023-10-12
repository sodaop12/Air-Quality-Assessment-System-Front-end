<template>
  <div class="container">
    <div class="content-box">
      <!-- Main content -->
      <h1>Login</h1>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            maxlength="20"
            required
          />
          <br />
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            maxlength="20"
            required
          />
        </div>
        <br />
        <button class="submit-button" type="submit">Login</button>
      </form>
      <span v-show="showSpan"> </span>
      <p></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      showSpan: false,
    };
  },
  methods: {
    login() {
      fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            this.$store.dispatch("setLoggedIn", true);
            this.$router.push("/");
          } else {
            alert("Incorrect username or password");
            this.showSpan = true;
          }
        })
        .catch((error) => {
          console.error("Login error:", error);
        });
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #acfff0;
}

.content-box {
  width: 50%;
  background-color: #eafffc; /* Background color for main content */
  padding: 20px;
  text-align: center;
}
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.form-group label {
  text-align: left;
  margin-bottom: 5px;
  margin-left: 20%; /* Adjust the left margin as desired */
  font-family: "Inter", sans-serif; /* Change the font family */
  font-weight: bold;
}

.form-group input {
  width: 70%;
  height: 40px;
  margin: 0 auto;
  background: #c1fff7;
}
h1 {
  color: #2c3e50;
}
/* for submit button */
.submit-button {
  background-color: #71ffe5; /* Set your desired button color here */
  width: 120px;
  color: #ffffff; /* Set the text color */
  border: none;
  border-radius: 25px; /* Set the desired border radius for a rounded shape */
  padding: 10px 10px;
  font-size: 16px;
  font-weight: bold;
  font-family: "Inter", sans-serif; /* Change the font family */
  color: #777777;
}

.submit-button:active {
  background-color: #00926f;
  color: white;
}
@media (max-width: 768px) {
  .content-box {
    width: 100%;
  }
}
.error-message {
}
</style>

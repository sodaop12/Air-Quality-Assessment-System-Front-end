<template>
  <div class="box">
    <div class="container">
      <div class="content">
        <!-- Main content -->
        <h1>Login Page</h1>
        <form @submit.prevent="login">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required />
          <br />
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
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
            alert("Login failed");
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
  width: 500px;
  height: 300px;
  justify-content: center;
  align-items: center;
  text-align: center;
}

h1 {
  color: #2c3e50;
}
.box {
  display: relative;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 100px;
  padding: 20px;
  text-align: center;
  background-color: #71ffe5;
}

.content {
  width: 50%;
  background-color: #eafffc; /* Background color for main content */
}

.bg {
  background-color: #71ffe5;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .content {
    width: 100%;
  }
}
</style>

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// MotionPlugin
import { MotionPlugin } from "@vueuse/motion";

const vuetify = createVuetify({ components, directives });

createApp(App)
  .use(store)
  .use(router)
  .use(vuetify)
  .use(MotionPlugin, {
    directives: {
      "v-motion-slide-left": {
        initial: {
          scale: 0,
          opacity: 0,
          x: -100,
        },
        visible: {
          scale: 1,
          opacity: 1,
          x: 0,
          delay: 2000,
        },
      },
    },
  })
  .mount("#app");

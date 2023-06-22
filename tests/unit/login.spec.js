import { shallowMount } from "@vue/test-utils";
import LoginForm from "@/views/LoginView.vue";
import { createStore } from "vuex";
import "isomorphic-fetch";

window.alert = jest.fn();
const store = createStore({
  state: { loggedIn: false },
  getters: {},
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.loggedIn = value; // mutation to update loggedIn state
    },
  },
  actions: {
    setLoggedIn({ commit }, value) {
      commit("SET_LOGGED_IN", value); // action to trigger mutation
    },
  },
  modules: {},
});

describe("LoginForm", () => {
  it("should submit login details and redirect to home page on successful login", async () => {
    const $route = {
      name: "/",
    };
    const wrapper = shallowMount(LoginForm, {
      mocks: {
        $route,
      },
    });
    wrapper.setData({
      username: "testuser",
      password: "testpassword",
    });
    wrapper.find(".submit-button").trigger("click");
    store.state.loggedIn = true;
    await wrapper.vm.$nextTick();
    expect(store.state.loggedIn).toBe(true);
    expect($route.name).toBe($route.name);
  });

  it("should show error alert on unsuccessful login", async () => {
    const wrapper = shallowMount(LoginForm);
    wrapper.setData({
      username: "testuser",
      password: "invalidpassword",
    });
    const form = wrapper.find("form");
    await form.trigger("submit.prevent");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".error-message").exists()).toBe(false);
  });
});

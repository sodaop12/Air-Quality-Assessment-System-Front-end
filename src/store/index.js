import { createStore } from "vuex";

export default createStore({
  state: { loggedIn: false, feedbackResponse: null, fetchedFeedback: [] },
  getters: {
    getFeedbackResponse(state) {
      return state.feedbackResponse;
    },
    getFetchedFeedback(state) {
      return state.fetchedFeedback;
    },
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.loggedIn = value; // mutation to update loggedIn state
    },
    setFeedbackResponse(state, response) {
      state.feedbackResponse = response;
    },
    setFetchedFeedback(state, feedback) {
      state.fetchedFeedback = feedback;
    },
  },
  actions: {
    setLoggedIn({ commit }, value) {
      commit("SET_LOGGED_IN", value); // action to trigger mutation
    },
    updateFeedbackResponse({ commit }, response) {
      commit("setFeedbackResponse", response);
    },
    async fetchFeedback({ commit }) {
      try {
        const response = await fetch("http://127.0.0.1:5000/get_feedback", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log("Fetched Feedback:", data.feedback);

        // Use the mutation to store fetched feedback
        commit("setFetchedFeedback", data.feedback);
      } catch (error) {
        console.error("API error:", error);
      }
    },
  },
  modules: {},
});

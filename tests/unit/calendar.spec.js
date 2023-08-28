// CalendarComponent.spec.js

import { mount } from "@vue/test-utils";
import CalendarComponent from "@/views/CalendarAssessmentView.vue";

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        calculateaverage: 10,
        totalhour: 100,
        max: 150,
        min: 50,
        CGRS: 2.4,
        output_text: "Some output text",
      }),
  })
);

describe("CalendarComponent", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(CalendarComponent);
  });

  it("submits data and displays results", async () => {
    // Simulate user interactions (e.g., selecting dates, entering data)
    // ...

    await wrapper.find(".submit-button").trigger("click");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.calculateaverage).toBe(10);
    expect(wrapper.vm.totalhour).toBe(100);
    expect(wrapper.vm.output_text).toBe("Some output text");
    expect(wrapper.vm.max).toBe(150);
    expect(wrapper.vm.min).toBe(50);
    expect(wrapper.vm.Cgrs).toBe(2.4);
  });

  it("toggles input fields when a day is clicked", async () => {
    // Simulate a click on a day button
    await wrapper.find(".day-button").trigger("click");

    // Wait for the Vue component to update after the click
    await wrapper.vm.$nextTick();

    // Assert that the input field is displayed
    expect(wrapper.find(".hours-input").exists()).toBe(true);

    // Simulate a second click on the same day button
    await wrapper.find(".day-button").trigger("click");

    // Wait for the Vue component to update after the click
    await wrapper.vm.$nextTick();

    wrapper.setData({ startDate: 5, endDate: 15 });

    // Test specific days to check if they're highlighted
    expect(wrapper.vm.isHighlighted(3)).toBe(false); // Should not be highlighted
    expect(wrapper.vm.isHighlighted(10)).toBe(true); // Should be highlighted
    expect(wrapper.vm.isHighlighted(20)).toBe(false);
  });
  it("handles API error correctly", async () => {
    // Mock the fetch function to return a rejected promise
    global.fetch = jest.fn(() => Promise.reject(new Error("API Error")));

    const wrapper = mount(CalendarComponent);

    // Assuming your component has a "submitData" method that triggers the API call
    await wrapper.vm.submitData();

    // Ensure that the responseReceived state is still false after the failed API call
    expect(wrapper.vm.responseReceived).toBe(false);
  });
});

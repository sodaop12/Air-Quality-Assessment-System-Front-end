import { mount } from "@vue/test-utils";
import MyComponent from "/Users/fallingrain/seniot floder/airqualityassessmentsystemfrontend/src/views/ForecastView.vue"; // Update with your component path

describe("MyComponent", () => {
  it("displays forecast response", async () => {
    const wrapper = mount(MyComponent);

    // Simulate entering numbers and submitting
    await wrapper.setData({ numbers: [1, 2, 3, 4, 5] });
    await wrapper.find(".submit-button").trigger("click");

    // Wait for asynchronous response update
    await wrapper.vm.$nextTick();

    // Check if forecast response is displayed
    expect(wrapper.find(".response-section").text()).toContain(
      "Response from Flask:"
    );
  });
  it("forecast api fail", async () => {
    const wrapper = mount(MyComponent);

    // Simulate entering numbers and submitting
    await wrapper.setData({ numbers: [1] });
    await wrapper.find(".submit-button").trigger("click");

    // Wait for asynchronous response update
    await wrapper.vm.$nextTick();
  

    expect(wrapper.vm.forecast).toBeNull();
  });
});

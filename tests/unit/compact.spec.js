import { mount } from "@vue/test-utils";
import YourComponent from "@/views/CompactAssessmentView.vue";

describe("YourComponent", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(YourComponent);
  });

  it("should set calculateaverage and totalhour correctly when data is submitted", async () => {
    // Set the necessary data in the component
    wrapper.setData({
      selectedDays: 10,
      averageHours: 8,
      selectedLocations: ["Location 1", "Location 2", "Location 3"],
    });

    // Mock the fetch function
    global.fetch = jest.fn().mockResolvedValue({
      json: () => ({
        calculateaverage: 10,
        totalhour: 100,
        output_text: "Some output text",
      }),
    });

    // Trigger the submitData method
    await wrapper.vm.submitData();

    // Assertions
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.calculateaverage).toBe(10);
    expect(wrapper.vm.totalhour).toBe(100);
    expect(wrapper.vm.output_text).toBe("Some output text");
    expect(wrapper.vm.responseReceived).toBe(true);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "http://127.0.0.1:5000/submitcompactdata",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          locations: ["Location 1", "Location 2", "Location 3"],
          selectedDays: 10,
          averageHours: 8,
        }),
      }
    );
  });

  it("should show an error message if fields are not filled", async () => {
    // Set some fields to empty values
    wrapper.setData({
      selectedDays: "",
      averageHours: null,
    });

    // Trigger the submitData method
    await wrapper.vm.submitData();

    // Assertions
    expect(wrapper.vm.calculateaverage).toBeNull();
    expect(wrapper.vm.totalhour).toBeNull();
    expect(wrapper.vm.output_text).toBeNull();
  });
});

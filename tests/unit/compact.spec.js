import { shallowMount } from "@vue/test-utils";
import MyComponent from "@/views/CompactAssessmentView.vue";

describe("MyComponent", () => {
  it("should initialize with default values", () => {
    const wrapper = shallowMount(MyComponent);

    expect(wrapper.vm.loading).toBe(false);
    expect(wrapper.vm.selectedDays).toBe("");
    expect(wrapper.vm.calculateaverage).toBeNull();
    expect(wrapper.vm.totalhour).toBeNull();
    expect(wrapper.vm.output_text).toBeNull();
    expect(wrapper.vm.responseReceived).toBe(false);
    expect(wrapper.vm.averageHours).toBeNull();
    expect(wrapper.vm.max).toBeNull();
    expect(wrapper.vm.min).toBeNull();
    expect(wrapper.vm.Cgrs).toBeNull();
    expect(wrapper.vm.selectedLocations).toEqual(["", "", ""]);
    expect(wrapper.vm.days).toEqual(
      Array.from({ length: 30 }, (_, index) => index + 1)
    );
  });

  it("should submit data and receive a successful response", async () => {
    const mockData = {
      calculateaverage: 5.6,
      totalhour: 150,
      output_text: "Some output text",
      max: 10,
      min: 3,
      CGRS: 2.4,
    };

    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );

    const wrapper = shallowMount(MyComponent);
    wrapper.setData({
      selectedDays: "10",
      averageHours: 8,
      selectedLocations: ["", "", ""],
    });

    const submitButton = wrapper.find(".submit-button");
    submitButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(fetch).toHaveBeenCalledWith(
      "http://127.0.0.1:5000/submitcompactdata",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          locations: ["", "", ""],
          selectedDays: "10",
          averageHours: 8,
        }),
      }
    );
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.calculateaverage).toBe(5.6);
    expect(wrapper.vm.totalhour).toBe(150);
    expect(wrapper.vm.output_text).toBe("Some output text");
    expect(wrapper.vm.max).toBe(10);
    expect(wrapper.vm.min).toBe(3);
    expect(wrapper.vm.Cgrs).toBe(2.4);
    expect(wrapper.vm.loading).toBe(false);
    expect(wrapper.vm.responseReceived).toBe(true);
  });

  it("should display an error message if API call fails", async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => Promise.reject(new Error("API error")));

    const wrapper = shallowMount(MyComponent);
    wrapper.setData({
      selectedDays: "10",
      averageHours: 8,
      selectedLocations: ["", "", ""],
    });

    const submitButton = wrapper.find(".submit-button");
    submitButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(fetch).toHaveBeenCalledWith(
      "http://127.0.0.1:5000/submitcompactdata",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          locations: ["", "", ""],
          selectedDays: "10",
          averageHours: 8,
        }),
      }
    );

    expect(wrapper.vm.calculateaverage).toBeNull();
    expect(wrapper.vm.totalhour).toBeNull();
  });
});

import { mount } from "@vue/test-utils";
import Footer from "@/components/FeedbackComponent.vue";

describe("Footer.vue", () => {
  it("submits feedback when the submit button is clicked", async () => {
    const mockData = { message: "Feedback submitted successfully" };
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(mockData),
    });

    const wrapper = mount(Footer);
    const mockAlert = jest.spyOn(window, "alert");

    // Set the feedback textarea value
    const feedbackTextarea = wrapper.find("textarea");
    await feedbackTextarea.setValue("Testing feedback");

    // Trigger the click event on the submit button
    await wrapper.find("button").trigger("click");

    // Wait for the Vue component to update
    await wrapper.vm.$nextTick();

    // Assertions
    expect(global.fetch).toHaveBeenCalledWith(
      "http://127.0.0.1:5000/submit_feedback",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ feedback: "Testing feedback" }),
      })
    );

    expect(wrapper.vm.feedback).toBe("");
    expect(wrapper.vm.$data.feedback).toBe("");


    // You can also assert the alert message if you've mocked the window.alert function.
    // For example: expect(window.alert).toHaveBeenCalledWith('Thank you for your feedback!');
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(mockAlert).toHaveBeenCalledWith(
      "Thank you for your feedback!"
    );
    mockAlert.mockRestore();
  });

  it("shows an alert when submitting empty feedback", async () => {
    const mockAlert = jest.spyOn(window, "alert");
    const wrapper = mount(Footer);

    await wrapper.find("button").trigger("click");
    expect(mockAlert).toHaveBeenCalledWith(
      "Please provide feedback before submitting."
    );
    mockAlert.mockRestore();
  });

  // You can write more tests here for different scenarios
});

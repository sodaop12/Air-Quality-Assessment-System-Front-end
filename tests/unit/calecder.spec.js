// CalendarComponent.spec.js

import { mount } from '@vue/test-utils';
import CalendarComponent from '@/views/CalendarAssessmentView.vue';

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
        output_text: 'Some output text',
      }),
  })
);

describe('CalendarComponent', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(CalendarComponent);
  });

  it('submits data and displays results', async () => {
    // Simulate user interactions (e.g., selecting dates, entering data)
    // ...

    // Simulate a click on the submit button
    await wrapper.find('.submit-button').trigger('click');

    // Wait for the Vue component to update after the API response
    await wrapper.vm.$nextTick();

    // Assert that the results are displayed as expected
    expect(wrapper.vm.calculateaverage).toBe(10);
    expect(wrapper.vm.totalhour).toBe(100);
    expect(wrapper.vm.output_text).toBe("Some output text");
    expect(wrapper.vm.max).toBe(150);
    expect(wrapper.vm.min).toBe(50);
    expect(wrapper.vm.Cgrs).toBe(2.4);
  });

  it('toggles input fields when a day is clicked', async () => {
    // Simulate a click on a day button
    await wrapper.find('.day-button').trigger('click');

    // Wait for the Vue component to update after the click
    await wrapper.vm.$nextTick();

    // Assert that the input field is displayed
    expect(wrapper.find('.hours-input').exists()).toBe(true);

    // Simulate a second click on the same day button
    await wrapper.find('.day-button').trigger('click');

    // Wait for the Vue component to update after the click
    await wrapper.vm.$nextTick();

    // Assert that the input field is hidden
    expect(wrapper.find('.hours-input').exists()).toBe(false);
  });
});

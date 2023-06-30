// Import the component to be tested
import { shallowMount } from '@vue/test-utils';
import MyComponent from '@/views/CompleteAssessmentView.vue';

describe('MyComponent', () => {
  // Test the initial state of the component
  it('should initialize with default values', () => {
    const wrapper = shallowMount(MyComponent);

    // Assert the initial values of the component's data properties
    expect(wrapper.vm.selectedDays).toBe('');
    expect(wrapper.vm.additionalInputsCount).toBe("");
    expect(wrapper.vm.additionalDays).toEqual([]);
    expect(wrapper.vm.additionalHours).toEqual([]);
    expect(wrapper.vm.selectedLocations).toEqual([]);
    expect(wrapper.vm.additionalText).toBe(null);
    expect(wrapper.vm.additionalStartDate).toBe(null);
    expect(wrapper.vm.additionalEndDate).toBe(null);
    expect(wrapper.vm.Hours).toBe(null);
    expect(wrapper.vm.selectedLocation30).toEqual(["", "", ""]);
    expect(wrapper.vm.loading).toBe(false);
    expect(wrapper.vm.showWarning).toBe(false);
    expect(wrapper.vm.responseReceived).toBe(false);
    expect(wrapper.vm.calculateaverage).toBe(null);
    expect(wrapper.vm.max).toBe(null);
    expect(wrapper.vm.min).toBe(null);
  });

  // Test the behavior of the component when selectedDays is between 1 and 7
  it('should display additionalInputs when selectedDays is between 1 and 7',async () => {
    const wrapper = shallowMount(MyComponent);
    wrapper.setData({ selectedDays: 5 });
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    // Assert that the additionalInputs section is rendered
    expect(wrapper.find('table').exists()).toBe(true);
    expect(wrapper.find('.disease_ex').exists()).toBe(true);

    // Assert the number of additionalInputs displayed
    expect(wrapper.findAll('tr').length).toBe(wrapper.vm.additionalInputsCount + 4);
  });

  // Test the behavior of the component when selectedDays is between 8 and 29
  it('should display additionalStartDate, additionalEndDate, and other inputs when selectedDays is between 8 and 29',async () => {
    const wrapper = shallowMount(MyComponent);
    wrapper.setData({ selectedDays: 15 });
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    // Assert that the additionalStartDate and additionalEndDate inputs are rendered
    expect(wrapper.find('table').exists()).toBe(true);
    expect(wrapper.find('.section-title-mini').exists()).toBe(true);

    // Assert the number of inputs displayed
    expect(wrapper.findAll('input').length).toBe(4);
    expect(wrapper.findAll('select').length).toBe(4);
    expect(wrapper.findAll('.disease_ex').length).toBe(1);
  });

  // Test the behavior of the component when selectedDays is 30
  it('should display inputs for 30 days range when selectedDays is 30',async ()=> {
    const wrapper = shallowMount(MyComponent);
    wrapper.setData({ selectedDays: 30 });
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    // Assert that the necessary inputs are rendered
    expect(wrapper.findAll('input').length).toBe(2);
    expect(wrapper.findAll('select').length).toBe(4);
    expect(wrapper.findAll('.disease_ex').length).toBe(1);
  });

  // Test the submitData method
  it('should call submitData method when Submit button is clicked', async () => {
    const wrapper = shallowMount(MyComponent);
    wrapper.setData({ selectedDays: 5 });
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    // Stub the submitData method
    wrapper.vm.submitData = jest.fn();

    // Find and trigger the Submit button click event
    const submitButton = wrapper.find('.submit-button');
    await submitButton.trigger('click');

    // Assert that the submitData method is called
    expect(wrapper.vm.submitData).toHaveBeenCalled();
  });
});

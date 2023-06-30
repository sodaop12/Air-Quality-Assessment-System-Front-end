import { shallowMount } from '@vue/test-utils';
import MyComponent from '@/views/CompactAssessmentView.vue';

describe('MyComponent', () => {
  it('submits data and receives response', async () => {
    const mockResponse = {
      calculateaverage: 5,
      totalhour: 120,
      output_text: 'Sample output',
      max: 10,
      min: 2,
      CGRS: 3.5,
    };

    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      })
    );

    const wrapper = shallowMount(MyComponent);

    wrapper.setData({
      selectedDays: '10',
      averageHours: 8,
      selectedLocations: ['Location 1', 'Location 2', 'Location 3'],
    });

    const submitButton = wrapper.find('.submit-button');
    await submitButton.trigger('click');

    expect(fetch).toHaveBeenCalledWith(
      'http://127.0.0.1:5000/submitcompactdata',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          locations: ['Location 1', 'Location 2', 'Location 3'],
          selectedDays: '10',
          averageHours: 8,
        }),
      })
    );

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.calculateaverage).toBe(mockResponse.calculateaverage);
    expect(wrapper.vm.totalhour).toBe(mockResponse.totalhour);
    expect(wrapper.vm.output_text).toBe(mockResponse.output_text);
    expect(wrapper.vm.responseReceived).toBe(true);
    expect(wrapper.vm.max).toBe(mockResponse.max);
    expect(wrapper.vm.min).toBe(mockResponse.min);
    expect(wrapper.vm.Cgrs).toBe(mockResponse.CGRS);
  });
});

const data = {
  selectedDays: this.selectedDays,
  additionalDays: this.additionalDays,
  additionalStartDate: this.additionalStartDate,
  additionalEndDate: this.additionalEndDate,
  additionalHours: this.additionalHours,
  additionalText: this.additionalText,
  locations: this.selectedLocations,
  locations30: this.selectedLocation30,
  hours30: this.Hours,
};
this.loading = true;
fetch("http://127.0.0.1:5000/submitcompletedata", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((data) => {
    this.max = data.max;
    this.min = data.min;
    this.Cgrs = data.CGRS;
    this.calculateaverage = data.calculateaverage;
    this.output_text = data.output_text;
    this.responseReceived = true;
    this.loading = false;
  })
  .catch((error) => {
    console.error("API error:", error);
    this.loading = false;
  });

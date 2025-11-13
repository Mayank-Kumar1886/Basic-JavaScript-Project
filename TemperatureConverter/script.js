const TemperatureCelsius = document.getElementById("TemperatureCelsius");
const TemperatureKelvin = document.getElementById("TemperatureKelvin");
const TemperatureFahrenheit = document.getElementById("TemperatureFahrenheit");

TemperatureCelsius.addEventListener("input", () => {
  let celciusValue = parseFloat(TemperatureCelsius.value);
  if (!isNaN(celciusValue)) {
    let fahrenheit = (celciusValue * 9) / 5 + 32;
    let kelvin = celciusValue + 373.15;
    TemperatureKelvin.value = kelvin.toFixed(2);
    TemperatureFahrenheit.value = fahrenheit.toFixed(2);
  } else {
    TemperatureKelvin.value = "";
    TemperatureFahrenheit.value = "";
  }
});

TemperatureKelvin.addEventListener("input", () => {
  let kelvinValue = parseFloat(TemperatureKelvin.value);
  if (!isNaN(kelvinValue)) {
    let celcius = kelvinValue - 273.15;
    let fahrenheit = ((kelvinValue - 273.15) * 9) / 5 + 32;
    TemperatureCelsius.value = celcius.toFixed(2);
    TemperatureFahrenheit.value = fahrenheit.toFixed(2);
  } else {
    TemperatureCelsius.value = "";
    TemperatureFahrenheit.value = "";
  }
});
TemperatureFahrenheit.addEventListener("input", () => {
  let fahrenheitValue = parseFloat(TemperatureFahrenheit.value);
  if (!isNaN(fahrenheitValue)) {
    let celcius = ((fahrenheitValue - 32) * 5) / 9;
    let kelvin = ((fahrenheitValue - 32) * 5) / 9 + 273.15;
    TemperatureKelvin.value = kelvin.toFixed(2);
    TemperatureCelsius.value = celcius.toFixed(2);
  } else {
    TemperatureCelsius.value = "";
    TemperatureKelvin.value = "";
  }
});

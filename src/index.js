(() => {
  const searchBox = document.querySelector("#searchBox");
  const searchBtn = document.querySelector(".searchBtn");

  async function fetchCityWeather(cityName) {
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=us&key=78Q85JHQ6MMFS88KTPQ8NL6BK&contentType=json`,
      );
      if (!response.ok) {
        throw new Error(`hi there's an error`, response.status);
      }
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  async function dataToJson(response) {
    try {
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  function displayData(data) {
    if (data) {
      console.log(data, "Temp: " + data.currentConditions.feelslike);
    }
  }
  searchBtn.addEventListener("click", async () => {
    const cityName = searchBox.value;
    const response = await fetchCityWeather(cityName);
    const data = await dataToJson(response);

    displayData(data);
    searchBox.value = "";
  });
})();

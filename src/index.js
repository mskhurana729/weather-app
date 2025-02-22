(() => {
  const searchBox = document.querySelector("#searchBox");
  const searchBtn = document.querySelector(".searchBtn");
  const renderWeatherArea = document.querySelector(".renderWeatherArea");

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
      console.log(data.address);
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  function displayData(data) {
    if (data) {
      console.log("Temp: " + data);
    }
  }
  searchBtn.addEventListener("click", async () => {
    const cityName = searchBox.value;
    let time = performance.now();
    const response = await fetchCityWeather(cityName);
    const data = await dataToJson(response);
    let requestTime = performance.now() - time;
    console.log(requestTime);
    renderWeather(data);
    displayData(data);
    searchBox.value = "";
  });

  function renderWeather(data) {
    try {
      renderWeatherArea.textContent = "";
      let addressNode = document.createElement("p");
      addressNode.textContent = data.address.toUpperCase();

      let tempNode = document.createElement("p");

      tempNode.textContent = "Temp: " + data.currentConditions.temp + "`F";
      console.log(tempNode);
      tempNode.classList.add("tempNode");
      let changeTempTypeBtn = document.createElement("button");
      changeTempTypeBtn.classList.add("FToC");
      changeTempTypeBtn.classList.add("changeTypeBtn");
      changeTempTypeBtn.textContent = "F -> C";
      changeTempTypeBtnEvent(
        tempNode,
        changeTempTypeBtn,
        data.currentConditions.temp,
      );
      renderWeatherArea.appendChild(addressNode);
      renderWeatherArea.appendChild(tempNode);
      renderWeatherArea.appendChild(changeTempTypeBtn);
    } catch (e) {
      console.log(e);
    }
  }

  function changeTempTypeBtnEvent(tempNode, btn, tempInF) {
    btn.addEventListener("click", (e) => {
      if (btn.classList.contains("FToC")) {
        btn.classList.remove("FToC");
        btn.classList.add("CToF");
        console.log(btn.classList);
        btn.textContent = "C -> F";
        let tempInC = (((+tempInF - 32) * 5) / 9).toFixed(2);
        tempNode.textContent = "Temp: " + tempInC + "`C";

        console.log(tempInF);
      } else {
        btn.classList.add("FToC");
        btn.classList.remove("CToF");
        btn.textContent = "F -> C";
        tempNode.textContent = "Temp: " + tempInF + "`F";

        console.log(tempInF);
      }
    });
  }
})();

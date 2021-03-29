import "./style.scss";
import moment from "moment";

// gobal variables
const units = ["metric", "imperial"];
const loader = document.querySelector("#loader");

// functions
// get city
function check(bool) {
  const formCheck = document.querySelector(".form-check-input");
  if (bool) {
    formCheck.checked = true;
  } else {
    formCheck.checked = false;
  }
}
// gets correct icon according to api
// eslint-disable-next-line consistent-return
function getIcon(iconNum) {
  const icons = [
    {
      code: "01d",
      dUrl: "http://openweathermap.org/img/wn/01d@2x.png",
      nUrl: "http://openweathermap.org/img/wn/01n@2x.png",
    },
    {
      code: "02d",
      dUrl: "http://openweathermap.org/img/wn/02d@2x.png",
      nUrl: "http://openweathermap.org/img/wn/02n@2x.png",
    },
    {
      code: "03d",
      dUrl: "http://openweathermap.org/img/wn/03d@2x.png",
      nUrl: "http://openweathermap.org/img/wn/03d@2x.png",
    },
    {
      code: "04d",
      dUrl: "http://openweathermap.org/img/wn/04d@2x.png",
      nUrl: "http://openweathermap.org/img/wn/04d@2x.png",
    },
    {
      code: "09d",
      dUrl: "http://openweathermap.org/img/wn/09d@2x.png",
      nUrl: "http://openweathermap.org/img/wn/09d@2x.png",
    },
    {
      code: "10d",
      dUrl: "http://openweathermap.org/img/wn/10d@2x.png",
      nUrl: "http://openweathermap.org/img/wn/10n@2x.png",
    },
    {
      code: "11d",
      dUrl: "http://openweathermap.org/img/wn/11d@2x.png",
      nUrl: "http://openweathermap.org/img/wn/11d@2x.png",
    },
    {
      code: "13d",
      dUrl: "http://openweathermap.org/img/wn/13d@2x.png",
      nUrl: "http://openweathermap.org/img/wn/13d@2x.png",
    },
    {
      code: "50d",
      dUrl: "http://openweathermap.org/img/wn/50d@2x.png",
      nUrl: "http://openweathermap.org/img/wn/50d@2x.png",
    },
  ];
  for (const k of icons) {
    if (k.code.slice(0, 2) === iconNum.slice(0, 2)) {
      if (iconNum.slice(iconNum.length - 1, iconNum.length) === "d") {
        return k.dUrl;
      }
      return k.nUrl;
    }
  }
}
//
function getTime(time) {
  return moment.unix(time).format("HH:mm");
}

function createWeatherElement(city, unit) {
  loader.style.display = "block";
  const apiRequest = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ad8bef6ac5d103572a3cc8a22e481092&units=${unit}`;
  fetch(apiRequest, { mode: "cors" })
    .then((resolved) => resolved.json())
    .then((data) => {
      // disable loader
      loader.style.display = "none";
      // make weather element
      const container = document.querySelector(".container");
      const currentWeatherDiv = document.createElement("div");
      currentWeatherDiv.id = "current-weather";
      currentWeatherDiv.innerHTML = `
                <header>
                    <h1 id="title"><i class="fas fa-bolt"></i> Clear Sky</h1>
                </header>
                <main>
                    <form>
                        <div>
                            <input id="searchbar" class="form-control" type="text" placeholder="search..." required >
                            <button class="btn btn-dark" id="search-btn"><i class="fas fa-search-location"></i></button>
                        </div>
                            <span id="search-error">Errror error reroor</span>
                    </form>
                    <h1>${data.name}, ${data.sys.country}</h1>
                    <div>
                    
                    </div>
                    <h3 class="temp">${
                      data.main.temp
                    } <span class="temp-unit"></span> <img id="icon" src="${getIcon(
        data.weather[0].icon
      )}" alt=""></h3>
                    <h4 class="temp">Feels Like: ${
                      data.main.feels_like
                    } <span class="temp-unit"></span></h4>
                    <p id="temp-description">${data.weather[0].main} | ${
        data.weather[0].description
      }</p>
                    <ul id="info-grid" >
                        <li><span>humidity</span><br>${data.main.humidity}%</li>
                        <li><span>cloudiness</span><br>${data.clouds.all}%</li>
                        <li><span>wind speed</span><br>${
                          data.wind.speed
                        } <span id="wind-speed"></span></li>
                        <li><span>wind directon</span><br>${data.wind.deg}°</li>
                        <li><span>sunrise</span><br>${getTime(
                          data.sys.sunrise
                        )}</li>
                        <li><span>sunset</span><br>${getTime(
                          data.sys.sunset
                        )}</li>
                    </ul>
                </main>
                <footer>
                    <span>Metric</span>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
                    </div>
                    <span>Imperial</span>
                </footer>
    `;

      // append currentWeather div to html doc
      if (container.childElementCount > 0) {
        container.replaceChild(currentWeatherDiv, container.firstChild);
      } else {
        container.append(currentWeatherDiv);
      }
      // variables
      const searchBar = document.querySelector("#searchbar");
      const searchBtn = document.querySelector("#search-btn");
      const formCheck = document.querySelector(".form-check-input");
      const tempUnit = document.querySelectorAll(".temp-unit");
      const WindSped = document.querySelector("#wind-speed");
      // search btn event listener
      searchBtn.addEventListener("click", (e) => {
        if (searchBar.checkValidity()) {
          e.preventDefault();
          createWeatherElement(searchBar.value, units[0]);
          // make input field empty
          searchBar.value = "";
        }
      });
      //
      formCheck.addEventListener("click", () => {
        if (formCheck.checked) {
          // imperial
          createWeatherElement(city, units[1]);
        } else {
          // metric
          createWeatherElement(city, units[0]);
        }
      });
      //
      if (unit === "imperial") {
        check(true);
        tempUnit.forEach((el) => {
          const spanEl = el;
          spanEl.innerText = "°F";
        });
        WindSped.innerText = "mph";
      } else {
        check(false);
        tempUnit.forEach((el) => {
          const spanEl = el;
          spanEl.innerText = "°C";
        });
        WindSped.innerText = "km/h";
      }
    })
    .catch((err) => {
      throw err;
    });
}
// initial api call
createWeatherElement("pretoria", units[0]);

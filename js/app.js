const apiKey = "566c179237c1f8cffd8fd62b2bf72d9e";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const $btn = document.querySelector(".card button");
const $temp = document.querySelector(".temp");
const $city = document.querySelector(".city");
const $humidity = document.querySelector(".humidity");
const $windSpeed = document.querySelector(".wind-speed");
const $box = document.querySelector(".corrent");
const $search = document.querySelector(".search input");
const $img = document.querySelector(".weather-icon");

$btn.addEventListener("click", fetchData);

function fetchData() {
	const query = $search.value.trim();

	if (query === "") {
		$box.style.display = "none";
		alert("Please enter a city name");
		return;
	}

	fetch(apiURL + `&q=${query}` + `&appid=${apiKey}`)
		.then((response) => response.json())
		.then((data) => renderData(data))
		.catch((error) => {
			$box.style.display = "none";
			console.error("Error fetching data:", error);
		});
}

function renderData(data) {
	$box.style.display = "block";
	$temp.textContent = `${Math.round(data.main.temp)}°C`;
	$city.textContent = data.name;
	$humidity.textContent = `${data.main.humidity}%`;
	$windSpeed.textContent = `${Math.round(data.wind.speed)} km/h`;
	console.log(data);
	if (data.weather[0].main == "Clear") {
		$img.src = "./images/clear.png";
	} else if (data.weather[0].main == "Clouds") {
		$img.src = "./images/clouds.png";
	} else if (data.weather[0].main == "Drizzle") {
		$img.src = "./images/drizzle.png";
	} else if (data.weather[0].main == "Mist") {
		$img.src = "./images/mist.png";
	} else if (data.weather[0].main == "Rain") {
		$img.src = "./images/rain.png";
	} else if (data.weather[0].main == "Snow") {
		$img.src = "./images/snow.png";
	}
}

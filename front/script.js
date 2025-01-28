function createCard(cardId) {
	const exist = document.getElementById(cardId);
	if (exist) return;

	const requestsContainer = document.getElementById("requestsContainer");
	const newCard = document.createElement("div");
	newCard.className = "request";
	newCard.id = cardId;
	requestsContainer.appendChild(newCard);
}

function deleteCard(event) {
	const request = event.target.closest(".request");
	//console.log(request);
	request.remove();
}

function writeData(cardId, data) {
	const card = document.getElementById(cardId);

	const location = data.location;
	const condition = data.weather.condition || "unavailable";
	const temp = parseInt(data.temperature.current) || "";
	const wind = parseInt(data.air.wind) || "";
	const humidity = data.air.humidity || "";
	const imageUrl = data.image || "";
	const conditionId = data.weather.icon;
	let conditionIcon;
	//console.log("requested data: ", data);
	switch (true) {
		case conditionId >= 200 && conditionId <= 232:
			conditionIcon = "fa-solid fa-cloud-bolt";
			break;
		case conditionId >= 300 && conditionId <= 321:
		case conditionId >= 520 && conditionId <= 531:
			conditionIcon = "fa-solid fa-cloud-showers-heavy";
			break;
		case conditionId >= 500 && conditionId <= 504:
			conditionIcon = "fa-solid fa-cloud-sun-rain";
			break;
		case conditionId >= 600 && conditionId <= 622 || conditionId == 511:
			conditionIcon = "fa-regular fa-snowflake";
			break;
		case conditionId >= 701 && conditionId <= 781:
			conditionIcon = "fa-solid fa-smog";
			break;
		case conditionId == 800:
			conditionIcon = "fa-solid fa-sun";
			break;
		case conditionId == 801:
			conditionIcon = "fa-solid fa-cloud-sun";
			break;
		case conditionId == 802:
		case conditionId >= 803 && conditionId <= 804:
			conditionIcon = "fa-solid fa-cloud";
			break;
		default:
			conditionIcon = "fa-solid fa-circle-exclamation";
			break;
	}
	//console.log(conditionIcon);

	card.innerHTML = `
		<div class="reqheader">
			<i class="close fa-solid fa-circle-xmark" onclick="deleteCard(event)"></i>
			<span class="loc mono">${location}</span>
			<!--<span class="time mono">PM</span>-->
		</div>
		<div class="reqbody" style="background-image:url('${imageUrl}')">
			<div class="overview">
				<div class="condition">
					<i class="conditionIcon ${conditionIcon}"></i>
					<span class="desc">${condition}</span>
				</div>
				<div class="temps">
					<span class="current">${temp}ºC</span>
				</div>
			</div>
			<div class="other">
				<span class="gusts">${wind} km/h</span>
				<div class="humidity">${humidity}%</div>
			</div>
		</div>
	`;
}

function showErrorMessage(local, error) {
	const errorMessageDiv = document.getElementById("errorDiv");
	const locationSpan = document.getElementById("location");
	const errorInfoP = document.getElementById("errorInfo");

	locationSpan.innerText = local;
	errorInfoP.innerHTML = error;
	errorMessageDiv.className = "fadeIn";
	//console.log(error);
}

function closeErrorMessage() {
	const errorMessageDiv = document.getElementById("errorDiv");
	errorMessageDiv.className = "fadeOut";
	const errorInfoP = document.getElementById("errorInfo");
	const delay = 150;

	setTimeout(() => {
		errorMessageDiv.className = "noDisplay";
		errorInfoP.classList.add("noDisplay");
	}, delay * .95);
}

function showMoreInfo() {
	const errorInfoP = document.getElementById("errorInfo");
	errorInfoP.classList.remove("noDisplay");
}

function getData(local) {
	const apiUrl = "http://localhost:3000/api/weather/";

	fetch(`${apiUrl}${local}`).then(response => {
		if (!response.ok) {
			return response.json().then(errorData => {
				throw new Error(errorData.error || `Erro: ${response.statusText}`);
			});
		}
		return response.json();
	}).then(apiData => {
			createCard(local);
			writeData(local, apiData);
	}).catch(error => {
		console.error('Error while requesting weather:', error);
		showErrorMessage(local, error.message);
	});
}

function userRequest(event) {
	try {
		event.preventDefault();
	} catch (error) { }
	
	const input = document.getElementById("getWeatherInput");
	const inputData = input.value;
	//console.log(inputData);

	if(!inputData) {
		showErrorMessage(inputData, "Please, insert a valid location");
	} else {
		getData(inputData);
		input.value = "";
	}
}



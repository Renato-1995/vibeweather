const axios = require("axios");// importa axios

// funcao que recolhe os dados meteorologia
exports.getWeather = async (req, res, next) => {
	const { location } = req.params;// recolhe o parametro localização da requisicao
	try {
		// usar o axios para fazer a requisicao do tempo
		const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
			params: {
				q: location,// nome da cidade
				appid: process.env.WEATHER_API_KEY,// api key
				units: "metric"// unidade de medida
			},
		});

		req.weather = {
			condition: response.data.weather[0].description,// condicao atmosferica
			icon: response.data.weather[0].id// icon representante do tempo
		};
		req.temperature = {
			current: response.data.main.temp,// temperatura atual
			min: response.data.main.temp_min,// temperatura minima
			max: response.data.main.temp_max// temperatura maxima
		};
		req.air = {
			humidity: response.data.main.humidity,// humidade
			wind: response.data.wind.gust// rajadas de vento
		}

        next();// passa para a proxima funcao na rota
	} catch (error) {
		console.error(`Não há dados meteorológicos para ${location}:`, error.message);
		res.status(500).json({ error: `Não há dados meteorológicos para <b>${location}</b>` });
	}
}
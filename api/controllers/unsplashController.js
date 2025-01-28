const axios = require("axios");// importa o axios

// funcao que recolhe a imagem baseada no tempo
exports.getImage = async (req, res, next) => {
	//const { location } = req.params;
	try {
		// utiliar o axios para fazer uma requisicao ao unsplash
		const response = await axios.get("https://api.unsplash.com/search/photos", {
			params: {
				query: req.weather.condition,// termos de procura (estado do tempo)
				client_id: process.env.IMAGE_API_KEY,// api key
				per_page: 20,// requisita 20 resultados
				orientation: "landscape"// requesita imagens apenas com orientacao landscape
			},
		});

		const max = response.data.results.length;// recolhe o numero de imagens receidas
		const random = Math.floor(Math.random() * max);// gera um numero aleatorio entre 0 e numero de imagens recebidas
		//console.log(response.data.results[random].urls.full);// testes
		req.image = response.data.results[random].urls.regular || "no-available-image";//armazena o url da iamgem nos parametros da requisicao

        next();// passa para a proxima funcao na rota
	} catch (error) {
		console.log("Ocorreu um erro na recolha da imagem: ", error.message);
		res.status(500).json({ error: "Ocorreu um erro na recolha da imagem" });
	}
};
const { createClient } = require("@supabase/supabase-js");// inicia o supabase
const SUPABASE_URL = process.env.SUPABASE_URL// supabase url
const supabase = createClient(SUPABASE_URL, process.env.SUPABASE_API_KEY);// cria um client para interagir com o supabase

// funcao que armazena dados no supabase
exports.saveSupabase = async (req, res, next) => {
	const { location } = req.params;// recolhe a localizacao dos parametros da requisicao

	// construir um json para enviar para o supabase
	const apiData = {
		ip: req.ip,// o ip dos parametros de requisicao (disponivel por padrao no express)
		location,// localizacao dos parametros da requisicao
		weather: req.weather.condition,// condicao do tempo recolhida por openweathermap
		icon: req.weather.icon,// id da condicao do tempo recolhida pelo openweathermap
		temp: req.temperature.current,// temperatura recolhida pelo openweathermap
		min: req.temperature.min,// temperatura minima recolhida pelo openweathermap
		max: req.temperature.max,// temperatura maxima recolhida pelo openweathermap
		humidity: req.air.humidity,// humidade recolhida pelo openweathermap
		wind: req.air.wind,// rajadas de vento recolhida pelo openweathermap
		imageUrl: req.image,// url da imagem recolhida pelo unsplash
		timestamp: new Date()// recolhe a data atual para registar quando os dados foram guardados
	};
	//console.log(apiData);// verificar se os dados estao todos presentes

	// inicia sessao no supabase
	const { data, error } = await supabase.auth.signUp({
		email: process.env.SUPABASE_ID,
		password: process.env.SUPABASE_PASSWORD
	});

	try {
		const { error } = await supabase.from("requests").insert([apiData]);// insere os dados na tabela "requests" do supabase
		next();// passa para a proxima funcao na rota
	} catch (err) {
		console.error("Erro ao guardar log:", err.message);
		res.status(500).json({ error: "Erro ao guardar log" });
	}
};

// funcao que envia os dados da requisicao feita
exports.sendJSON = async (req, res) => {
	const { location } = req.params;// recolhe a localizacao dos parametros da requisicao

	try {
		// envia um json como resposta a requisicao
		res.json({
			location,// localizacao dos parametros da requisicao
			weather: req.weather,// grupo da condicao e id de tempo
			temperature: req.temperature,// grupo das temperaturas
			air: req.air,// humidade e rajadas de vento
			image: req.image// url da imagem
		});
	} catch (error) {
		console.error("Erro ao criar resposta", error.message);
		res.status(500).json({ error: "Erro ao criar resposta" });
	}
};
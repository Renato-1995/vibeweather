const express = require("express");// importa o express
const cors = require('cors'); // importa o CORS (Cross-Origin Resource Sharing)(permite requisicao de localhost para localhost)
const route = require("./routes/routes");// importa as rotas
const logMiddleware = require("./middlewares/logMiddleware");// importa o middleware

const app = express();// inicia o express
const port = process.env.API_PORT;// porta do servidor

app.use(cors()); // inicia o CORS e permite todas as origens (externa ou local)
app.use(express.json());// permite o sistema perceber o sistema em json
app.use(logMiddleware);// middleware global
app.use("/api/weather", route);// ao aceder /api/weather e redirecionado para a rota
app.use((err, req, res, next) => {// middleware global para tratar erros
	res.setHeader("Content-Type", "application/json");
    res.status(500).json({ error: "Erro interno no servidor." });
});

app.get("/", (req, res) => {// rota basica para verificar se o servidor funciona
	res.send(`API a correr em http://localhost:${port}`);
});

app.listen(port, () => {// coloca o servidor a aguardar requisicoes
	console.log(`API a correr em http://localhost:${port}`);
	console.log(`Tempo para Braga: http://localhost:${port}/api/weather/Braga`);
});
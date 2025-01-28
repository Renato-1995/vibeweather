# ⛅ Projeto: Vibe Weather ⛈️

O **Vibe Weather** é uma API desenvolvida em Node.js que permite consultar o clima de uma localização e obter uma imagem correspondente à condição climática. Utiliza as APIs **OpenWeatherMap** e **Unsplash** para fornecer dados precisos e visuais. Além disso, integra o Supabase para armazenar logs das consultas realizadas.

---

## 🛠 Tecnologias Utilizadas 🛠

- **Node.js**: Framework para desenvolvimento backend.
- **Express**: Para criação de rotas e manipulação de requisições.
- **Axios**: Para realizar requisições HTTP.
- **Supabase**: Para armazenar logs das requisições em um banco de dados.
- **APIs Externas**:
  - **OpenWeatherMap API**: Para consultar dados meteorológicos.
  - **Unsplash API**: Para obter imagens relacionadas às condições climáticas.

---

## 📋 Pré-requisitos 📋

Antes de iniciar, certifique-se de ter os seguintes pré-requisitos configurados:

1. **Node.js**: Instale a versão mais recente [aqui](https://nodejs.org/).
2. **Supabase**: Crie uma conta e obtenha as credenciais de API [aqui](https://supabase.com/).
3. **Chaves de API**:
   - **OpenWeather API Key**: Crie uma conta [aqui](https://openweathermap.org/).
   - **Unsplash Access Key**: Crie uma conta [aqui](https://unsplash.com/developers).

---

## 🚀 Como Configurar o Projeto 🚀

1. **Clone o Repositório**  
   Clone o projeto no seu ambiente local:
   ```bash
   git clone https://github.com/Renato-1995/vibeweather
   cd vibeweather
   ```

2. **Configurar docker-compose.yaml**  
   Adicionar as portas dos servidores
      Porta padrão da Apresentação - 3001
	  Porta padrão da API - 3000
   Adicionar as imagens
      Versão mais recente da Apresentação: pedrofsg/front_vibeweather:1.0
      Versão mais recente da API: pedrofsg/api_vibeweather:6.1

3. **Configurar Variáveis de Ambiente**  
   Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:
   ```env
   WEATHER_API_KEY=openweathermap_api_key
   IMAGE_API_KEY=unsplash_access_key
   SUPABASE_API_KEY=supabase_api_key
   SUPABASE_ID=supabase_email
   SUPABASE_PASSWORD=supabase_password
   SUPABASE_URL=supabase_url
   API_PORT=porta_da_api
   ```

---

## 🐳 Executando o Projeto 🐳

1. **Executar a aplicação a partir das imagens do Docker Hub**  
   Execute o comando abaixo para iniciar o servidor:
   ```bash
   cd vibeweather
   docker-compose up -d
   ```
   O servidor da API estará disponível em **http://localhost:3000**
   O servidor da Apresentação estará disponível em **http://localhost:3001**

2. **Testando a API**
  Para testar fácilmente a API, utilize um navegador para aceder a:
   ```bash
   http://localhost:3001
   ```
   Neste url pode consultar dados meteorológicos de uma localização específica, através de uma interface simples e intuítiva.
  
   Em alternativa, utilize um navegador ou ferramenta como Postman para aceder ao url:
   ```bash
   http://localhost:3000/api/weather/<location>
   ```
   Substitua `<location>` pelo nome da localização.

---

## 🌐 Endpoints da API 🌐

### `GET /:location`

Consulta o clima e a imagem de uma localização específica e retorna um JSON contendo as informações.

#### Exemplo de Requisição:
```bash
http://localhost:3000/Lisboa
```

#### Resposta:
```json
{
  "location": "Lisboa",
  "weather": {
    "condition": "clear sky",
    "icon": 800
  },
  "temperature": {
    "current": 18.5,
    "min": 15.0,
    "max": 20.0
  },
  "air": {
    "humidity": 72,
    "wind": 3.5
  },
  "image": "https://images.unsplash.com/photo-example-url"
}
```

---

## 📖 Referências

- [Documentação do OpenWeatherMap API](https://openweathermap.org/api)
- [Documentação do Unsplash API](https://unsplash.com/developers)
- [Documentação do Supabase](https://supabase.com/docs)

---
// e executado sempre que uma requisicao chega ao servidor
module.exports = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - IP: ${req.ip}`);// loga os acessos a aplicacao
    next();// passa para a proxima funcao na rota
};




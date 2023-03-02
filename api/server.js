const http = require('http');
const fs = require('fs');

function lerDadosJSON(callback) {
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            const dados = JSON.parse(data);
            callback(null, dados);
        }
    });
}
function manipularSolicitacoes(req, res) {
    lerDadosJSON((err, dados) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Erro ao ler os dados.');
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(dados));
        }
    });
}
const server = http.createServer(manipularSolicitacoes);
server.listen(3000, () => {
    console.log('Servidor executando na porta 3000.');
});
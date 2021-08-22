const http = require('http'); // on importe http
const app = require('./app'); // on apport l'app 

const normalizePort = val => { // renvoie un port valide qu'il soit sous la forme d'une chaine ou d'un numéro 
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => { // recherche les differentes erreurs et les geres de manière appropriés puis l'enregistre dans le serveur
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app); // crée le server 

server.on('error', errorHandler); // gère les erreurs s'il y'en a
server.on('listening', () => { //   ecoute les evenements et consigne le port ou le canal nommé sur lequel le server s'exécute dans la console 
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port); // le serveur est à l'ecoute sur le port configuré plus haut

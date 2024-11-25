var http = require('http') ;
var server=http.createServer( function (request, response) {
    response.writeHead(200, {'Content-Type' : 'text/html'}) ;
    response.end('<h1>Hello Node !!!!</h1>\n');
});
server.listen(3000);
console.log('Server running at http://127.0.0.1:3000/') ;
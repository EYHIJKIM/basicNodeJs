var http = require('http');
var fs = require('fs');
var app = http.createServer(function(request,response){
    var url = request.url;
    if(request.url == '/'){
      url = '/index.html';
    }
    if(request.url == '/favicon.ico'){
      return response.writeHead(404);
    }
    response.writeHead(200);
    console.log(__dirname + url);

    /*
    fs.readFileSync(경로) :
      node.js가 해당 경로의 파일을 읽음
    response.end('응답')
      node.js가 해당 괄호의 소스코드로 응답
    */
    response.end(fs.readFileSync(__dirname + url));

});
app.listen(3000);

var http = require('http');
var fs = require('fs');
//url이라는 이름의 모듈을 사용하겠다는 의미
var url = require('url');

var app = http.createServer(function(request,response){
  //쿼리 스트링 값(파라미터 )
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    console.log('request.url : '+_url);
    console.log('queryData.id : '+queryData.id);

    if(_url == '/'){
      _url = '/index.html';
    }
    if(_url == '/favicon.ico'){
      return response.writeHead(404);
    }
    /*
    fs.readFileSync(경로) :
    node.js가 해당 경로의 파일을 읽음
    response.end('응답')
    node.js가 해당 괄호의 소스코드로 응답
    */
    response.writeHead(200);
    response.end(queryData.id);

});
app.listen(3000);

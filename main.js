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
    var title = queryData.id;
    if(_url == '/'){
      title = 'welcome';
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

    //페이지가 열릴 때마다 직접 파일을 읽어서 로드하고 있으므로,
    //해당 파일 내용이 수정되어도 서버를 껐다 킬 필요가 없음!!(실시간으로 읽어서 띄우기 떄문..)
    fs.readFile(`data/${title}`,'utf8',function(err, description){
        var template = `
          <!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            <ol>
              <li><a href="/?id=HTML">HTML</a></li>
              <li><a href="/?id=CSS">CSS</a></li>
              <li><a href="/?id=JavaScript">JavaScript</a></li>
            </ol>
            <h2>${title}</h2>
            <p>
              ${description}
            </p>
          </body>
          </html>
        `
        response.end(template);
    });



});
app.listen(3000);

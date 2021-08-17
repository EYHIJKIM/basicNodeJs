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
          <li><a href="/?Id=JavaScript">JavaScript</a></li>
        </ol>
        <h2>${title}</h2>
        <p><a href="https://www.w3.org/TR/html5/" target="_blank" title="html5 speicification">Hypertext Markup Language (HTML)</a> is the standard markup language for <strong>creating <u>web</u> pages</strong> and web applications.Web browsers receive HTML documents from a web server or from local storage and render them into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for the appearance of the document.
        <img src="coding.jpg" width="100%">
        </p><p style="margin-top:45px;">HTML elements are the building blocks of HTML pages. With HTML constructs, images and other objects, such as interactive forms, may be embedded into the rendered page. It provides a means to create structured documents by denoting structural semantics for text such as headings, paragraphs, lists, links, quotes and other items. HTML elements are delineated by tags, written using angle brackets.
        </p>
      </body>
      </html>


    `

    response.end(template);

});
app.listen(3000);

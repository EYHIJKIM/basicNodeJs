
/* Not Found 구현
1. 쿼리스트링이 존재하는 경우엔 해당하는 타이틀을 띄어주고
2. 존재하지 않는 경우(root)엔 WELCOME을 타이틀로 띄어준다.
3. 그리고 존재하지 않는 경로로 들어왔을 때는,
파일을 찾을 수 없다는 오류 메시지를 띄어준다.
*/


var http = require('http');
var fs = require('fs');
//url이라는 이름의 모듈을 사용하겠다는 의미
var url = require('url');




var app = http.createServer(function(request,response){
  //쿼리 스트링 값(파라미터 )
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;

  /*
  fs.readFileSync(경로) :
  node.js가 해당 경로의 파일을 읽음
  response.end('응답')
  node.js가 해당 괄호의 소스코드로 응답
  */

  if(pathname==='/') { //올바른 경로
    var title = queryData.id;
    var description = '';

    //페이지가 열릴 때마다 직접 파일을 읽어서 로드하고 있으므로,
    //해당 파일 내용이 수정되어도 서버를 껐다 킬 필요가 없음!!(실시간으로 읽어서 띄우기 떄문..)
    fs.readdir('./data', function(err,filelist){

      if(queryData.id === undefined) { //정의되지 않았다는 예약어, 없는 값
        title = 'Welcome';

      }

            var list = '<ul>';
            var i=0;
            while(i < filelist.length) {

              list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
              i++;
            };


            list += '</ul>';

      fs.readFile(`./data/${title}`, 'utf8', function(err, description){
        var template = `
        <!doctype html>
        <html>
        <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
        </head>
        <body>
        <h1><a href="/">WEB</a></h1>
        ${list}
        <h2>${title}</h2>
        <p>`;
        if(queryData.id === undefined) {
          description = 'Hello, nodejs';
        }
         template +=`${description}`;

        template +=
        `</p>
        </body>
        </html>
        `;
        response.writeHead(200); //통신 성공
        response.end(template);

      }); //readdir


  });//readFile

  } else { //존재하지 않는 경로로 들어온 경우
    response.writeHead(404); //
    response.end('Not found');
  }
});
app.listen(3000);

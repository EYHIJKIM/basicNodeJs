
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
  var qs = require('querystring');
  /*
  fs.readFileSync(경로) :
  node.js가 해당 경로의 파일을 읽음
  response.end('응답')
  node.js가 해당 괄호의 소스코드로 응답
  */

  function templateHTML(title,list, body){
    return `
    <!doctype html>
    <html>
    <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
    </head>
    <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    <a href="/create">create</a>
    ${body}
    </body>
    </html>
    `;
  }

  function templateList(filelist){
    var list = '<ul>';
    var i=0;
    while(i < filelist.length) {
      list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
      i++;
    };
    list += '</ul>';

    return list;
  }


  if(pathname==='/') { //올바른 경로
    var title = queryData.id;
    var description = '';

    //페이지가 열릴 때마다 직접 파일을 읽어서 로드하고 있으므로,
    //해당 파일 내용이 수정되어도 서버를 껐다 킬 필요가 없음!!(실시간으로 읽어서 띄우기 떄문..)
    fs.readdir('./data', function(err,filelist){
      var listIdx = templateList(filelist);

      fs.readFile(`./data/${title}`, 'utf8', function(err, description){
        if(title === undefined) {//정의되지 않았다는 예약어, 없는 값
          title = 'Welcomed';
          description = 'Hello, Node.js';
        };
        var body = `<h2>${title}</h2>${description}`
        var template = templateHTML(title, listIdx, body)
        response.writeHead(200); //통신 성공
        response.end(template);

      }); //readdir


  });//readFile

} else if(pathname ==='/create'){
  fs.readdir('./data', function(err,filelist){
    var listIdx = templateList(filelist);
    var title = 'WEB - create';
    var body
    = `
    <form action="http://localhost:3000/create_process" method="post">
      <p><input type="text" name="title" placeholder="title"></p>
      <p><textarea name="description" placeholder="description"></textarea></p>
      <p><input type="submit"></p>
    </form>

    `
    var template = templateHTML(title, listIdx, body)
    response.writeHead(200); //통신 성공
    response.end(template);



  }); //readdir


} else if(pathname==='/create_process'){
    var body = '';
    /*
        <<POST방식으로 전송된 데이터를 받아오는 방법>>
      노드에선 한번에 데이터를 처리하지 않고, 조각조각 나눠서 가져옴
      웹브라우저에 접속이 들어올 때마다 createServer함수가 실행됨(현재 최상위 함수)
      해당 콜백함수로 들어오는 인자값 request, resposne 를 사용하는 함수()

    */
    //1. 데이터를 가져올 때 실행되는 콜백함수
    request.on(`data`, function(data){
      //1.콜백이 실행될 때마다 body에 해당 data를 더해주라는 로직
      body += data;
      if(body.length > 1e6) {//1.1이 데이터가 너무 크다면 연결을 끊어버림
        request.connection.destory();
      }

    });
    //2.데이터를 다 가져온 뒤(request.on이 끝난 뒤)실행되기로 약속되있는 함수
    request.on('end',function(){
      var post = qs.parse(body);
      //보낸 전체 값이 모두 출력됨
      var title = post.title;
      var description = post.description;

      //파일 생성
      fs.writeFile(`data/${title}`, description,'utf8'
        ,function(err){//콜백 안에 response를

          //302는 페이지를 리다이렉션 시키라는 의미임
          response.writeHead(302, {Location: `/?id=${title}`
          });
          response.end('Success');

      });
      // console.log(post);
      // console.log(post.title);
      // console.log(post.description);

    });//request.on('end')



} else { //존재하지 않는 경로로 들어온 경우
    response.writeHead(404); //
    response.end('Not found');
  }
});
app.listen(3000);

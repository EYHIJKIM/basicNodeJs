
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
  var path = require('path');
  /*
  fs.readFileSync(경로) :
  node.js가 해당 경로의 파일을 읽음
  response.end('응답')
  node.js가 해당 괄호의 소스코드로 응답
  */

//객체에 html 프로퍼티에 함수를 넣는다.
//refactorying : 내부 코드를 효율적으로 바꾸는 것. 리팩토링은 중요하다..~!
//처음부터 리팩토링은 어려움. 처음에는 잘 동작하는 동작을 짠 다음에
//그 이후에 리팩토링을 자주자주 하는 것이 중요함.
/*
lib폴더로 옮김
var template = {
  HTML : function (title,list,body,control){
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
            ${control}
            ${body}
            </body>
            </html>
            `;
          },
    list : function templateList(filelist){
              var list = '<ul>';
              var i=0;
              while(i < filelist.length) {
                list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
                i++;
              };
              list += '</ul>';

              return list;
            }
};//template end
*/
//모듈화!!!
var template = require('./lib/template.js');

  if(pathname==='/') { //올바른 경로
    var title = queryData.id;
    var description = '';

    //페이지가 열릴 때마다 직접 파일을 읽어서 로드하고 있으므로,
    //해당 파일 내용이 수정되어도 서버를 껐다 킬 필요가 없음!!(실시간으로 읽어서 띄우기 떄문..)
    fs.readdir('./data', function(err,filelist){
      //경로 파싱 -> 보안을 위한 것.
      var filteredId = path.parse(queryData.id).base;
      //var listIdx = templateList(filelist);
      var listIdx = template.list(filelist);
      var control = '<a href="/create">create</a>&nbsp;&nbsp;';

      fs.readFile(`./data/${filteredId}`, 'utf8', function(err, description){

          if(title === undefined) {//정의되지 않았다는 예약어, 없는 값
            title = 'Welcomed';
            description = 'Hello, Node.js';
          } else { //홈이 아닐 때는 update가 보이도록
            control +=`<a href="/update?id=${title}">update</a>&nbsp;&nbsp;`;
            control +=`<form action="/delete_process" method="post">
            <input type="hidden" name="id" value="${title}">
            <input type="submit" value="delete">
            </form>`;
          }

          var body = `<h2>${title}</h2>${description}`

          var html = template.HTML(title, listIdx, body,control );
          response.writeHead(200); //통신 성공
          response.end(html);

      });//readFile


  });//readdir

} else if(pathname ==='/create'){
  fs.readdir('./data', function(err,filelist){
    var listIdx = template.list(filelist);
    var title = 'WEB - create';
    var body
    = `
    <form action="/create_process" method="post">
      <p><input type="text" name="title" placeholder="title"></p>
      <p><textarea name="description" placeholder="description"></textarea></p>
      <p><input type="submit"></p>
    </form>
    `
    var control = '';
    var html = template.HTML(title, listIdx, body, control);
    response.writeHead(200); //통신 성공
    response.end(html);



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
    //2.데이터를 다 가져온 뒤(request.on이 끝난 뒤)실행되기로 약속되있는 함<
    request.on('end',function(){
      var post = qs.parse(body);
      //보낸 전체 값이 모두 출력됨
      var title = post.title;
      var description = post.description;

      //파일 생성
      fs.writeFile(`data/${title}`, description,'utf8'
        ,function(err){//콜백 안에 response를
          //302는 페이지를 리다이렉션 시키라는 의미임
          response.writeHead(302, {Location: `/?id=${title}`});
          response.end();
        }); //writeFile End

      });//request.on end End


//업데이
} else if(pathname === '/update'){
      fs.readdir('./data', function(err,filelist){
        var listIdx = template.list(filelist);
        var control = '';
        var title = queryData.id;
          fs.readFile(`./data/${title}`, 'utf8', function(err, description){


              //수정한 문서를 알기 위해 hidden으로 원래 파일이름(title)값을 넣어서 보내준다.
              var body = `
              <form action="/update_process" method="post">
                  <input type="hidden" name="id" value="${title}">
                  <p><input type="text" name="title" value="${title}"></p>
                  <p><textarea name="description" value="">${description}</textarea></p>
                  <p><input type="submit"></p>
                </form>
              `

              var html = template.HTML(title, listIdx, body,control );
              response.writeHead(200); //통신 성공
              response.end(html);

          });//readFile

      });//readdir


} else if (pathname === '/update_process') {
      var body='';
      request.on('data', function(data){
        body += data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        var id = post.id;
        /*
          fs.rename : 파일 이름 변경
          fs.rename('원래 파일 경로/이름','파일경로/바꿀이름',콜백함수)
        */
        fs.rename(`data/${id}`, `data/${title}`,function(err){
          fs.writeFile(`data/${title}`,description,'utf8',function(err){
            response.writeHead(302,{Location:`/?id=${title}`});
            response.end();
          });//writeFile End
        });//rename End



      });//request.on End

} else if(pathname === '/delete_process'){
      var body = '';
      request.on('data', function(data){
          body += data;
      });

      request.on('end', function(){
        var post = qs.parse(body);
        var id = post.id;
        var filteredId = path.parse(id).base;

        //삭제 펑션
        fs.unlink(`data/${filteredId}`, function(err){
            response.writeHead(302,{Location:`/`});
            response.end();
        }); //unlink end

      });//request end End



} else { //존재하지 않는 경로로 들어온 경우
    response.writeHead(404); //
    response.end('Not found');
  }
});
app.listen(3000);

//파일리스트 읽기
//내가 node를 실행하는 위치를 기준으로 폴더를 지정한다.
//ex) web2_node 에서 실행하므로 현재 폴더에 존재하는 data 디렉토리 지정
var testFolder = './data'; // == 'data'
var fs = require('fs');

fs.readdir(testFolder, function(error, filelist){
  console.log(filelist);
})

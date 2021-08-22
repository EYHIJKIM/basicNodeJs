/*
배열 형식의 객체
 idx 0 : nodejs런타임이 어디 위치하고 있는지에 대한 정보
     1 : 우리가 실행시킨 파일의 경로
     2부터는 : 우리가 입력한 입력값을 출력
*/
var args = process.argv;
var input = args[2];

console.log('A');
console.log('B');
/*
1을 입력했을 때는 C1이 찍히도록 하는 로직 짜보자
*/
if(input==='1') {
  console.log('C1');
} else {
  console.log('C2');
}

console.log('D');

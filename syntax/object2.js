// array, object



//자바스크립트에서함수는 구문인 동시에 값이다.
//여기서 값이란 어떠한 변수에 담을 수 있느냐, 없느냐

//에러가 남. 조건문은 값이 아님
//var i = if(true){console.log(1)};

//에러남. while문은 값이 아님
//var w = while(true){console.log(1)};

//에러가 나지 않음. 함수는 값이 될 수 있음.
var f = function(){
  console.log(1+1);
  console.log(1+2);
}

//1.1. 배열에 f를 담음(함수)
var a = [f];
//1.2. 배열의 첫번쨰 idx를 넣으면? f함수가 실행이 된다..!
a[0]();

//2.1. Object(객체)에 property(func)를 키로 value로써 f함수를 담음.
var o = {
  func : f
}

o.func();

//console.log('f',f);
//f();

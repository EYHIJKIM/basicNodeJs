var v1 = 'v1';
var v2 = 'v2';


var q = {
  v1 : 'v1',
  v2 : 'v2',
  //js에서 함수는 값이므로 object에 넣을 수 있음~
  f1 : function (){
    console.log(this.v1); //동일한 object에 속한 변수를 이용하므로 this 이용.
  },
  f2 : function (){
    console.log(this.v2);
  }
}

//실행 방법
q.f1();
q.f2();

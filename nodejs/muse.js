/*
var M = {
  v : 'v',
  f : function(){
        console.log(this.v);
      },
}
*/


/*
  모듈 : 최상위 단위.
  Object를 정리할 수 있는 좀 더 큰 틀의 단위
*/

var part = require('./mpart.js');
console.log(part);

part.f();

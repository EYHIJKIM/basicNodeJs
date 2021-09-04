

var M = {
  v : 'v',
  f : function(){
        console.log(this.v);
      },
}

M.f();

/*예약어
  M 객체의 기능을 바깥에서 사용할 수 있도록 exports 하는 기능
*/
module.exports = M;

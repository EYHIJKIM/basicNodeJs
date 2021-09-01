var members = ['egoing', 'k8805','hoyo'];
//console.log(members[1]);

var i = 0 ;

while(i < members.length){
console.log('array loop',members[i]);
  i = i +1;
}

//객체생성

var roles = {
  'programmer' : 'egoing',
  'designer' : 'k8805',
  'manager' : 'hoya'
};

console.log(roles.designer);


//name 에는 key값이 들어온다.
for(var name in roles) {
  console.log('object >>',name, 'value >>', roles[name]);
}

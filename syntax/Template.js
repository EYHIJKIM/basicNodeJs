var name = "kimze333";
var letter = 'I received weekly supervision from a psychologist at my community-counseling\n'+name+
'training site. She was smart and perceptive,with decades of experience helping addicts; I was lucky to have her guidance. Three months into treatment,I told my supervisor Grace was doing so well that we had agreed to cut our sessions from weekly to biweekly.remarkable how quickly she’s improving, I said. But my supervisor was cautious. Getting clean is hard, she told me, but staying clean is harder.'+name;
console.log(letter+'\n\n\n');


/*Template litteral 문법
  ``로 감싼다
  줄바꿈 : 엔터 두번..\n안써도 됨
  EL 문자 사용가능
*/
var letter2 = `I received weekly supervision from a psychologist at my community-counseling ${name}


training site. ${name}

${1+3+10+20}
She was smart and perceptive,with decades of experience helping addicts; I was lucky to have her guidance. Three months into treatment,I told my supervisor Grace was doing so well that we had agreed to cut our sessions from weekly to biweekly.
remarkable how quickly she’s improving, I said. But my supervisor was cautious. Getting clean is hard, she told me,
but staying clean is harder.${name}`

console.log(letter2);

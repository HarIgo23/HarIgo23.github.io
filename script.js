var numbers = {
    0:"ぜろ",
    1:"いち",
    2:"に",
    3:"さん",
    4:"よん",
    5:"ご",
    6:"ろく",
    7:"なな",
    8:"はち",
    9:"きゅう",
    10:"じゅう"
}
var btnGenerate = document.getElementById('generate');
var fieldQuestion = document.getElementById('question');
var fieldAnswer = document.getElementById('answer');
function generate_couple_number_word(){
    var generate_number = Math.floor(99 * Math.random());
    return convert_japanese_number(generate_number);
}
function convert_japanese_number(number){
    var str_gen_num = String(number);
    switch(true){
        case number >= 0 && number <= 10:
            var word = numbers[number];
            return {number:number, word:word};
        case number >= 11 && number <= 19:
            var word = numbers[10]+numbers[str_gen_num[1]];
            return {number:number, word:word};
        case number >= 20 && number <= 99:
            var word = 
                numbers[str_gen_num[0]] + 
                numbers[10] + 
                ((str_gen_num[1] != 0) ? numbers[str_gen_num[1]] : '');
            return {number:number, word:word}; 
    }
}

window.onload = function(){
    initialNext();
    btnGenerate.onclick = function(){
        if(fieldAnswer.value == convert_japanese_number(fieldQuestion.innerHTML).word){
            fieldQuestion.classList.add('true-answer');
        }else{
            fieldQuestion.classList.add('wrong-answer');
        }
        fieldQuestion.innerHTML += " / " + convert_japanese_number(fieldQuestion.innerHTML).word;
        btnGenerate.disabled = true;
        setTimeout(initialNext,3000);
    }
    function initialNext(){
        if(fieldQuestion.classList.contains('true-answer')){
            fieldQuestion.classList.remove('true-answer');
        }else{
            fieldQuestion.classList.remove('wrong-answer');
        }
        fieldAnswer.value = '';
        var couple = generate_couple_number_word();
        fieldQuestion.innerHTML = couple.number;
        btnGenerate.disabled = false;
    }
    document.querySelector('input').addEventListener('keydown', function(e) {
        if (e.keyCode === 13) {
          btnGenerate.click();
        }
      });
}
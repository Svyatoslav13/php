// АХТУНГ!!! На 4 балла не доделано

const numbers = {
    0: 'ноль',
    1: 'один',
    2: 'два',
    3: 'три',
    4: 'четыре',
    5: 'пять',
    6: 'шесть',
    7: 'семь',
    8: 'восемь',  
    9: 'девять',
    10: 'десять',
    11: 'одиннадцать',
    12: 'двенадцать',
    13: 'тринадцать',
    14: 'четырнадцать',
    15: 'пятнадцать',
    16: 'шестнадцать',
    17: 'семнадцать',
    18: 'восемнадцать',
    19: 'девятнадцать',
    20: 'двадцать',
    30: 'тридцать',
    40: 'сорок',
    50: 'пятьдесят',
    60: 'шестьдесят',
    70: 'семьдесят',
    80: 'восемьдесят',
    90: 'девяносто',
    100: 'сто',
    200: 'двести',
    300: 'триста',
    400: 'четыреста',
    500: 'пятьсот',
    600: 'шестьсот',
    700: 'семьсот',
    800: 'восемьсот',
    900: 'девятьсот'
}

let numInStr = function(number) {
    let result = number.split('')
      , negative = false;
    
    if (result[0] == '-') {
        number = result.splice(1).join('');
        console.log(number);
        result = number.split('');
        console.log(result);
        negative = true;
    }
    switch (result.length) {
        case 1:
            return negative ? 'минус ' + numbers[number] : numbers[number];
            break;
        case 2:
            if (result[1] == 0 || (number < 20 && number > 10)) {
                return negative ? 'минус ' + numbers[number] : numbers[number];
            } else {
                return negative ? 'минус ' + numbers[result[0]+'0'] + ' ' + numbers[result[1]] : numbers[result[0]+'0'] + ' ' + numbers[result[1]];
            }
            break;
        case 3:
            if (result[2] == 0 && result[1] == 0 ) {
                return negative ? 'минус ' + numbers[number] : numbers[number];
            } else if (result[2] == 0 || ((result[1]+result[2]) < 20 && (result[1]+result[2]) > 10)) {
                return  negative ? 'минус ' + numbers[result[0] + '00'] + ' ' + numbers[result[1]+result[2]] : numbers[result[0] + '00'] + ' ' + numbers[result[1]+result[2]];
            } else {
                return negative ? 'минус ' + numbers[result[0] + '00'] + ' ' + numbers[result[1]+'0'] + ' ' + numbers[result[2]] : numbers[result[0] + '00'] + ' ' + numbers[result[1]+'0'] + ' ' + numbers[result[2]];
            }
            break;
    }
}
let min, max;
let minValue = parseInt(prompt('Минимальное знание числа для игры','0')) || 0;
let maxValue = parseInt(prompt('Максимальное знание числа для игры','100')) || 100;

document.getElementById('in1').addEventListener('blur', function(event) {
    min = parseInt(this.value) || 0;
    console.log(min); 
    if (min && max) {
        min = min < -999 ? -999 : min;
        max = max >  999 ?  999 : max;
        this.type = 'hidden'; 
        document.getElementById('in2').type = 'hidden';
        document.getElementById('begin').textContent = `Загадайте любое целое число от ${min} до ${max}, а я его угадаю`
    } 
})
document.getElementById('in2').addEventListener('blur', function(event) {
    max = parseInt(this.value) || 100;
    console.log(max);
    if (min && max) {
        min = min < -999 ? -999 : min;
        max = max >  999 ?  999 : max;
        document.getElementById('begin').textContent = `Загадайте любое целое число от ${min} до ${max}, а я его угадаю`
        this.type = 'hidden';
        document.getElementById('in1').type = 'hidden'; 
    }    
})
min = min < -999 ? -999 : min;
max = max >  999 ?  999 : max;

minValue = minValue < -999 ? -999 : minValue;
maxValue = maxValue >  999 ?  999 : maxValue;

alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
let answerNumber  = Math.floor((minValue + maxValue) / 2);
let orderNumber = 1;
let gameRun = true;

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

let rand = Math.round( Math.random() * 3);

orderNumberField.innerText = orderNumber;


answerField.innerText = (rand == 1) ? `Вы загадали число ${numInStr(String(answerNumber))}?` : 
                        (rand == 2) ? `Да это легко. Ваше число ${numInStr(String(answerNumber))}?` : `Наверное, это число ${numInStr(String(answerNumber))}?`;

document.getElementById('btnRetry').addEventListener('click', function () {
    minValue = 0;
    maxValue = 100;
    orderNumber = 0;

    minValue = parseInt(prompt('Минимальное знание числа для игры',minValue)) || minValue;
    maxValue = parseInt(prompt('Максимальное знание числа для игры',maxValue)) || maxValue;

    minValue = minValue < -999 ? -999 : minValue;
    maxValue = maxValue >  999 ?  999 : maxValue;
    
    alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
    answerNumber  = Math.floor((minValue + maxValue) / 2);
    orderNumber = 1;
    gameRun = true;
    orderNumberField.innerText = orderNumber;
    rand = Math.round( Math.random() * 3);
    answerField.innerText = (rand == 1) ? `Вы загадали число ${numInStr(String(answerNumber))}?` : 
                            (rand == 2) ? `Да это легко. Ваше число ${numInStr(String(answerNumber))}?` : `Наверное, это число ${numInStr(String(answerNumber))}?`;
})

document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber  + 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            rand = Math.round( Math.random() * 3);
            answerField.innerText = (rand == 1) ? `Вы загадали число ${numInStr(String(answerNumber))}?` : 
                                    (rand == 2) ? `Да это легко. Ваше число ${numInStr(String(answerNumber))}?` : `Наверное, это число ${numInStr(String(answerNumber))}?`;
        }
    }
})

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun){
        rand = Math.round( Math.random() * 3);
        answerField.innerText = (rand == 1) ? `Я всегда угадываю\n\u{1F60E}` : 
                                (rand == 2) ? `Это было просто\n\u{1F60E}` : `В следующий раз загадывай сложнее\n\u{1F60E}`; 
        gameRun = false;
    }
})

document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            maxValue = answerNumber - 1;
            answerNumber  = Math.round((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            rand = Math.round( Math.random() * 3);
            answerField.innerText = (rand == 1) ? `Вы загадали число ${numInStr(String(answerNumber))}?` : 
                                    (rand == 2) ? `Да это легко. Ваше число ${numInStr(String(answerNumber))}?` : `Наверное, это число ${numInStr(String(answerNumber))}?`;
        }
    }
})

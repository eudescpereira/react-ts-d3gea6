import * as React from 'react';
import './style.css';

const body = document.getElementById('div');
let questionNumbers;

// Pegar um número aleatório
function randomNumber() {
  questionNumbers = [];

  while (questionNumbers.length < 4) {
    let num = Math.floor(Math.random() * 9 + 1);
    if (questionNumbers.indexOf(num) === -1) {
      questionNumbers.push(num);
    }
  }
}

randomNumber();

// Mostrar Resultado
let result = document.getElementById('result');

let form = document.getElementById('gameForm');

// Inserir resposta
var inputbox = document.getElementById('answerInput');

let btn = document.getElementsByTagName('button');

export default function App() {
  var opportunities = 0;

  const tentativa = () => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      // inserir resposta
      var answer = inputbox.textContent;

      // resposta correta
      if (answer === questionNumbers.join('')) {
        result.textContent =
          'Você conseguiu! O número secreto é: ' + questionNumbers.join('');
        inputbox.textContent = '';
        inputbox.focus();
        randomNumber();
        opportunities = 0;
      } else {
        // resposta incorreta
        var answerArr = answer.split('');
        // mesmo número, mesma posição
        var bulls = 0;
        // mesmo número, posição diferente
        var cows = 0;
        opportunities += 1;

        if (opportunities > 10) {
          // Se o usuário errar 10 vezes
          result.textContent =
            'Você tentou 10 vezes! O número secreto era: ' +
            questionNumbers.join('') +
            '.';
          inputbox.textContent = '';
          inputbox.focus();
          randomNumber();
          opportunities = 0;
        } else {
          for (var i = 0; i <= 3; i += 1) {
            if (Number(answerArr[i]) === questionNumbers[i]) {
              //Checar número e posição
              bulls += 1;
            } else if (questionNumbers.indexOf(Number(answerArr[i])) > -1) {
              // Posição diferente mas número correto
              cows += 1;
            }
          }
          result.textContent =
            opportunities + ' tentativas' + bulls + ' Bulls' + cows + ' Cows';
          inputbox.textContent = '';
          inputbox.focus();
        }
      }
    });
  };
  return (
    <div className="App">
      <h1>Jogo da Senha</h1>
      <h2>Bulls and Cows</h2>
      <div id="div">
        <form id="gameForm">
          <h3 id="result"></h3>
          <h4>Digite 4 números diferentes:</h4>
          <input
            id="answerInput"
            type="text"
            pattern="^[0-9]*$"
            placeholder="Senha de 4 digitos"
          />{' '}
          <button>Inserir</button>
        </form>
      </div>
    </div>
  );
}

import * as React from 'react';
import './style.css';

const body = document.body;
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

let btn = document.getElementById('button');

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
          'Você conseguiu! O número secreto: ' + questionNumbers.join('');
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
          result.textContent = bulls + 'Bulls and ' + cows + ' Cows.';
          inputbox.textContent = '';
          inputbox.focus();
        }
      }
    });
  };
  return (
    <div className="App">
      <h1>Jogo da Senha</h1>
      <h3>Bulls and Cows</h3>
      <h1 id="result"></h1>
      <p>
        <label htmlFor="text">Digite 4 números diferentes: </label>
        <form id="gameForm">
          <input
            id="answerInput"
            type="text"
            pattern="^[0-9]*$"
            placeholder="Senha de 4 digitos"
          />{' '}
          <button id="button" onClick={tentativa}>
            Inserir
          </button>
        </form>
      </p>
      {Number.length > 0 && (
        <table id="result" style={{ border: 'solid 1px black', width: '100%' }}>
          <thead>
            <tr key={opportunities}>
              <th>Tentativa 1</th>
              <th>Bulls</th>
              <th>Cows</th>
            </tr>
          </thead>
        </table>
      )}
    </div>
  );
}

'use strict';

let winnerColor = document.getElementById("winner-color");
let winnerScore = document.getElementById("winner-score");
let looserScore = document.getElementById("looser-score");
let wrong = document.getElementById("wrong");
let right = document.getElementById("correct");
let squares = document.querySelectorAll(".square");

let numberSquares = 3;
let colorVar = storeColors();
let pickedColor = pickAColor();

/// Crear las variables de los marcadores
let scoreRight = 0;
let scoreWrong = 0;
const customModelMain = document.querySelector(".popup-main");
const playAgain = document.getElementById("play-again");
const youWin = document.getElementById("you-win");
const youLoose = document.getElementById("you-loose");

// Generar colores RGB aleatorios
function randomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);

  return "rgb(" + r + ", " + g + ", " + b + ")";
}

//Añadir uno de los colores aleatorios al selector
winnerColor.textContent = pickedColor.toUpperCase();

// Guardar los colores generados en un array
function storeColors() {
  let colorArray = [];
  for (let i = 0; i < numberSquares; i++) {
    colorArray.push(randomColor());
  }
  return colorArray;
}

// Elegir un color de el array guardado
function pickAColor() {
  let randomIndex = Math.floor(Math.random() * colorVar.length);
  return colorVar[randomIndex];
}

// Función del juego
function setUpGame() {
  for (let i = 0; i < squares.length; i++) {
    //Añadir los colores a las cuadros
    squares[i].style.background = colorVar[i];

    // Al hacer click en un cuadrado tomar el color
    squares[i].addEventListener("click", function () {
      let clickedSquare = this.style.background;

      if (clickedSquare === pickedColor) {
        // Increntar en 1 el marcador de aciertos
        scoreRight++;
        winnerScore.textContent = scoreRight;
        //Mostrar el mensaje de acierto
        right.classList.remove("hidden");
        
      } else {
        // Increntar en 1 el marcador de fallos
        scoreWrong++;
        looserScore.textContent = scoreWrong;
        //Mostrar el mensaje de fallo
        wrong.classList.remove("hidden");
      }
      scoreSetUp();
    });
  }
}

// Función del marcador
function scoreSetUp() {
  // Al llegar a 3 acierto o fallos termina la partida
  if (scoreRight === 3 || scoreWrong === 3) {
    customModelMain.classList.add("model-open");

    if (scoreRight === 3) {
      youWin.classList.remove("hidden");
    } else {
      youLoose.classList.remove("hidden");
    }

    playAgain.addEventListener("click", function () {
      customModelMain.classList.remove("model-open");
      setTimeout(() => {
        resetGame();
      }, 500);
    });
  } else {
    //Timeout para resetear los colores
    setTimeout(() => {
      resetColors();
    }, 500);
  }
}

//Resetear los colores
function resetColors() {
  colorVar = storeColors();
  pickedColor = pickAColor();
  winnerColor.textContent = pickedColor.toUpperCase();
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.background = colorVar[i];
  }
  setTimeout(() => {
    right.classList.add("hidden");
    wrong.classList.add("hidden");
  }, 500);
}

// Resetear el juego
function resetGame() {
  scoreRight = 0;
  scoreWrong = 0;
  winnerScore.textContent = scoreRight;
  looserScore.textContent = scoreWrong;
  youWin.classList.add("hidden");
  youLoose.classList.add("hidden");
  right.classList.add("hidden");
  wrong.classList.add("hidden");
}

// Empezar el juego
setUpGame();

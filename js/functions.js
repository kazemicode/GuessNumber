var randNumber = Math.floor(Math.random() * 99) + 1; 
//console.log(randNumber);
var gamesWon = 0;
var gamesLost = 0;
var wins = document.querySelector('#wins');
var losses = document.querySelector('#losses');
var stats = document.querySelector('#stats');

/* guesses, lastResult, and lowOrHi each store references to results para we will have in HTML */
var guesses = document.querySelector('#guesses'); // document.querySelector returns FIRST element that has 
                                                  // the ID attribute w/ the specified value; null if not found
var lastResult = document.querySelector('#lastResult');
var lowOrHi = document.querySelector('#lowOrHi');

/* guessSubmit and guessField reference the form text input and submit button */
var guessSubmit = document.querySelector('.guessSubmit'); // ref to submit button
var guessField = document.querySelector('.guessField'); // can access element via CSS class OR by HTML div ID

/* guessCount and resetButton store the number of guesses the user has used and a ref to the reset button  */
var guessCount = 1;
var resetButton = document.querySelector('#reset'); //ref to reset button
resetButton.style.display = 'none'; // hide resetButton; sets CSS display styling to none


function checkGuess() {
  var userGuess = Number(guessField.value); // get the value submitted by user in guessField
  
  if(userGuess < 1 || userGuess > 99 || isNaN(userGuess))
    {
      alert("Invalid guess. Guess numbers between 1-99");
    }
  else
  {
    if(guessCount === 1)
    {
      guesses.innerHTML = 'Previous guesses: ';
    }
    guesses.innerHTML += userGuess + ' ';
    if(userGuess === randNumber)
      {
        lastResult.innerHTML = 'Yay! You got it right!';
        lastResult.style.backgroundColor = 'green';
        lowOrHi.innerHTML ='';
        gamesWon++;
        setGameOver();
      }
    else if(guessCount === 7)
      {
        lastResult.innerHTML = 'Sorry, you lose!';
        gamesLost++;
        setGameOver();

      }

    else
      {
        lastResult.innerHTML = 'Wrong!';
        lastResult.style.backgroundColor = 'red';
        if(userGuess < randNumber)
          {
            lowOrHi.innerHTML ='Last guess was toooooo low';
          }
        else
          {
            lowOrHi.innerHTML = 'Last guess was tooooo high';
          }
      }
      guessCount++;
      
  }
      guessField.value = '';
      guessField.focus();
}

guessSubmit.addEventListener('click', checkGuess)

function setGameOver()
{
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton.style.display = 'inline';
  resetButton.addEventListener('click', resetGame);
}

function resetGame()
{
  var resetParas = document.querySelectorAll('.resultParas p');
  for(var i = 0; i < resetParas.length; i++){
    resetParas[i].textContent = '';
  }

  resetButton.style.display = 'none';
  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus(); // puts text cursor into the the textfield with this id

  lastResult.style.backgroundColor = 'white';

  randNumber = Math.floor(Math.random() * 99) + 1;
  guessCount = 1;
  
  wins.innerHTML = gamesWon;
  losses.innerHTML = gamesLost;
}



// document.getElementById finds the id that matches within the HTML
// innerHTML sets the content of the <span> tag element to assigned variable
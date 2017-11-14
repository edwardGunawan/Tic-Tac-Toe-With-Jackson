var origBoard; // keep track on what on each square of the tic-tac-toe board, if it is x o or nothing
// const means that you cannot reassigned the value
const huPlayer = 'O'; // human player
const aiPlayer = 'X'; // AI player
// various kinds of winning combination
var winCombination = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

const cells = document.querySelectorAll('.cell');
startGame();



/*
  startGame function:
  Initialized the game so everytime when started the function will get executed.
  It add an eventListener to all the table cells on the game so that users are able
  to click on it

  hidden the modal everytime when game start
*/
function startGame(){
  document.querySelector(".end-game").style.visibility = "hidden";
  origBoard = Array.from(Array(9).keys());
  for(var i = 0; i< cells.length; i++){
    cells[i].innerText = '';
    cells[i].style.removeProperty('background-color'); // when win will highlight the background color
    cells[i].addEventListener('click', turnClick, false);
  }
}

/*
  turnClick function:
  determine set the human players goes then the ai player goes
  get called on start game for an event listener
  triggers 'x' or 'o'
  human takes turn, then ai will take turn

  return: void
*/
function turnClick(square){
  // add place that only been click
  // means neither the human or the ai is playing on that spot
  if(typeof origBoard[square.target.id] == 'number'){
      turn(square.target.id,huPlayer);
  }
  // best spot will return the id to click
  if(!checkTie()) turn(bestSpot(), aiPlayer);
}

/*
  turn function:
  Set the board array the origBoard to player
  Set the board that can be seen in the cells[squareId] to the player
  shows whos win and whos lose
  return: void
*/
function turn(squareId, player){
  origBoard[squareId] = player; // keep track on the board
  cells[squareId].innerText = player;
  // let is a block variable so that it cannot be access outside of it ES6
  let gameWon = checkWin(origBoard, player);
  if(gameWon) gameOver(gameWon);
}


/*
  checkWin Function:
  Determine the winner of the player

  Things to note:
  Reduce function : applies a function against an accumulator and each element
  in the array (from left to right), the last argument is the initial value
  the accum is the accumulator that is the result of the reduce function

  return: object gameWon include the index of the winCombination and the player
*/
function checkWin(origBoard, player){
  let plays = origBoard.reduce((accum,currValue, currIndex) =>{
    return (currValue === player) ? accum.concat(currIndex) : accum;
  },[]); // [] is the initial value

  let gameWon = null;
  // cehck if the plays is within the winCombination
  // create an iterator look at mdn for more info
  for(let [index,win] of winCombination.entries()){
    // entries get the index and the win
    if(win.every(elem => plays.indexOf(elem) > -1)){
      // return which winCombo the player will win, and which player won
      // the index in the winCombination
      gameWon = { index: index, player:player};
      break;
    }
  }
  return gameWon;
}


/*
  GameOver function:
  for loop to highlight all the combination that is gameWon
  Declare the winner
  return: void
*/
function gameOver(gameWon){
  // loop through each index in the winCombination winCombination
  // change the background color AI: blue Human: red
  for(let index of winCombination[gameWon.index]) {
    document.getElementById(index).style.backgroundColor =
      gameWon.player == huPlayer ? 'blue' : 'red';

  }
  // remove the eventListener for turnClick to false so user are not able to click
  // the cell anymore
  for(var i = 0 ; i< cells.length; i++){
    cells[i].removeEventListener('click', turnClick, false);
  }
  declareWinner(gameWon.player == huPlayer ? 'You win!' : 'You lose.');

}


/*
  Declare Winner Function:
    pass in if the computer wins or the human wins
    check the endgame to pop up the modal
    pass in the  text to show whos win and whos lose
    show modal pop-up on the screen
  */
  function declareWinner(who){
      document.querySelector('.end-game').style.visibility = 'visible';
      document.querySelector('.end-game #text h2').innerHTML = who;
  }


/*
  EmptySquare function:
    get all the emptySquare element in the origBoard
    Use filter method to creates new array with all elements that can pass the
    test implemented by the provided function
    return: emptyIndex array
*/
  function emptySquares(){
    return origBoard.filter(board => typeof board == 'number');
  }


/*
  BestSpot function:
    Find spot for the ai player to play
    return: the first occurance best spot right now in the origBoard
  */
  function bestSpot(){
    return minimax(origBoard,aiPlayer).index;
  }


/*
  Check Tie function:
  If the length of the emptySquare is equal 0 means everything has been
  preoccupied but there is no winner
  return : true or false whether it is tie or not
*/
  function checkTie(){
    if(emptySquares().length ==  0) {
      for(var i = 0 ; i< cells.length; i++){
        cells[i].style.backgroundColor = 'green';
        cells[i].removeEventListener('click',turnClick,false);
      }
      declareWinner('Tie Game!');
      return true;

    }
    return false;
  }


/*
  Minimax Algorithm:
  1. Return a value if a terminal state is found
    aiPlayer can win from that spot is 20 or 10
    huPlayer can win from that spot is -10
    and if it is a tie then the score will be 0
  2. go through available spots on the board
  3. call the minimax function on each available spot
  4. evaluate returning value from function calls
  5. and return the best value

  sub problem: min(max(0....8)) get the value of the minimum

  recursion reach the terminal state until it is the end,
  so every time when reached up it will set the result to the newBoard index
  and push it to the moves array

  return: object score
*/
function minimax(newBoard, player){
  var availSpots = emptySquares(newBoard);

  // if human player is winning then it is -10
  // if ai player is winning then it is 20 or 10
  // if it is a tie then the score will be 0
  // Base Case
  if(checkWin(newBoard, player)){
    return {score: -10};
  }else if(checkWin(newBoard,aiPlayer)){
    return {score: 20};
  }else if(availSpots.length === 0){
    return {score: 0};
  }

  // collect the score from each of the empty spot to evaluate later
  // generate all possible combination with backtrack
  var moves = [];
  for(var i = 0; i < availSpots.length; i++){
    var move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player; // store the empty spot to the new player

    // recursively going through the aiPlayer and the huPlayer
    if(player == aiPlayer){
      var result = minimax(newBoard,huPlayer);
      move.score = result.score;
    }else{
      var result = minimax(newBoard,aiPlayer);
      move.score = result.score;
    }

    // set the new board from what it has before
    // backtracking by reseting the newBoard to what it was before and
    // push the moves
    newBoard[availSpots[i]] = move.index;

    moves.push(move);
  }

  // choose the best moves (index)
  // that the ai is playing and worst moves that the human is playing
  var bestMove;
  if(player === aiPlayer){
    var bestScore = -10000;
    for(var i = 0 ; i< moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }else {
    var bestScore = 10000;
    for(var i = 0 ; i< moves.length; i++){
      if(moves[i].score < bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];

}

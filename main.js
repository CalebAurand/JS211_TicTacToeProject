'use strict';

// brings in the assert module for unit testing
const assert = require('assert');
// brings in the readline module to access the command line
const readline = require('readline');
// use the readline module to print out to the command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// creates and empty "board" for the user to see where marks can be placed.
// using let because the variable is expected to change with more 'X's and 'O's to add
let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

// assigns the first mark as 'X'
// using let because the variable is expected to change from 'X' to 'O' and back
let playerTurn = 'X';

// is a function that print the current status of the board using the variable - board
const printBoard = () => {
  console.log('   0  1  2');
  console.log('0 ' + board[0].join(' | '));
  console.log('  ---------');
  console.log('1 ' + board[1].join(' | '));
  console.log('  ---------');
  console.log('2 ' + board[2].join(' | '));
}

const horizontalWin = () => {
  // Your code here to check for horizontal wins
  if(
  (board[0][0]==='X' && board[0][1]==='X' && board[0][2]==='X')||
  (board[0][0]==='O' && board[0][1]==='O' && board[0][2]==='O')
  ){
    //code for row 0 win
    console.log('row 0 win');
    return true;
  }else if(
  (board[1][0]==='X' && board[1][1]==='X' && board[1][2]==='X')||
  (board[1][0]==='O' && board[1][1]==='O' && board[1][2]==='O')
  ){
    //code for row 1 win
    console.log('row 1 win');
    return true;
  }else if(
  (board[2][0]==='X' && board[2][1]==='X' && board[2][2]==='X')||
  (board[2][0]==='O' && board[2][1]==='O' && board[2][2]==='O')
  ){
    //code for row 2 win
    console.log('row 2 win');
    return true;
  }else{
    //code for no horizontal win
    return false;
  }
};

const verticalWin = () => {
  // Your code here to check for vertical wins
  if(
  (board[0][0]==='X' && board[1][0]==='X' && board[2][0]==='X')||
  (board[0][0]==='O' && board[1][0]==='O' && board[2][0]==='O')
  ){
    //code for col 0 win
    console.log('col 0 win');
    return true;
  }else if(
  (board[0][1]==='X' && board[1][1]==='X' && board[2][1]==='X')||
  (board[0][1]==='O' && board[1][1]==='O' && board[2][1]==='O')
  ){
    //code for row 1 win
    console.log('col 1 win');
    return true;
  }else if(
  (board[0][2]==='X' && board[1][2]==='X' && board[2][2]==='X')||
  (board[0][2]==='O' && board[1][2]==='O' && board[2][2]==='O')
  ){
    //code for row 2 win
    console.log('col 2 win');
    return true;
  }else{
    //code for no horizontal win
    return false;
  }
};

const diagonalWin = () => {
  // Your code here to check for diagonal wins
  if(
    (board[0][0]==='X' && board[1][1]==='X' && board[2][2]==='X')||
    (board[0][0]==='O' && board[1][1]==='O' && board[2][2]==='O')
  ){
    //code for diag left win
    console.log('diagonal left win');
    return true;
  }else if(
    (board[0][2]==='X' && board[1][1]==='X' && board[2][0]==='X')||
    (board[0][2]==='O' && board[1][1]==='O' && board[2][0]==='O')
  ){
    // code for diag right win
    console.log('diagonal right win');
    return true;
  }else{
    // code for no diagonal win
    return false;
  }
};

const checkForWin = () => {
  // Your code here call each of the check for types of wins
  if(horizontalWin()){ // check for win, if true alert winner
    console.log(playerTurn + ' wins horizontally');
    return true;
  }else if(verticalWin()){//check for win, if true alert winner
    console.log(playerTurn + ' wins vertically');
    return true;
  }else if(diagonalWin()){//check for win, if true alert winner
    console.log(playerTurn + ' wins diagonally');
    return true;
  }else{
    return false;
  }
  
  // horizontalWin();
  // verticalWin();
  // diagonalWin();
};

const ticTacToe = (row, column) => {
  // Your code here to place a marker on the board
  board[row][column] = playerTurn;
  
  // then check for a win
  checkForWin();
  
  if (playerTurn === 'X'){
    playerTurn = 'O'
  }else{ playerTurn = 'X'
};
}

const getPrompt = () => {
  printBoard();
  console.log("It's Player " + playerTurn + "'s turn.");
  rl.question('row: ', (row) => {
    rl.question('column: ', (column) => {
      ticTacToe(row, column);
      getPrompt();
    });
  });
}


// Unit Tests
// You use them run the command: npm test main.js
// to close them ctrl + C
if (typeof describe === 'function') {

  describe('#ticTacToe()', () => {
    it('should place mark on the board', () => {
      ticTacToe(1, 1);
      assert.deepEqual(board, [ [' ', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should alternate between players', () => {
      ticTacToe(0, 0);
      assert.deepEqual(board, [ ['O', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should check for vertical wins', () => {
      board = [ [' ', 'X', ' '], [' ', 'X', ' '], [' ', 'X', ' '] ];
      assert.equal(verticalWin(), true);
    });
    it('should check for horizontal wins', () => {
      board = [ ['X', 'X', 'X'], [' ', ' ', ' '], [' ', ' ', ' '] ];
      assert.equal(horizontalWin(), true);
    });
    it('should check for diagonal wins', () => {
      board = [ ['X', ' ', ' '], [' ', 'X', ' '], [' ', ' ', 'X'] ];
      assert.equal(diagonalWin(), true);
    });
    it('should detect a win', () => {
      ticTacToe(0, 0)
      ticTacToe(0, 1)
      ticTacToe(1, 1)
      ticTacToe(0, 2)
      ticTacToe(2, 2)
      assert.equal(checkForWin(), true);
    });
  });
} else {

  getPrompt();

}

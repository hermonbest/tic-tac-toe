const boardContainer = document.getElementById('game-board');
 console.log(boardContainer);
function createBoardElements() {
    // Clear any existing content (useful for resetGame)
    boardContainer.innerHTML = ''; 

    // Outer loop for Rows (r)          
    GameBoard.board.forEach((row, r) => {
        
        const rowElement = document.createElement('div');
        rowElement.classList.add('board-row'); // For styling
        
        // Inner loop for Cells (c)
        row.forEach((cell, c) => {
            const cellElement = document.createElement('div');
            
            // --- 3. Attach crucial data attributes for logic ---
            cellElement.dataset.row = r;
            cellElement.dataset.col = c;
            
            cellElement.classList.add('board-cell'); // For styling
            
            // Display the current content ('X', 'O', or empty)
            cellElement.textContent = cell || ''; 

            // Append the cell to the current row
            rowElement.appendChild(cellElement);
        });

        // Append the row to the main container
        boardContainer.appendChild(rowElement);
    });

    // --- 4. Attach Event Listener (Delegate the clicks) ---
    boardContainer.addEventListener('click', handleCellClick);
}

// --- 5. The function to handle the click (connects to your game logic) ---
function handleCellClick(event) {
    const cell = event.target;

    // Check if the click was actually on a cell
    if (!cell.classList.contains('board-cell')) {
        return; 
    }

    // Extract row and col from the data attributes (they are strings, parse to int)
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

    // Call your core game logic!
    game.playerMove(row, col);

    // Update the visual state immediately after the move
    renderBoard(); 
}

// --- 6. The renderer function (Updates text content based on JS state) ---
function renderBoard() {
    const cells = boardContainer.querySelectorAll('.board-cell');
    cells.forEach(cell => {
        const r = parseInt(cell.dataset.row);
        const c = parseInt(cell.dataset.col);
        
        // Update the cell content. Use '|| '' ' to show nothing if the value is null.
        cell.textContent = GameBoard.board[r][c] || '';
    });
    
    // You would also call a function here to update the status display (current player, winner).
}



const GameBoard = {
  board: [
    
    [null,null,null],
    [null,null,null],
    [null,null,null]
  ],

  renderBoard() {
    console.log(this.board);
  },
  updateBoard(row, col, marker) {
    this.board[row][col] = marker;
  },
};

const player = {
  player1: "X",
  player2: "O",
  currentPlayer: "player1",
  switchPlayer() {
    if (this.currentPlayer === "player1") {
      this.currentPlayer = "player2";
    } else {
      this.currentPlayer = "player1";
    }
  },
  getPlayerSymbol() {
    return this[this.currentPlayer];
  },
};
const game = {
    winner: null,
  wincombinations: [
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ],
  startGame() {
   this.resetGame(); // Reuse the cleanup logic
    createBoardElements();
    renderBoard();
    console.log("Game started. Player X begins.");
  },
  checkWin() {
    for (const combination of this.wincombinations) {
      const [spot1, spot2, spot3] = combination;
      const markerA = GameBoard.board[spot1[0]][spot1[1]];
      const markerB = GameBoard.board[spot2[0]][spot2[1]];
      const markerC = GameBoard.board[spot3[0]][spot3[1]];
if ( markerA === null || markerB === null || markerC === null) {
        continue;
      }
      if (markerA === markerB && markerB === markerC) {
        return markerA;
      }
    }
    return null;

            
  },
  checkDraw() {
    for (const row of GameBoard.board) {
        for (const cell of row) {
            if (cell === null) {
                return false;
            }
        }
    }
    return true;
  },
 playerMove(row, col) {
     if (this.winner !== null) { // Check if the game is over
        alert(`Game is already over. The winner is ${this.winner}.`);
        return;
    }
    if (GameBoard.board[row][col] !== null) {
        console.log("Cell already occupied!");
        return;
    }
    const marker = player.getPlayerSymbol();
    GameBoard.updateBoard(row, col, marker);
    const result = this.checkWin();
    if (result) {
        this.winner = result;
      alert(`Player ${marker} wins!`);
    } else if (this.checkDraw()) {
      alert("It's a draw!");
    } else {
      player.switchPlayer();
    } 

},
   
  resetGame() {
    // 1. Reset Board
    GameBoard.board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    // 2. Reset Winner
    this.winner = null;
    // 3. Reset Current Player (assuming P1 always starts)
    player.currentPlayer = "player1";
    console.log("Game reset. Player X starts.");
  },
};

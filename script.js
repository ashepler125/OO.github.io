document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('game-board');
  const scoreDisplay = document.getElementById('score');
  const width = 8;
  const squares = [];
  const candyColors = ['red', 'yellow', 'orange', 'green', 'blue', 'purple'];
  let score = 0;

  // Create the board
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement('div');
      square.setAttribute('draggable', true);
      square.setAttribute('id', i);
      let randomColor = candyColors[Math.floor(Math.random() * candyColors.length)];
      square.style.backgroundColor = randomColor;
      board.appendChild(square);
      squares.push(square);
    }
  }

  createBoard();

  let colorBeingDragged;
  let colorBeingReplaced;
  let squareIdBeingDragged;
  let squareIdBeingReplaced;

  squares.forEach(square => square.addEventListener('dragstart', dragStart));
  squares.forEach(square => square.addEventListener('dragend', dragEnd));
  squares.forEach(square => square.addEventListener('dragover', dragOver));
  squares.forEach(square => square.addEventListener('dragenter', dragEnter));
  squares.forEach(square => square.addEventListener('dragleave', dragLeave));
  squares.forEach(square => square.addEventListener('drop', dragDrop));

  function dragStart() {
    colorBeingDragged = this.style.backgroundColor;
    squareIdBeingDragged = parseInt(this.id);
  }

  function dragEnd() {
    // Valid moves
    let validMoves = [
      squareIdBeingDragged - 1,
      squareIdBeingDragged - width,
      squareIdBeingDragged + 1,
      squareIdBeingDragged + width,
    ];
    let validMove = validMoves.includes(squareIdBeingReplaced);

    if (squareIdBeingReplaced && validMove) {
      squareIdBeingReplaced = null;
    } else if (squareIdBeingReplaced && !validMove) {
      squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplaced;
      squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
    } else {
      squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
    }
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function dragEnter(e) {
    e.preventDefault();
  }

  function dragLeave() {}

  function dragDrop() {
    colorBeingReplaced = this.style.backgroundColor;
    squareIdBeingReplaced = parseInt(this.id);
    this.style.backgroundColor = colorBeingDragged;
    squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced;
  }

  // Check for matches
  function checkRowForThree() {
    for (let i = 0; i < 61; i++) {
      let rowOfThree = [i, i + 1, i + 2];
      let decidedColor = squares[i].style.backgroundColor;
      const isBlank = decidedColor === '';

      if (
        rowOfThree.every(
          index => squares[index].style.backgroundColor === decidedColor && !isBlank
        )
      ) {
        score += 3;
        scoreDisplay.innerHTML = score;
        rowOfThree.forEach(index => {
          squares[index].style.backgroundColor = '';
        });
      }
    }
  }

  function checkColumnForThree() {
    for (let i = 0; i < 47; i++) {
      let columnOfThree = [i, i + width, i + width * 2];
      let decidedColor = squares[i].style.backgroundColor;
      const isBlank = decidedColor === '';

      if (
        columnOfThree.every(
          index => squares[index].style.backgroundColor === decidedColor && !isBlank
        )
      ) {
        score += 3;
        scoreDisplay.innerHTML = score;
        columnOfThree.forEach(index => {
          squares[index].style.backgroundColor = '';
        });
      }
    }
  }

  function moveDown() {
    for (let i = 0; i < 55; i++) {
      if (squares[i + width].style.backgroundColor === '') {
        squares[i + width].style.backgroundColor = squares[i].style.backgroundColor;
        squares[i].style.backgroundColor = '';
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
        const isFirstRow = firstRow.includes(i);
        if (isFirstRow && squares[i].style.backgroundColor === '') {
          let randomColor =
            candyColors[Math.floor(Math.random() * candyColors.length)];
          squares[i].style.backgroundColor = randomColor;
        }
      }
    }
  }

  window.setInterval(() => {
    moveDown();
    checkRowForThree();
    checkColumnForThree();
  }, 100);
});
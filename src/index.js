import React from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import "./index.css";

// Check it https://konstantinlebedev.com/framer-motion-intro/

function Square(props) {
  if (props.value === "player1") {
    return (
      <motion.button
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 0.6 }}
        className={`square christmas-tree`}
        onClick={props.onClick}
      ></motion.button>
    );
  } else if (props.value === "player2") {
    return (
      <motion.button
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 0.4 }}
        className={`square oak-tree`}
        onClick={props.onClick}
      ></motion.button>
    );
  } else {
    return <button className="square" onClick={props.onClick}></button>;
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null)
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice(); // Make a copy of the squares array
    if (checkWinner(squares) || checkDraw(squares)) {
      this.setState({
        squares: Array(9).fill(null)
      });
      return;
    }
    if (squares[i]) {
      return;
    }
    squares[i] = getCurrentPlayer(squares);
    this.setState({
      squares: squares
    });
  }
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const gameStatus = getGameStatus(this.state.squares);
    const gameOver = checkWinner(this.state.squares);

    return (
      <div>
        <div className="board-status">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.26 }}
            className="player1 status"
          ></motion.div>
          <div>
            <h3 className="gameStatusHeader">LET'S PLAY</h3>
            <h3 className="gameStatus">{gameStatus}</h3>
            <h3 className="gameMessage">
              {gameOver ? "Click any tile to play again" : null}
            </h3>
          </div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.4 }}
            className="player2 status"
          ></motion.div>
        </div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <h1 className="title">Tic Tac Toe</h1>
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

// ====== Helper functions

function checkWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function checkDraw(squares) {
  const countEmpty = squares.reduce((a, b) => {
    return a + (b === null ? 1 : 0);
  }, 0);
  return countEmpty < 1 ? true : false;
}

function getGameStatus(squares) {
  const countP1 = squares.reduce((a, b) => {
    return a + (b === "player1" ? 1 : 0);
  }, 0);
  const countP2 = squares.reduce((a, b) => {
    return a + (b === "player2" ? 1 : 0);
  }, 0);
  const countEmpty = squares.reduce((a, b) => {
    return a + (b === null ? 1 : 0);
  }, 0);
  if (checkWinner(squares)) {
    const winner = checkWinner(squares);
    return winner === "player1" ? "Player 1 wins" : "Player 2 wins";
  }
  if (checkDraw(squares)) {
    return "Snap, it's a draw";
  }
  if (countEmpty === 9) return "Player 1 goes first";
  if (countP1 > countP2) return "Player 2, your turn";
  return "Player 1, your turn";
}

function getCurrentPlayer(squares) {
  const countP1 = squares.reduce((a, b) => {
    return a + (b === "player1" ? 1 : 0);
  }, 0);
  const countP2 = squares.reduce((a, b) => {
    return a + (b === "player2" ? 1 : 0);
  }, 0);
  if (countP1 > countP2) {
    return "player2";
  } else {
    return "player1";
  }
}

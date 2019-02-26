import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Square extends React.Component {
  render() {
    return (
      <button className="square">
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }

  render() {
    const status = 'Next player: X';
    const list = [[],[],[]];

    for(let i=0; i<3; i++){
      for(let j=3*i; j<3*i + 3; j++){
        list[i].push(this.renderSquare(j));
      }
    }

    return (
      <div>
        <div className="status">{status}</div>
          <div className="board-row">
            {list[0]}
          </div>
          <div className="board-row">
            {list[1]}
          </div>
          <div className="board-row">
            {list[2]}
          </div>
        </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

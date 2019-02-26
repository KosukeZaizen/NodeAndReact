import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={() =>
        alert('click')
      }>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }

  renderRow(i) {
    const list = [[],[],[]];

    for(let i=0; i<9; i+=3){
      for(let j=i; j<i+3; j++){
        list[i/3].push(this.renderSquare(j));
      }
    }

    return(
      <div className="board-row">
        {list[i]}
      </div>
    )
  }

  render() {
    const status = 'Next player: X';
    const rows = [];
    for(let i=0; i<3; i++){
      rows.push(this.renderRow(i));
    }

    return (
      <div>
        <div className="status">{status}</div>
        {rows}
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

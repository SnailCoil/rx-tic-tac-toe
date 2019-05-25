import React from "react";
import { Square } from "./square";
import { BoardState } from "./game";

interface Params {
  board: BoardState;
  recordMove: (squareIndex: number) => void;
}

export class Board extends React.Component<Params> {
  renderSquare(i: number) {
    return (
      <Square
        value={this.props.board.squares[i]}
        squarePicked={() => this.props.recordMove(i)}
      />
    );
  }

  render() {
    return (
      <div className="game-board">
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
import React from "react";
import { Board } from "./board";
import { calculateWinner } from ".";
import { GameStatus } from "./game-status";

export interface BoardState {
  squares: Array<string|undefined>;
}

interface State {
  history: Array<BoardState>;
  viewingIndex: number;
}

export class Game extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(undefined),
      }],
      viewingIndex: 0,
    }
  }

  jumpTo(i: number) {
    this.setState({
      viewingIndex: i,
    })
  }

  tryRecordMove(i: number) {
    this.setState((state) => {
      const history = state.history.slice(0, state.viewingIndex + 1);
      let current = history[state.viewingIndex];
      if (calculateWinner(current.squares) || current.squares[i]) {
        return;
      }
      let newSquares = [...current.squares];
      newSquares[i] = state.viewingIndex % 2 === 0 ? "X" : "O";
      return {
        history: [
          ...history,
          { squares: newSquares }
        ],
        viewingIndex: state.viewingIndex + 1,
      };
    })
  }

  render() {
    let historicalState = this.state.history[this.state.viewingIndex];
    return (
      <div className="game">
        <Board
          board={historicalState}
          recordMove={(i) => this.tryRecordMove(i)}
        />
        <GameStatus
          history={this.state.history}
          viewingIndex={this.state.viewingIndex}
          jump={(i) => this.jumpTo(i)}
        />
      </div>
    );
  }
}

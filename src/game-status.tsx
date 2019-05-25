import React from "react";
import { BoardState } from "./game";
import { calculateWinner } from ".";

interface Props {
  history: Array<BoardState>;
  viewingIndex: number;
  jump: (index: number) => void;
}

export class GameStatus extends React.Component<Props> {
  render() {
    let historicalState = this.props.history[this.props.viewingIndex];
    let status: string;
    let winner = calculateWinner(historicalState.squares);
    console.log(winner);
    if (winner) {
      status = `Winner: ${winner}`;
    } else if (this.props.viewingIndex === 9) {
      status = "Tied game"
    } else {
      status = "Next player";
      if (this.props.viewingIndex !== this.props.history.length - 1) {
        status += " (was)";
      }
      status += `: ${this.props.viewingIndex % 2 === 0 ? "X" : "O"}`;
    }
    return (
      <div className="game-info">
        <div>{status}</div>
        <ol>{this.getTimeTravelList()}</ol>
      </div>
    )
  }

  private getTimeTravelList(): React.ReactNode|undefined {
    return this.props.history.map((state: BoardState, index: number) => {
      let description: string;
      if (index === 0) {
        description = "game start";
      } else {
        description = `move ${index}`;
      }
      let moveElement;
      if (index === this.props.viewingIndex) {
        moveElement = (
          <span>Viewing {description}</span>
        );
      } else {
        moveElement = (
          <button onClick={() => this.props.jump(index)}>
            Go back to {description}
          </button>
        );
      }
      return (
        <li key={index}>
          {moveElement}
        </li>
      );
    });
  }
}
import React from "react";

interface Props {
  value?: string;
  squarePicked: () => void;
}

export function Square(props: Props) {
  return (
    <button className="square" onClick={() => props.squarePicked()}>
      {props.value}
    </button>
  );
}
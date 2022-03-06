import React, { FunctionComponent, useState, useRef, ChangeEvent } from "react";

interface IProps {
  index: number
  guessIndex : number,
  letter: string
}

// markup
const Letter : FunctionComponent<IProps> = ({
  index,
  guessIndex,
  letter
}) => {

  let id : string = "letter-container-" + guessIndex + "-" + index;

  return (
    <div id={id} className="letter-container">
        <span>{letter}</span>
    </div>
  )
}

export default Letter
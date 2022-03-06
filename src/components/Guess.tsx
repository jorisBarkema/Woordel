import React, { FunctionComponent, useState, useRef, ChangeEvent } from "react";

import Letter from "./Letter"

interface IProps {
  index : number
  letters: string
}

// markup
const Guess : FunctionComponent<IProps> = ({
  index,
  letters
}) => {
  let id : string = "guess-container-" + index;
  return (
    <div id={id} className="guess-container">
        <Letter index={0} guessIndex={index} letter={letters[0]} />
        <Letter index={1} guessIndex={index} letter={letters[1]} />
        <Letter index={2} guessIndex={index} letter={letters[2]} />
        <Letter index={3} guessIndex={index} letter={letters[3]} />
        <Letter index={4} guessIndex={index} letter={letters[4]} />
    </div>
  )
}

export default Guess
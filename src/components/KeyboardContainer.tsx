import React, { FunctionComponent, useState, useRef, ChangeEvent } from "react";
import Keyboard from "react-simple-keyboard";
import KeyboardWrapper from "./KeyboardWrapper";

interface IProps {
    onKeyPress: (input: string) => void;
    // @ts-ignore Ignore Keyboard used as type error
    keyboardContainerRef: MutableRefObject<KeyboardContainer>;
}

const KeyboardContainer: FunctionComponent<IProps> = ({
    onKeyPress,
    keyboardContainerRef
  }) => {
  // @ts-ignore Ignore Keyboard used as type error
  const keyboard = useRef<Keyboard>(null);

  return (
    <div id="keyboard-container">
      <KeyboardWrapper keyboardRef={keyboard} onKeyPress={onKeyPress} />
    </div>
  );
};

export default KeyboardContainer;

import React, { FunctionComponent, useState, MutableRefObject } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

interface IProps {
    onKeyPress: (input: string) => void;
  // @ts-ignore Ignore Keyboard used as type error
  keyboardRef: MutableRefObject<Keyboard>;
}

const KeyboardWrapper: FunctionComponent<IProps> = ({
  onKeyPress,
  keyboardRef
}) => {
  return (
    <Keyboard
      keyboardRef={r => (keyboardRef.current = r)}
      layoutName={"default"}
      onKeyPress={onKeyPress}
      onRender={() => console.log("Rendered keyboard")}
      layout= {{
            default: [
            "q w e r t y u i o p",
            "a s d f g h j k l",
            "{backspace} z x c v b n m {enter}"
            ]
        }}
        display= {{
            "{numbers}": "123",
            "{enter}": "enter",
            "{backspace}": "⌫",
            "{abc}": "ABC"
        }}
    />
  );
};

export default KeyboardWrapper;

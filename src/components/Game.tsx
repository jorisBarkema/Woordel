import React, { FunctionComponent, useState, useRef, useEffect, useCallback, ChangeEvent } from "react";

import Guess from "./Guess"
import Modal from "./Modal"
import KeyboardContainer from "../components/KeyboardContainer"

const options = require("../data/options.json");
const words = require("../data/words.json");

const green = "rgb(22, 156, 57)";
const yellow = "rgb(255, 186, 100)";

function showWarning(currentGuess : number, message : string) : void {
  let guessElement : HTMLElement | null = document.getElementById("guess-container-" + currentGuess);
  let warningElement : HTMLElement | null = document.getElementById("warning-container");

  if (guessElement !== null && warningElement !== null) {
    guessElement.style.animation="shake 600ms linear";
    warningElement.style.opacity="1";
    warningElement.innerHTML = message;

    setTimeout(() => {
      if (guessElement !== null) { 
        guessElement.style.animation = "";
      }
    }, 600);

    setTimeout(() => {
      if (warningElement !== null) { 
        warningElement.style.opacity="0";
      }
    }, 1800);
  }
}

//https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript/47593316#47593316
function mulberry32(a : number) : number {
  var t = a += 0x6D2B79F5;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  return ((t ^ t >>> 14) >>> 0) / 4294967296;
}

const Game : FunctionComponent = () => {

  var today = new Date();
  var d : number = today.getDate();
  var m : number = today.getMonth() + 1; //January is 0!
  var y : number = today.getFullYear();

  // Get a random seed based on the date
  let seed = mulberry32(d * m * y);
  const answer = (d === 6 && m === 3 && y === 2022)
    ? "PUPPY"
    : options[Math.floor(seed * options.length)];
  
  const [currentGuess, setCurrentGuess] = useState(0);
  const [guesses, setGuesses] = useState(["", "", "", "", "", ""]);
  // @ts-ignore Ignore Keyboard used as type error
  const keyboardContainer = useRef<KeyboardContainer>(null);

  const handleUserKeyPress = (event: { key: any; keyCode: any; }) => {
    const { key, keyCode } = event;

    if(keyCode >= 65 && keyCode <= 90){
        onKeyPress(key);
    } else if(keyCode === 13){
      onKeyPress("{enter}");
    } else if(keyCode === 8){
      onKeyPress("{backspace}");
    }
  };

  useEffect(() => {
      window.addEventListener("keydown", handleUserKeyPress);
      return () => {
          window.removeEventListener("keydown", handleUserKeyPress);
      };
  }, [handleUserKeyPress]);

  let onKeyPress = async (s : string) => {
    if (s === "{backspace}") {
      if (guesses[currentGuess].length <= 0) {
        return;
      }
      guesses[currentGuess] = guesses[currentGuess].slice(0, -1);
      setGuesses([...guesses]);
    } else if (s === "{enter}") {
      if (guesses[currentGuess].length >= 5) {
        let remaining_letters : string = answer;
        for(let i : number = 0; i < 5; i++) {
          if (guesses[currentGuess][i] === answer[i]) {
            remaining_letters = remaining_letters.replace(new RegExp(guesses[currentGuess][i], "i"), "");
          }
        }
        if (words.includes(guesses[currentGuess])) {
          for(let i : number = 0; i < 5; i++) {

            let letterElement : HTMLElement | null = document.getElementById("letter-container-" + currentGuess + "-" + i);
            let letterKey : HTMLElement | null = document.querySelector(`[data-skbtn="`  + guesses[currentGuess][i] + `"]`);

            if (guesses[currentGuess][i] === answer[i]) {            
              if (letterElement !== null) {
                letterElement.style.animation="pulse 300ms linear";
                letterElement.style.backgroundColor = green;
                letterElement.style.color = "white";
              }

              if (letterKey !== null) {
                letterKey.style.backgroundColor = green;
                letterKey.style.color = "white";
              }
            } 
            else if (remaining_letters.includes(guesses[currentGuess][i])) {
              remaining_letters = remaining_letters.replace(new RegExp(guesses[currentGuess][i], "i"), "");
              if (letterElement !== null) {
                letterElement.style.animation="pulse 300ms linear";
                letterElement.style.backgroundColor = yellow;
                letterElement.style.color = "white";
              }

              if (letterKey !== null && letterKey.style.backgroundColor !== green) {
                letterKey.style.backgroundColor = yellow;
                letterKey.style.color = "white";
              }
            }
            else {
              if (letterElement !== null) {
                letterElement.style.animation="pulse 300ms linear";
                letterElement.style.backgroundColor = "rgb(160, 160, 160)";
                letterElement.style.color = "white";
              }

              if (letterKey !== null && letterKey.style.backgroundColor !== green && letterKey.style.backgroundColor !== yellow) {
                letterKey.style.backgroundColor = "rgb(160, 160, 160)";
                letterKey.style.color = "white";
              }
            }

            await new Promise(r => setTimeout(r, 300));
          }

          if (answer === guesses[currentGuess]) {

            let wonModal : HTMLElement | null = document.getElementById("won-modal");
            
            if (wonModal !== null) {
              wonModal.style.opacity = "1";
              wonModal.style.zIndex = "5";
            }
          }
          else if (currentGuess < 5) {
            setCurrentGuess(currentGuess + 1);
          } else {
            let lostModal : HTMLElement | null = document.getElementById("lost-modal");
            
            if (lostModal !== null) {
              lostModal.style.opacity = "1";
              lostModal.style.zIndex = "5";
            }
          }
        } else {
          showWarning(currentGuess, guesses[currentGuess] + " is geen woord.");
        }
      } else if (guesses[currentGuess].length < 5) {
        showWarning(currentGuess, "Niet genoeg letters.");
      }
    } else {
      if (guesses[currentGuess].length >= 5) {
        return;
      }
      guesses[currentGuess] += s;
      setGuesses([...guesses]);
    }
  }

  return (
    <div id="content">
      <Modal name="won" title="Gefeliciteerd!">
        {
          currentGuess === 0 
          ? <p>Je hebt het woord geraden in {currentGuess + 1} poging</p>
          : <p>Je hebt het woord geraden in {currentGuess + 1} pogingen</p>
        }
      </Modal>
      <Modal name="lost" title="Helaas...">
        <p>Het woord was {answer}</p>
      </Modal>
      <div id="game-container">
          <Guess index={0} letters={guesses[0]} />
          <Guess index={1} letters={guesses[1]} />
          <Guess index={2} letters={guesses[2]} />
          <Guess index={3} letters={guesses[3]} />
          <Guess index={4} letters={guesses[4]} />
          <Guess index={5} letters={guesses[5]} />
          <div id="warning-container">
            Test waarschuwing
          </div>
      </div>
      <KeyboardContainer keyboardContainerRef={keyboardContainer} onKeyPress={onKeyPress} />
    </div>
  )
}

export default Game
import { useState, useEffect, createContext } from "react";
import { flushSync } from "react-dom";
import "./../styles/question.css";
import { Button } from "react-bootstrap";

let ResultScore = createContext();

function Question({
  handleCallBack,
  question,
  totalQuestions,
  currentQuestion,
  setAnswer,
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [result, setResult] = useState(null);
  const [finalScore, setFinalScore] = useState(0);

  function gotoNextQuestion() {
    flushSync(() => {
      setAnswer(selectedOption);
    });
    setSelectedOption(null);
    resetProgressBar();
  }

  const resetProgressBar = () => {};

  const clickedOnSelectedOption = (index) => {
    setSelectedOption(index);
    gotoNextQuestion();
    resetProgressBar();
    console.log("Question Number: ");
    console.log(currentQuestion);
    if ((index + 1).toString() === question.correctOptionIndex) {
      console.log("Correct Answeer");
      setResult(true);
      setFinalScore(finalScore + 1);
      ResultScore = true;
    } else {
      console.log("Incorrect Answer");
      setResult(false);
      ResultScore = false;
    }
    if (currentQuestion === 10) {
      console.log("Your final score is: ");
      if (ResultScore) {
        console.log(finalScore + 1);
        handleCallBack(finalScore + 1);
      } else {
        console.log(finalScore);
        handleCallBack(finalScore);
      }
    }
  };

  useEffect(() => {}, [selectedOption]);

  return (
    <div className="question">
      <div className="question-count">
        <span> Question: </span>
        <b>{currentQuestion}</b> of <b>{totalQuestions}</b>
      </div>

      <div className="main">
        <div className="title">
          <span>
            <b>Select the correct one: </b>
          </span>
          <p>{question.title}</p>
        </div>
        <div className="options">
          {question.options.map((option, index) => {
            return (
              <div
                className={index === selectedOption ? "active" : "option"}
                key={index}
                onClick={() => clickedOnSelectedOption(index)}
              >
                {option}
              </div>
            );
          })}
        </div>
      </div>
      <div className="control">
        <Button variant="outline-danger" onClick={gotoNextQuestion}>
          Skip
        </Button>
      </div>
    </div>
  );
}

export default Question;
export { ResultScore };

import { useState } from "react";
import QuestionList from "../data/questions.json";
import TestResult from "./TestResult.js";
import main from "./../main.jpg";
import Question from "./Question.js";

function TestScreen({ state }) {
  console.log("TEST SCREEN");
  // console.log(state);
  const [once, setOnce] = useState(state);
  console.log(once);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [markedAnswers, setMarkedAnswers] = useState(
    new Array(QuestionList.length)
  );
  const isQuestionEnd = currentQuestionIndex === QuestionList.length;

  function calculateResult() {
    let correct = 0;
    QuestionList.forEach((question, index) => {
      if (question.correctOptionIndex === markedAnswers[index]) {
        correct++;
      }
    });

    return {
      total: QuestionList.length,
      correct: correct + 1,
      percentage: Math.trunc((correct / QuestionList.length) * 100),
    };
  }

  const callBack = (result) => {
    setScore(result);
    let correct = 0;
    console.log("IN CALL BACKKK");
    console.log(QuestionList);
    console.log(markedAnswers);
    QuestionList.forEach((question, index) => {
      console.log(question);
      console.log(index);
      if (question.correctOptionIndex === markedAnswers[index]) {
        correct++;
      }
    });
    setFinalScore(correct);
  };

  return (
    <div
      className="test-screen"
      // style={{ backgroundColor: "", backgroundImage: `${main}` }}
      style={{
        backgroundColor: "white",
        width: "50%",
        // marginRight: "63px",
        // marginLeft: "-63px",
      }}
    >
      {isQuestionEnd ? (
        <TestResult
          marks={score}
          result={calculateResult()}
          state={state}
          score={finalScore}
        />
      ) : (
        <Question
          handleCallBack={callBack}
          question={QuestionList[currentQuestionIndex]}
          totalQuestions={QuestionList.length}
          currentQuestion={currentQuestionIndex + 1}
          setAnswer={(index) => {
            setMarkedAnswers((arr) => {
              let newArray = [...arr];
              newArray[currentQuestionIndex] = index;
              return newArray;
            });
            setCurrentQuestionIndex(currentQuestionIndex + 1);
          }}
        />
      )}
    </div>
  );
}

export default TestScreen;

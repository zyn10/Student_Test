import { useState } from "react";
import QuestionList from "../data/questions.json";
import TestResult from "./TestResult.js";
import Question from "./Question.js";

function TestScreen({ retry }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
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
      correct: correct,
      percentage: Math.trunc((correct / QuestionList.length) * 100),
    };
  }

  return (
    <div className="test-screen">
      {isQuestionEnd ? (
        <TestResult result={calculateResult()} retry={retry} />
      ) : (
        <Question
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

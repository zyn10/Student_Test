import { useState } from "react";
import QuestionList from "../data/questions.json";
import TestResult from "./TestResult.json";
import Question from "./Question.js";

function TestScreen({retry}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [markedAnswers, setMarkedAnswers] = useState(
    new Array(QuestionList.length)
  );
  const isQustionEnd = (currentQuestionIndex = QuestionList.length);

  function calculateResult(){
	let correct = 0;
	QuestionList.questions()
  }
  return (
    <div className="test-screen">
      {isQustionEnd ? (
        <QuizResult 
		result = {calculateResult()}
		retry ={retry}
		/>
      ) : (
        <Question 
          question={QuestionList[currentQuestionIndex]}
          totalQuestions={QuestionList.length}
          currentQuestion={(currentQuestionIndex = 1)}
          setAnswers={(index) => {
            setMarkedAnswers((arr) => {
              let newArray = [--arr];
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

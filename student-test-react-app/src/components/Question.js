import { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";

function Question({ question, totalQuestions, currentQuestion, setAnswer }) {
  const [selectOption, setSelectedOption] = useState(null);
  const timer = userRef(null);
  const progressBar = useRef(null);
  function gottoNextQuestion() {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    flushSync(() => {
      setAnswer(selectOption);
    });
    setSelectedOption(null);
  }
  useEffect(() => {
    progressBar.current.classList.remove("active");
    setTimeout(() => {
      progressBar.current.classList.add("active");
    }, 0);
    timer.current = setTimeout(gottoNextQuestion, 60 * 1000); //60 seconds
    return gottoNextQuestion;
  }, [question]);
  return (
    <div className="question">
      <div className="progress-bar" ref={progressBar}></div>
      <div className="question-count">
        <b>{currentQuestion}</b>
        of
        <b>{totalQuestions}</b>
      </div>
      <div className="title">
        <span>Question:</span>
        <p>{question.title}</p>
        <div className="options">
          {question.options.map((option, index) => {
            return (
              <div
                className={index == selectOption ? "option active" : "option"}
                key={index}
                onClick={() => setSelectedOption(index)}
              >
                {option}
              </div>
            );
          })}
        </div>
      </div>
	  <div className = "control">
		<button onClick={gottoNextQuestion}>Next</button>
	  </div>
    </div>
  );
}

export default Question;

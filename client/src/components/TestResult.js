import { useState } from "react";
import { Button } from "react-bootstrap";

function TestResult({ marks, result, state, score }) {
  const [disable, setDisable] = useState(false);
  const percentage = (marks * 100) / result.total;

  async function finishTheTest(event) {
    event.preventDefault();
    console.log("THE SCORE I GOT!!!!");
    console.log(score);
    console.log("IN RESULT");
    console.log("MARKS");
    console.log(marks);
    console.log("RESULTS");
    console.log(result);
    // console.log(state);
    const { contract } = state;
    const transaction = await contract.finishTest(percentage);
    await transaction.wait();
    console.log("Transaction is done!");
    setDisable(true);
  }
  const handleRetryClick = () => {
    window.location.reload();
  };

  return (
    <div className="start-screen">
      <div className="result-screen">
        <h2> Result: {percentage}%</h2>
        <h4> Total Score: {result.total * 10}</h4>
        <h4> Obtained Score: {marks * 10}</h4>
        <p>
          {" "}
          Selected <b>{marks}</b> correct options out of <b>{result.total}</b>{" "}
          questions
        </p>
        <Button
          variant="outline-danger"
          onClick={handleRetryClick}
          disabled={!state.contract}
        >
          Retry{" "}
        </Button>
        <br></br>
        {marks > 8 ? (
          <Button
            variant="outline-success"
            onClick={finishTheTest}
            disabled={disable}
          >
            Claim Reward{" "}
          </Button>
        ) : (
          <p>Thank you for participating</p>
        )}
      </div>
    </div>
  );
}
export default TestResult;

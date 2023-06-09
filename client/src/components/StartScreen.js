import { Button } from "react-bootstrap";
import { ethers } from "ethers";
import { useState } from "react";
import Navbar from "./Navbar.js";
import TestScreen from "./TestScreen";
import Form from "react-bootstrap/Form";
import main from "./../main.jpg";

function StartScreen({ state }) {
  const [test, setTest] = useState(false);

  // console.log("START SCREEN");
  // console.log(state);
  const buyTest = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const name = document.querySelector("#name").value;
    console.log(name, contract);
    const amount = { value: ethers.utils.parseEther("0.01") };
    const transaction = await contract.startTest(name, amount);
    await transaction.wait();
    console.log("Transaction is done!");
    setTest(true);
  };
  return (
    <div>
      <Navbar />
      {test ? (
        <div className="join-screen">
          <TestScreen state={state} />
        </div>
      ) : (
        <div
          className="start-screen"
          style={{ backgroundColor: "", backgroundImage: `${main}` }}
        >
          <p>Hello! Welcome to Student Test Decentralized Application</p>
          <div>
            <b>Entry Fee: 0.3 Ethers</b>
          </div>
          <div>
            <b>
              Scholarship: If you get more than 80% marks then you will get 50%
              refund
            </b>
          </div>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                id="name"
                required
              />
            </Form.Group>
          </Form>

          <Button
            type="submit"
            variant="outline-success"
            onClick={buyTest}
            disabled={!state.contract}
          >
            Pay and Start
          </Button>
        </div>
      )}
    </div>
  );
}
export default StartScreen;

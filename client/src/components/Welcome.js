import React, { useState } from "react";
import "../Welcome.css";
import icon from "../../src/icon.png";
import { ethers } from "ethers";
import Navbar from "./Navbar";
import TestScreen from "./TestScreen";

const WelcomeScreen = ({ state }) => {
  const [test, setTest] = useState(false);
  const [username, setUsername] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

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

  const handleUsernameChange = (event) => {
    const inputValue = event.target.value;
    setUsername(inputValue);
    setIsButtonDisabled(inputValue.trim() === "");
  };

  return (
    <div>
      {test ? (
        <div>
          <Navbar />
          <div className="join-screen">
            <TestScreen state={state} />
          </div>
        </div>
      ) : (
        <div>
          <div className="welcome-screen">
            <div className="left-section">
              <div className="icon-container">
                <img src={icon} alt="Icon" />
                <p className="text">Student Test</p>
              </div>
            </div>

            <div className="right-section">
              <h1 className="heading">
                <span className="acceleration">Accelerate Your</span>
                <br></br>
                <span>Blockchain Mastery!</span>
              </h1>
              <label htmlFor="username">Enter your name:</label>
              <input
                type="text"
                id="name"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Your name"
              />
              <button
                className={`start-test-button ${
                  !state.contract ? "disabled" : ""
                }`}
                onClick={buyTest}
                disabled={!state.contract}
              >
                Pay to Start
              </button>
              <br></br>
              <div>
                <b>Entry Fee: 10M Gwei (0.01 Ethers)</b>
              </div>
              <br></br>

              <h6>
                Note: If you get more than 80% marks then you will get 50%
                refund
              </h6>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeScreen;

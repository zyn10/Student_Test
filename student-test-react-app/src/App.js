import React, { useState } from "react";
import Navbar from "./components/Navbar.js";
import TestScreen from "./components/TestScreen.js";
import JoinScreen from "./components/JoinScreen.js";

function App() {
  const [isTestStarted, setIsQuizStarted] = useState(false);
  return (
    <>
      <Navbar />
      <div className="test-container">
        {
		isTestStarted ? (
          <TestScreen retry={() => setIsQuizStarted(false)} />
        ) : (
          <JoinScreen start={() => setIsQuizStarted(true)} />
        )}
      </div>
    </>
  );
}
export default App;

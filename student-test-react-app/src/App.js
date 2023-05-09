import { userState } from "react";
import Navbar from "./components/Navbar.js";
import TestScreen from "./components/QuizScreen.js";
import JoinScreen from "./components/JoinScreen.js";

function App() {
  const [isTestStarted, setIsQuizStarted] = useState(false);
  return (
    <>
      <Navbar />
      <div className="test-container">
        {isTestStarted ? (
          <QuizScreen retry={() => setIsQuizStarted(false)} />
        ) : (
          <joinScreen start={() => setIsQuizStarted(true)} />
        )}
      </div>
    </>
  );
}
export default App;

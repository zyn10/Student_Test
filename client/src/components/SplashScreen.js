import { useState } from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import "../SplashScreen.css";

const SplashScreen = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="splash-screen">
      <div className="loader-container">
        <ClimbingBoxLoader
          color={"#ffff"}
          loading={loading}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
};

export default SplashScreen;

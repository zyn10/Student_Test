import React, { useEffect, useState } from "react";
import TestScreen from "./components/TestScreen.js";
import StartScreen from "./components/StartScreen.js";
import abi from "./contract/StudentTest.json";
import { Button } from "react-bootstrap";
import { ethers } from "ethers";
import SplashScreen from "./components/SplashScreen.js";
import WelcomeScreen from "./components/Welcome.js";

function App() {
  const [account, setAccount] = useState("No Account");
  const [showSplash, setShowSplash] = useState(true);
  // const [mask, setMask] = useState(false);
  console.log("Called");
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  // const handleClick = () => {
  //   if (mask === true) {
  //     setIsQuizStarted(true);
  //   } else {
  //     console.log("Please log in meta mask!");
  //   }
  // };
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const connectWallet = async () => {
    const contractAddress = "0xC1a571B4C3065453dac8A56880A734033259C931";
    const contractABI = abi.abi;
    try {
      const { ethereum } = window;
      if (ethereum) {
        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });

        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        // setMask(true);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        setState({ provider, signer, contract });
        setAccount(account);
      } else {
        alert("Please install Metamask!");
      }
    } catch (err) {
      console.log(err);
      // setMask(false);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);
  // console.log(state);
  return (
    <>
      {/* <p>Connected Account - {account}</p> */}
      {/* {showSplash ? <SplashScreen /> : <StartScreen state={state} />} */}
      {showSplash ? <SplashScreen /> : <WelcomeScreen state={state} />}

      {/* <div className="test-container">
        <StartScreen state={state} />
      </div> */}
    </>
  );
}
export default App;

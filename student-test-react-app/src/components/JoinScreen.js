function JoinScreen() {
  const [walletAddress, setWalletAddress] = useState("");
  const [isWalletAddressValid, setIsWalletAddressValid] = useState(false);

  const handleWalletAddressChange = (event) => {
    const value = event.target.value;
    setWalletAddress(value);

    // Validate the wallet address format here
    const walletAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    setIsWalletAddressValid(walletAddressRegex.test(value));
  };

  const handleStartQuizClick = () => {
    if (!isWalletAddressValid) {
      alert("Please enter a valid wallet address to start the quiz.");
    } else {
      // Start the quiz
    }
  };
  return (
    <div className="test-screen">
      <label>
        Crypto Wallet Address:
        <input
          type="text"
          value={walletAddress}
          onChange={handleWalletAddressChange}
        />
      </label>
      <p>Hello! Welcome to D-Test System</p>
      <button onClick={handleStartQuizClick} disabled={!isWalletAddressValid}>
        Start
      </button>
    </div>
  );
}
export default JoinScreen;

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function getBalances(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}
async function consoleBalances(addresses) {
  let counter = 0;
  for (const address of addresses) {
    console.log(`Address of ${counter} balance: `, await getBalances(address));
    counter++;
  }
}
async function consoleParticipants(participants) {
  for (const participant of participants) {
    const timestamp = participant.timestamp;
    const name = participant.name;
    const percentage = participant.percentage;
    const amountInvested = participant.amountInvested;
    const amountReturned = participant.amountReturned;
    const participantAddress = participant.participantAddress;
    console.log(
      `At ${timestamp}, name: ${name}, percentage: ${percentage}, amountInvested: ${amountInvested}, amountReturned: ${amountReturned}, participantAddress: ${participantAddress}`
    );
  }
}

async function main() {
  const [owner, accountOne, accountTwo, accountThree] =
    await hre.ethers.getSigners();
  const StudentTest = await hre.ethers.getContractFactory("StudentTest");
  const contract = await StudentTest.deploy(); //instance of contract

  await contract.deployed();
  //deployed on local blockchain of hardhat
  console.log("Address of Contract", contract.address);

  const addresses = [
    owner.address,
    accountOne.address,
    accountTwo.address,
    accountThree.address,
  ];
  console.log("Before buying Test!");
  await consoleBalances(addresses);

  const amount = { value: hre.ethers.utils.parseEther("10") };
  await contract.connect(accountOne).startTest("AccountOne", amount);
  // await contract.connect(accountTwo).startTest("accountTwo", amount);
  // await contract.connect(accountThree).startTest("accountThree", amount);

  // await contract.connect(accountTwo).finishTest(80);
  // await contract.connect(accountThree).finishTest(90);

  console.log("After buying Test!");
  await consoleBalances(addresses);

  await contract.connect(accountOne).finishTest(90);

  console.log("After completing the Test");
  await consoleBalances(addresses);

  await contract.connect(accountOne).startTest("AccountOne", amount);
  await contract.connect(accountOne).finishTest(30);

  await contract.connect(accountOne).startTest("AccountOne", amount);
  await contract.connect(accountOne).finishTest(65);

  await contract.connect(accountOne).startTest("AccountOne", amount);
  await contract.connect(accountOne).finishTest(12);

  await contract.connect(accountOne).startTest("AccountOne", amount);
  await contract.connect(accountOne).finishTest(56);

  await contract.connect(accountOne).startTest("AccountOne", amount);
  await contract.connect(accountOne).finishTest(89);

  const participants = await contract.viewLeaderboard();
  consoleParticipants(participants);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

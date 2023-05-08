pragma solidity ^0.8.0;

contract StudentTest {
    struct Question {
        string question;
        string answer;
        bool answered;
    }
    
    Question[] public questions;
    mapping (address => uint) public scores;
    mapping (address => bool) public paid;
    uint public contractBalance;
    
    function addQuestion(string memory _question, string memory _answer) public {
        questions.push(Question(_question, _answer, false));
    }
    
    function getQuestion(uint _index) public view returns (string memory) {
        return questions[_index].question;
    }
    
    function answerQuestion(uint _index, string memory _answer) public {
        require(!questions[_index].answered, "Question has already been answered");
        if (keccak256(abi.encodePacked(_answer)) == keccak256(abi.encodePacked(questions[_index].answer))) {
            scores[msg.sender]++;
        }
        questions[_index].answered = true;
    }
    
    function getScore() public view returns (uint) {
        return scores[msg.sender];
    }
    
    function payToPlay() public payable {
        require(msg.value == 10 ether, "You must pay 10 ether to play");
        contractBalance += msg.value;
        paid[msg.sender] = true;
    }
    
    function getContractBalance() public view returns (uint) {
        return contractBalance;
    }
    
    function claimReward() public {
        require(paid[msg.sender], "You must pay to play before you can claim a reward");
        require(getScore() * 100 / questions.length >= 80, "You must score at least 80% to claim a reward");
        uint reward = (9 ether * getScore()) / questions.length;
        payable(msg.sender).transfer(reward);
        payable(0x1234567890123456789012345678901234567890).transfer(1 ether); // Send 1% to developer address
        paid[msg.sender] = false;
    }
}

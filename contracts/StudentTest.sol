//SPDX-License-Identifier: MIT

pragma solidity >=0.5.0 <0.9.0;

contract StudentTest {

    address payable owner;

    struct Participant{
        string name;
        uint timestamp;
        uint8 percentage;
        uint256 amountInvested;
        uint256 amountReturned;
        address participantAddress;
    }

    Participant[] participants;
    Participant currentParticipant;
    bool isStarted;

    constructor() {
        owner=payable(msg.sender);        
        isStarted=false;
    }

    function startTest(string memory name) public payable {
        require(msg.value>0,"Amount must be greater than 0 wei.");
        isStarted=true;
        currentParticipant.name=name;
        currentParticipant.timestamp=block.timestamp;
        currentParticipant.amountInvested=msg.value;   
        currentParticipant.participantAddress=msg.sender;     
    }

    function finishTest(uint8 percentage) public {
        require(isStarted,"You have not yet started the Test!");
        currentParticipant.percentage=percentage;
        if(percentage>80){
            currentParticipant.amountReturned=(currentParticipant.amountInvested * 50)/100;
        }
        else{
            currentParticipant.amountReturned=0;
        }
        payable(currentParticipant.participantAddress).transfer(currentParticipant.amountReturned);
        participants.push(currentParticipant);
        isStarted=false;
        sort();
    }

    function viewLeaderboard()public view returns(Participant[] memory){
        return participants;
    }

    function sort()private{
        //doing sorting
        for(uint8 i=0;i<participants.length;i++){
            for(uint8 j=0;j<participants.length-i-1;j++){
                if(participants[j].percentage<participants[j+1].percentage){
                    Participant memory temp=participants[j];
                    participants[j]=participants[j+1];
                    participants[j+1]=temp;                    
                }

            }
        }
    }
}

/*

Student purchase a test. He attend the test and if he secure more than 80% marks, then 50% of the
payment refunded

*/
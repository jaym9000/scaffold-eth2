// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

// // Useful for debugging. Remove when deploying to a live network.
// import "forge-std/console.sol";

// // Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// // import "@openzeppelin/contracts/access/Ownable.sol";

// /**
//  * A smart contract that allows changing a state variable of the contract and tracking the changes
//  * It also allows the owner to withdraw the Ether in the contract
//  * @author BuidlGuidl
//  */
// contract YourContract {
//     // State Variables
//     address public immutable owner;
//     string public greeting = "Building Unstoppable Apps!!!";
//     bool public premium = false;
//     uint256 public totalCounter = 0;
//     mapping(address => uint256) public userGreetingCounter;

//     // Events: a way to emit log statements from smart contract that can be listened to by external parties
//     event GreetingChange(address indexed greetingSetter, string newGreeting, bool premium, uint256 value);

//     // Constructor: Called once on contract deployment
//     // Check packages/foundry/deploy/Deploy.s.sol
//     constructor(address _owner) {
//         owner = _owner;
//     }

//     // Modifier: used to define a set of rules that must be met before or after a function is executed
//     // Check the withdraw() function
//     modifier isOwner() {
//         // msg.sender: predefined variable that represents address of the account that called the current function
//         require(msg.sender == owner, "Not the Owner");
//         _;
//     }

//     /**
//      * Function that allows anyone to change the state variable "greeting" of the contract and increase the counters
//      *
//      * @param _newGreeting (string memory) - new greeting to save on the contract
//      */
//     function setGreeting(string memory _newGreeting) public payable {
//         // Print data to the anvil chain console. Remove when deploying to a live network.

//         console.logString("Setting new greeting");
//         console.logString(_newGreeting);

//         greeting = _newGreeting;
//         totalCounter += 1;
//         userGreetingCounter[msg.sender] += 1;

//         // msg.value: built-in global variable that represents the amount of ether sent with the transaction
//         if (msg.value > 0) {
//             premium = true;
//         } else {
//             premium = false;
//         }

//         // emit: keyword used to trigger an event
//         emit GreetingChange(msg.sender, _newGreeting, msg.value > 0, msg.value);
//     }

//     /**
//      * Function that allows the owner to withdraw all the Ether in the contract
//      * The function can only be called by the owner of the contract as defined by the isOwner modifier
//      */
//     function withdraw() public isOwner {
//         (bool success,) = owner.call{ value: address(this).balance }("");
//         require(success, "Failed to send Ether");
//     }

//     /**
//      * Function that allows the contract to receive ETH
//      */
//     receive() external payable { }
// }

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {ERC20Pausable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/// @custom:security-contact efixatlantic@gmail.com
contract YourContract is
    ERC20,
    ERC20Burnable,
    ERC20Pausable,
    Ownable,
    ERC20Permit
{
    uint256 public totalValueLocked;
    uint256 public activeInvestmentsCount;

    constructor(
        address initialOwner
    )
        ERC20("WorldCapital", "WCL")
        Ownable(initialOwner)
        ERC20Permit("WorldCapital")
    {}

    receive() external payable {
        totalValueLocked += msg.value;
        activeInvestmentsCount++;
    }

    function withdraw(uint256 amount) external onlyOwner {
        require(amount <= totalValueLocked, "Insufficient TVL");
        totalValueLocked -= amount;
        (bool success, ) = owner().call{value: amount}("");
        require(success, "Withdraw failed");
    }

    function getActiveInvestmentsCount() external view returns (uint256) {
        return activeInvestmentsCount;
    }

    // Existing ERC20 functions below...
    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // Required overrides
    function _update(
        address from,
        address to,
        uint256 value
    ) internal override(ERC20, ERC20Pausable) {
        super._update(from, to, value);
    }
}

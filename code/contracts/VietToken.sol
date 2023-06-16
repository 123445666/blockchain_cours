// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract 1000000 is ERC721, Ownable {
    uint256 public PRICE_IN_WEI = 0.1 ether;

    constructor() ERC721("VietToken", "B2O") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function mint(address to) public payable {
        require(msg.value >= PRICE_IN_WEI, "Not enough ether");
        _mint(to, 1 ether);
    }
}
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract VietContractNFT is ERC721 {
    // Contract code goes here
    constructor() ERC721('VietContractNFT', 'viet-nft') {
        for(uint i=1; i <= 5; i++) {
            _mint(msg.sender, i);
        }
    }

    function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(
      _exists(tokenId),
      "ERC721Metadata: URI query for nonexistent token"
    );
 
    string memory baseURI = _baseURI();
    return
      bytes(baseURI).length > 0
        ? string(abi.encodePacked(baseURI, Strings.toString(tokenId), ".json"))
        : "";
  }
 
  function _baseURI() override internal view virtual returns (string memory) {
    return "ipfs://QmR66GzQe351s8jvTLFtQ3rajB2kbm1Yih95FUpdbm4sqg/";
  }
}
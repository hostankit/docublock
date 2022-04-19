pragma solidity ^0.8.0;

contract Contract {
 string ipfsHash;
 
 struct IpfsHash {
	string hash;
 }

 IpfsHash[] public ipfsHashList;
 mapping(string => bool) Hashes;

 function sendHash(string memory x) public {
   ipfsHash = x;
 }

 function getHash() public view returns (string memory x) {
   return ipfsHash;
 }

 function addHash(string memory hash) public{
	require(!Hashes[hash]);

	IpfsHash memory hlist = IpfsHash({
	   hash: hash 
	   });
	Hashes[hash] = true;
	ipfsHashList.push(hlist);
 }

 function getOrderlistCount() public view returns(uint) {
     return ipfsHashList.length;
 }

}



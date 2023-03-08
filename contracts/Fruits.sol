// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract FruitsStorage {
    string[] fruits;

    function addFruit(string memory _fruit) public {
        fruits.push(_fruit);
    }

    function getAllFruits() public view returns(string[] memory) {
        return fruits;
    }

    function getFruitsLength() public view returns(uint) {
        return fruits.length;
    }

    function getFruit(uint _id) public view returns(string memory) {
        return fruits[_id];
    }
    
    function deleteFruit(uint _id) public {
        // revert(_id < fruits.length, "index out of bound");
       if (_id != fruits.length - 1) {
           fruits[_id] = fruits[fruits.length - 1];
       }
        fruits.pop();
    }
}
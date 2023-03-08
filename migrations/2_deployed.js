const FruitsStorage = artifacts.require("FruitsStorage");

module.exports = function (deployer) {
  deployer.deploy(FruitsStorage);
};

var ConvertLib = artifacts.require("./ConvertLib.sol");
var WHPToken = artifacts.require("./WHPToken.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, WHPToken);
  deployer.deploy(WHPToken);
};

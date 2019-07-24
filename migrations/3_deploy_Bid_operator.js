var Verifier = artifacts.require("Verifier");
var Operator = artifacts.require("Bid_operator");

var verifier = Verifier.deployed().then(verifier => verifier.address);
module.exports = function(deployer) {
  deployer.deploy(Operator, verifier)
};
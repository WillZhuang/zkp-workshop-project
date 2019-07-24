const Operator = artifacts.require("./operator");
const Verifier = artifacts.require("./Verifier");

contract('Operator', function(accounts){

    let verifierContract; //Instance of verifier contract deployed
    let operatorContract; //Instance of operator contract deployed

    //Addresses to save
    let operator =  accounts[0]; //Operator who deploys contract
    let supplierA = accounts[1];
    let supplierB = accounts[2];
    let supplierC = accounts[3];

    //Hard coded from proof.json

    let a = ["0x1ffb3d00943694356c315b591a61c2923c5b71ad6932d32b01bdba9e61590aee", "0x041253312e80794ccfcb9b66560dc3459b80f1d2a788a5d2a990ac88071a3c54"];
    let b =  [["0x267637a664c271cadc142f15e0f4b30b67472b4535250058288a0fc96e6e4926", "0x0e8ceb6632b5b422cf9dfd98701e08dac4febe8d30596dc64bae2d6d5c9aee34"], ["0x1f6c1889e14fedef69b86ff241813cfece039bc7985b3955bfefefa2c0d51e1a", "0x014413089fcc2cf4612e246ec4364788f21a587d54ff3b0520dd009cc4f8bc56"]];
    let c = ["0x1933e6ab42b040f5194805a418225230add06bf8a9f76486aca064899dc52f50", "0x2347ff6503d305f82bbf703af0243843dc74dcea366cbf4a482c5fd70a3f87db"];
    let input = ["0x20efac506a3d21dc3882103a7a727ad821f2422988783ee8b2f1762ecd0dbb03", "0x24da398ed1996eae6dafb3a687806e3a49c3add6949774d6017b30a66b2503ce", "0x20efac506a3d21dc3882103a7a727ad821f2422988783ee8b2f1762ecd0dbb03", "0x24da398ed1996eae6dafb3a687806e3a49c3add6949774d6017b30a66b2503ce", "0x20efac506a3d21dc3882103a7a727ad821f2422988783ee8b2f1762ecd0dbb03", "0x24da398ed1996eae6dafb3a687806e3a49c3add6949774d6017b30a66b2503ce", "0x0e486aae1862912e365f5b241e69312c4b7829a95e331f170d06f9cab57f6928", "0x11d3b0541d16a4571c60cd677bad8dd0c880e57a65c322a7b3f153bc1f347702", "0x2fa422b12d3f147df48ad42173db3f2ca22ff71fa941434925e10dff1219d5a1", "0x000000000000000000000000000000006bdcea1cffdac0358af7f5e82f074410", "0x000000000000000000000000000000003c2db71bf00ac5c846bf23743bc675ec"];

    /* Steps to take before each test run, deploy contract each time to start
    at same base case. */
    beforeEach(async function(){
        verifierContract = await Verifier.new({gas: 6000000});
        operatorContract = await Operator.new(verifierContract.address, {gas: 6000000});
    });

    describe("Valid signature", async function() {
        it("Should verify valid signatures.", async function(){
            let result = await operatorContract.verifyBidding(a, b, c, input);
            let arg = result.logs[0].args._result;
            assert.isTrue(arg, "Valid value did not set.");
        });
    });

})
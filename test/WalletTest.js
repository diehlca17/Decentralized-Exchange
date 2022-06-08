// const Dex = artifacts.require("Dex");
// const Link = artifacts.require("Link");

// const truffleAssert = require('truffle-assertions');

// contract(Dex, accounts => {
//     it("Should only allow owner to add new tokens", async () => {
//         let dex = await Dex.deployed();
//         let link = await Link.deployed();

//     await truffleAssert.passes(
//         dex.addToken(web3.utils.fromUtf8("Link"), link.address, {from: accounts[0]})
//     );

//     await truffleAssert.reverts(
//     dex.addToken(web3.utils.fromUtf8("Link"), link.address, {from: accounts[1]})
//     );

//     })

// /////////////////////////

//     it("Should handle deposits correctly", async () => {
//         let dex = await Dex.deployed();
//         let link = await Link.deployed();
//         await link.approve(dex.address, 500);
//         await dex.deposit(100, web3.utils.fromUtf8("Link"));
//         let balance = await dex.balances(accounts[0], web3.utils.fromUtf8("Link"));
//         assert.equal(balance, 100);
        
    
//     })

//     /////////////////////////

//     it("Should handle faulty withdrawals correctly", async () => {
//         let dex = await Dex.deployed();
//         let link = await Link.deployed();
        
//         await truffleAssert.reverts(
//             dex.withdraw(500, web3.utils.fromUtf8("Link"))
//         )
    
//     })

//     it("Should handle correct withdrawals correctly", async () => {
//         let dex = await Dex.deployed();
//         let link = await Link.deployed();
        
//         await truffleAssert.passes(
//             dex.withdraw(100, web3.utils.fromUtf8("Link"))
//         )
    
//     })
// })
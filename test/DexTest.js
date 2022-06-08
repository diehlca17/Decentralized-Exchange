const Dex = artifacts.require("Dex");
const Link = artifacts.require("Link");

const truffleAssert = require('truffle-assertions');

// The user must have enough ETH deposited in order for ETH deposited >= buy order value

contract(Dex, accounts => {
    it("ETH deposited should be greater than or equal to the buy order value", async () => {
        let dex = await Dex.deployed();
        let link = await Link.deployed();
        // await dex.addToken(web3.utils.fromUtf8("ETH"), dex.address, {from: accounts[0]});

        await truffleAssert.reverts(
            dex.createLimitOrder(0, web3.utils.fromUtf8("LINK"), 10, 1)
        )
        
        dex.depositETH({value: 10});
        await truffleAssert.passes(
            dex.createLimitOrder(0, web3.utils.fromUtf8("LINK"), 10, 1)
        )

    });

    // The user must have enough tokens deposited so that tokens deposited >= sell order value
    it("user should have enough tokens deposited to be greater than sell order value", async () => {
        let dex = await Dex.deployed();
        let link = await Link.deployed();

        await truffleAssert.reverts(
            dex.createLimitOrder(1, web3.utils.fromUtf8("LINK"), 10, 1)
        )
        await link.approve(dex.address, 500);
        await dex.addToken(web3.utils.fromUtf8("LINK"), link.address, {from: accounts[0]});
        dex.deposit(10, web3.utils.fromUtf8("LINK"));
        
        await truffleAssert.passes(
            dex.createLimitOrder(1, web3.utils.fromUtf8("LINK"), 10, 1)
        )

    });

    // The BUY order book should be ordered on price from highest to lowest starting at index[0]
    it("should have the buy orderbook in the correct sequence", async () => {
        let dex = await Dex.deployed();
        let link = await Link.deployed();
        await link.approve(dex.address, 500);

        await dex.createLimitOrder(0, web3.utils.fromUtf8("LINK"), 1, 400);
        await dex.createLimitOrder(0, web3.utils.fromUtf8("LINK"), 1, 200);
        await dex.createLimitOrder(0, web3.utils.fromUtf8("LINK"), 1, 300);

        let orderBook = await dex.getOrderBook(web3.utils.fromUtf8("LINK"), 0);

        assert(orderBook > 0);
        for (let i = 0; i < orderBook.length - 1; i++) {
            assert(orderBook[i].price >= orderBook[i + 1].price, "Orderbook sequence incorrect.");
        }
    });

    // The SELL order book should be ordered on price from lowest to highest starting at index[0]
    it("should have the sell orderbook in the correct sequence", async () => {
        let dex = await Dex.deployed();
        let link = await Link.deployed();
        await link.approve(dex.address, 500);

        await dex.createLimitOrder(1, web3.utils.fromUtf8("Link"), 1, 100);
        await dex.createLimitOrder(1, web3.utils.fromUtf8("Link"), 1, 400);
        await dex.createLimitOrder(1, web3.utils.fromUtf8("Link"), 1, 300);

        let orderBook = await dex.getOrderBook(web3.utils.fromUtf8("Link"), 1);
        
        assert(orderBook > 0);
        for (let i = 0; i < orderBook.length - 1; i++) {
            assert(orderBook[i].price <= orderBook[i + 1].price, "Orderbook sequence incorrect.");
        }

    })

})



pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "./Wallet.sol";

contract Dex is Wallet {
    using SafeMath for uint256;

    enum Side {
        BUY,
        SELL
    }

    struct Order {
        uint256 id;
        address trader;
        Side side;
        bytes32 ticker;
        uint256 amount;
        uint256 price;
    }

    uint256 public nextOrderId = 0;

    mapping(bytes32 => mapping(uint256 => Order[])) public orderBook;

    function getOrderBook(bytes32 ticker, Side side)
        public
        view
        returns (Order[] memory)
    {
        return orderBook[ticker][uint256(side)];
    }

    function createLimitOrder(
        Side side,
        bytes32 ticker,
        uint256 amount,
        uint256 price
    ) public {
        //   if(side == Side.BUY){
        //     require(balances[msg.sender]["ETH"] >= amount.mul(price));
        // }
        // else if(side == Side.SELL){
        //     require(balances[msg.sender][ticker] >= amount);
        // }

        Order[] storage listOrders = orderBook[ticker][uint256(side)];

        listOrders.push(
            Order(nextOrderId, msg.sender, side, ticker, amount, price)
        );

        uint i = listOrders.length > 0 ? listOrders.length -1 : 0;
        
        if (side == Side.BUY) {
            // require(balances[msg.sender]["ETH"] >= amount.mul(price));

                while(i > 0) {
                    if (listOrders[i - 1].price > listOrders[i].price) {
                        break;
                    }

                    Order memory orderToMove = listOrders[i - 1];
                    listOrders[i - 1] = listOrders[i];
                    listOrders[i] = orderToMove;
                    i--;

                } 
        } else if (side == Side.SELL) {
            // require(balances[msg.sender][ticker] >= amount.mul(price));

            while(i > 0) {
                if (listOrders[i - 1].price < listOrders[i].price) {
                    break;
                }

                Order memory orderToMove = listOrders[i - 1];
                listOrders[i - 1] = listOrders[i];
                listOrders[i] = orderToMove;
                i--;

            }
        }
        nextOrderId++;
    }

}

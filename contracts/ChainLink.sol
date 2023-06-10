// SPDX-Licence-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import {IToken} from "./IToken.sol";

contract TokenSwap {
    // using SafeERC20 for IERC20;
    AggregatorV3Interface internal priceFeedA;
    AggregatorV3Interface internal priceFeedB;

    IToken public tokenA;
    IToken public tokenB;

    constructor() {
        tokenA = IToken(0x6B175474E89094C44Da98b954EedeAC495271d0F);
        tokenB = IToken(0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984);
        priceFeedA = AggregatorV3Interface(0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984);
        priceFeedB = AggregatorV3Interface(0x553303d460EE0afB37EdFf9bE42922D8FF63220e);
    }

    function getExchangeRate(AggregatorV3Interface priceFeed) public view returns (uint256) {
        (, int256 price, , ,) = priceFeed.latestRoundData();
        return uint256(price);
    }

    function swapTokens(uint256 amount) public {
        uint256 rateA = getExchangeRate(priceFeedA);
        //dai/usd
        uint256 rateB = getExchangeRate(priceFeedB);
        // uni/usd
        uint256 price = rateA * 1e18 / rateB;
        uint256 amounttoreceive = price * amount/ 1e18;


        tokenA.transferFrom(msg.sender, address(this), amount);

       tokenB.transfer(msg.sender, amounttoreceive);
    }
}
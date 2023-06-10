import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import { providers } from "ethers";
import { Contract } from "hardhat/internal/hardhat-network/stack-traces/model";

async function main() {
  const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  //uni token address
  const UNI = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
  //dai holder
  const DAIHolder = "0x748dE14197922c4Ae258c7939C7739f3ff1db573";
  const BAT = "0x0D8775F648430679A709E98d2b0Cb6250d2887EF";
  const helpers = require("@nomicfoundation/hardhat-network-helpers");
  await helpers.impersonateAccount(DAIHolder);
  const impersonatedSigner = await ethers.getSigner(DAIHolder);
  // const ethereum = "0xC4334A9AF50C80A12C484de643149f6159Bdd110";
  const uniholder = "0x2a295129740378844b654F768030Ef758A5c2e5e";
  await helpers.impersonateAccount(uniholder);
  await helpers.setBalance(uniholder,100000000000000000000000000);
  const impersonatedSigneruni = await ethers.getSigner(uniholder);

  const [owner] = await ethers.getSigners();
  const Swapper = await ethers.getContractFactory("TokenSwap");
  const swapper = await Swapper.deploy();
  await swapper.deployed();

  console.log(`swapping contract deployed at: ${swapper.address}`);

  const daiContract = await ethers.getContractAt("IToken", DAI);
  const UniContract = await ethers.getContractAt("IToken", UNI);
  const getDai = await daiContract.connect(impersonatedSigner).transfer(swapper.address, 100);
  console.log(getDai);

  const daibal = await daiContract.balanceOf(swapper.address);
  console.log(`dai balance is ${daibal}`);

  const approve = await UniContract.connect(impersonatedSigneruni).approve(swapper.address, 100);
  const amt = await ethers.utils.parseEther("0.0000001");

  const swap = await swapper.connect(impersonatedSigneruni).swapTokens(1);
  console.log(swap)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
console.error(error);
process.exitCode = 1;
});
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.17",

  networks:{
    hardhat: {
      forking: {
        enabled: true,
        //@ts-ignore
        url: process.env.MAINNET_FORK,
      },
      },
    goerli:{
      url:process.env.GOERLI_RPC,
        //@ts-ignore
        accounts:[process.env.PRIVATE_KEYS],
    },
  },
  // etherscan: {
  //   apiKey: process.env.ETHERSCAN
  // },
};

export default config;
// 0x3F573CbBFF95e14f26E7fa553Db963996d40B65c Multi Sig Address
// 0xa82F721d20693B709ae7Cb792477545b4653Be2F Child Contract

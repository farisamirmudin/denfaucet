import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
import { z } from "zod";
dotenv.config();

const envVariables = z.object({
  PRIVATE_KEY: z.string(),
  INFURA_GOERLI_URI: z.string(),
  TOKEN_ADDRESS: z.string(),
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: process.env.INFURA_GOERLI_URI,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};

export default config;

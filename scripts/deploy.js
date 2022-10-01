// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { hours } = require("@nomicfoundation/hardhat-network-helpers/dist/src/helpers/time/duration");
const hre = require("hardhat");

async function main() {

  const CampaignFactory = await hre.ethers.getContractFactory("CampaignFactory");
  const campaignFactory = await CampaignFactory.deploy();

  await campaignFactory.deployed();

  console.log("Factory deployed to : ", campaignFactory.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log("error")
    process.exit(1)
  })
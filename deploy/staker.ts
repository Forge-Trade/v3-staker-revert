const hre = require("hardhat");
export default {}
module.exports = async ({
  getNamedAccounts,
  deployments,
  getChainId,
  getUnnamedAccounts,
}) => {
  const { deploy, execute } = deployments;
  const { deployer } = await getNamedAccounts();

  const ONE_MINUTE_SECONDS = 60
  const ONE_HOUR_SECONDS = ONE_MINUTE_SECONDS * 60
  const ONE_DAY_SECONDS = ONE_HOUR_SECONDS * 24
  const ONE_MONTH_SECONDS = ONE_DAY_SECONDS * 30
  const ONE_YEAR_SECONDS = ONE_DAY_SECONDS * 365
  
  // 2592000
  const MAX_INCENTIVE_START_LEAD_TIME = ONE_MONTH_SECONDS
  // 1892160000
  const MAX_INCENTIVE_DURATION = ONE_YEAR_SECONDS * 2

  const FACTORY = "0x18107600e90ced8B7d8a4E2DaAE7360522f880B2"
  const NON_FUNGIBLE_TOKEN_POSITION_MANAGER = "0x483e6D6D4dF00CFc4Ee18eEd7685221C3Aa9E2de"


  //Orbit Auction
  const staker = await deploy("UniswapV3Staker", {
    from: deployer,
    args: [
    FACTORY, 
    NON_FUNGIBLE_TOKEN_POSITION_MANAGER,
    MAX_INCENTIVE_START_LEAD_TIME,
    MAX_INCENTIVE_DURATION,
    ]
  });

  console.log("Uniswap V3 Staker deployed at: " + staker.address)

};

module.exports.tags = ['staker']
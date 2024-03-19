import hre from 'hardhat';
const { ethers } = hre;

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account', deployer.address);
  const TodoContract = await ethers.getContractFactory('TodoContract');
  const deployed = await TodoContract.deploy();

  console.log(deployed);

  await deployed.deployed();

  console.log('TodoContract deployed to:', deployed.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

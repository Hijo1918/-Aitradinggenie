async function main() {
  const Aitradinggenie = await ethers.getContractFactory("Aitradinggenie");
  const contract = await Aitradinggenie.deploy();
  await contract.deployed();

  console.log("✅ Contract deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

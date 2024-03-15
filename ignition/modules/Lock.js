const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MetaNFTModule", (m) => {
  // Define the minting fee in Wei (0.01 ETH)
  const mintingFee = m.getParameter("mintingFee", 10000000000000000n); // 0.01 ETH in Wei

  // Deploy the MetaNFT contract
  const metaNFT = m.contract("MetaNFT", [], {
    contract: {
      path: "./contracts/MetaNFT.sol",
      name: "MetaNFT",
    },
  });

  // Define the base URI for token metadata
  const baseURI = "https://blue-clear-mole-324.mypinata.cloud/ipfs/Qmcd7BP4Ar7DwCiaFKnhi7kmebVdiLvm4TMcAB6M7dpdHS/";

  // Define the safeMint function
  async function safeMint(to, tokenId) {
    // Check if the sender has sent enough Ether as minting fee
    await metaNFT.tx({ value: mintingFee }).safeMint(to, tokenId);
  }

  return { metaNFT, safeMint };
});

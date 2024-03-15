require("@nomicfoundation/hardhat-toolbox");

const ALCHEMY_API_KEY = "XpWuAVYcHj7J0KOpMrd-c8Zr1Tdd0YJ5";

// Replace this private key with your Sepolia account private key
// To export your private key from Coinbase Wallet, go to
// Settings > Developer Settings > Show private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const MUMBAI_PRIVATE_KEY = "8b2e54997c83fe1a298fc5b2978448a6f2b4b03ef30942279af3333e137b421c";

module.exports = {
  solidity: "0.8.24",
  networks: {
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [MUMBAI_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: "PDGVZS82B1QWUB8IF17W3W8EVDPPBW13XX" // Optional: If you want to verify contracts on Etherscan
  }
};


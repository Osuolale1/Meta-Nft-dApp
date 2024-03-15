const { time, loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("MetaNFT", function () {
  async function deployMetaNFTFixture() {
    const MetaNFT = await ethers.getContractFactory("MetaNFT");
    const metaNFT = await MetaNFT.deploy();
    return { metaNFT };
  }

  describe("Deployment", function () {
    it("Should deploy MetaNFT with correct name and symbol", async function () {
      const { metaNFT } = await loadFixture(deployMetaNFTFixture);
      expect(await metaNFT.name()).to.equal("Meta NFT");
      expect(await metaNFT.symbol()).to.equal("MNFT");
    });

    it("Should set the correct base URI", async function () {
      const { metaNFT } = await loadFixture(deployMetaNFTFixture);
      const baseURI = await metaNFT.baseURI();
      expect(baseURI).to.equal("https://blue-clear-mole-324.mypinata.cloud/ipfs/Qmcd7BP4Ar7DwCiaFKnhi7kmebVdiLvm4TMcAB6M7dpdHS/");
    });
  });

  describe("Minting", function () {
    it("Should mint a new NFT with correct owner", async function () {
      const { metaNFT } = await loadFixture(deployMetaNFTFixture);
      const [owner] = await ethers.getSigners();

      await metaNFT.safeMint(owner.address, 1);

      const ownerOfToken = await metaNFT.ownerOf(1);
      expect(ownerOfToken).to.equal(owner.address);
    });

    it("Should require correct minting fee for minting", async function () {
      const { metaNFT } = await loadFixture(deployMetaNFTFixture);
      const [owner] = await ethers.getSigners();

      const mintingFee = await metaNFT.mintingFee();
      const notEnoughFee = mintingFee - 1;

      await expect(metaNFT.safeMint(owner.address, 1, { value: notEnoughFee })).to.be.revertedWith("Not enough minting fee");

      await expect(metaNFT.safeMint(owner.address, 1, { value: mintingFee })).to.emit(metaNFT, "Transfer");
    });
  });
});

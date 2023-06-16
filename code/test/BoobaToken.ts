import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('BoobaToken', function () {
	// We define a fixture to reuse the same setup in every test.
	// We use loadFixture to run this setup once, snapshot that state,
	// and reset Hardhat Network to that snapshot in every test.
	async function deployOneYearLockFixture() {
		// Contracts are deployed using the first signer/account by default
		const [owner, otherAccount] = await ethers.getSigners();
		const BoobaToken = await ethers.getContractFactory('BoobaToken');
		const contractInstance = await BoobaToken.deploy();

		return { contractInstance, owner, otherAccount };
	}

	describe('Deployment', function () {
		it('Should mint 1000000 tokens and sent to his owner', async function () {
			const { contractInstance, owner } = await loadFixture(
				deployOneYearLockFixture
			);
			const ethToWei = ethers.utils.parseEther('1000000');

			expect(await contractInstance.balanceOf(owner.address)).to.equal(
				ethToWei
			);
		});

		it('Should buy a BoobaToken with 0.1 ETH and receive 1 BoobaToken', async function () {
			const { contractInstance, otherAccount } = await loadFixture(
				deployOneYearLockFixture
			);
			const ethToWei = ethers.utils.parseEther('0.1');
			const b2oToWei = ethers.utils.parseEther('1');

			await contractInstance.mint(otherAccount.address, {
				value: ethToWei
			});
			expect(
				await contractInstance.balanceOf(otherAccount.address)
			).to.equal(b2oToWei);
		});
	});
});

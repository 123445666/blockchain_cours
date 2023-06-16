import { useState } from 'react';
import './App.css';
import { ethers } from 'ethers';
import VietTokenJSON from '../../artifacts/contracts/VietToken.sol/VietToken.json';

declare global {
  interface Window {
    ethereum: any;
  }
}


function App() {
	const [currentAccount, setCurrentAccount] = useState<string | null>(null);

	const handleMint = async () => {
		const contractAddress = '0xa3Ca57DD3169E17A491f571b4C161304af2A110b';
		const abi = VietTokenJSON.abi;

		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(contractAddress, abi, signer);

		console.log({ contract });
    const tx = await contract.mint(currentAccount, {
      value: ethers.utils.parseEther('0.1'),
      gasLimit: 300000,
    });
		await tx.wait();
		console.log({ tx });
	};

	const handleLogin = async () => {
		const { ethereum } = window as any;
		if (!ethereum) {
			alert('Get MetaMask!');
			return;
		}
		const accounts = await ethereum.request({
			method: 'eth_requestAccounts'
		});
		setCurrentAccount(accounts[0]);
	};

	return (
		<>
			<h1>Mint NFT</h1>
			<div className='card'>
				{currentAccount ? (
					<button onClick={handleMint}>Mint NFT</button>
				) : (
					<button onClick={handleLogin}>Connect</button>
				)}
			</div>
		</>
	);
}

export default App;

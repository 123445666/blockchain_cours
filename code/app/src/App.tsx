import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { ethers } from 'ethers';
// import BoobaTokenJSON from '../../artifacts/contracts/BoobaToken.sol/BoobaToken.json';

declare global {
  interface Window {
    ethereum: any;
  }
}


function App() {
	const [currentAccount, setCurrentAccount] = useState<string | null>(null);

	const handleBuy = async () => {
		const contractAddress = '0xD83b190c7656cEc00888e7483244698407d2265F';
		const abi = '';//BoobaTokenJSON.abi;

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
			<h1>Booba Token</h1>
			<div className='card'>
				{currentAccount ? (
					<button onClick={handleBuy}>Buy B2O</button>
				) : (
					<button onClick={handleLogin}>Connect</button>
				)}
			</div>
		</>
	);
}

export default App;
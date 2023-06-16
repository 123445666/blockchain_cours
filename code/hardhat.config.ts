import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

const config: HardhatUserConfig = {
	solidity: '0.8.19',
	networks: {
		mumbai: {
			chainId: 80001,
			url: 'https://rpc-mumbai.maticvigil.com',
			accounts: [
				'VOTRE_CLE_PRIVEE'
			]
		}
	}
};

export default config;
import Web3 from "web3";
import HDWalletProvider from "@truffle/hdwallet-provider";

import "bootstrap/dist/css/bootstrap.min.css";

import { Web3Context } from "./context/Web3Context";
import Routes from "./router";

const setDefaultAccount = async (web3) => {
	const accounts = await web3.eth.getAccounts();
	web3.defaultAccount = accounts[0];
};

export default function App() {
	const provider = new HDWalletProvider(
		"file mask carry stone found flat reflect october obtain visit olympic amazing",
		"http://localhost:8545"
	);
	let web3 = new Web3(provider || Web3.givenProvider);
	setDefaultAccount(web3);

	return (
		<Web3Context.Provider value={web3}>
			<Routes />
		</Web3Context.Provider>
	);
}

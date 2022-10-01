import styled from "styled-components";
import { ethers } from "ethers";
import { useState } from "react";
import WalletIcon from '@mui/icons-material/Wallet';


const networks = {
    polygon: {
        chainId: `0x${Number(80001).toString(16)}`,
        chainName: "Polygon Test Network",
        nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18,
        },
        rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
        blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
    },
};


const Wallet = () => {
    const [address, setAddress] = useState("");
    const [balance, setBalance] = useState("");


    const connectWallet = async () => {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        if (provider.network !== "matic") {
            await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                    {
                        ...networks["polygon"],
                    },
                ],
            });
        }
        const account = provider.getSigner();
        const Address = await account.getAddress();
        setAddress(Address);
        const Balance = ethers.utils.formatEther(await account.getBalance());
        setBalance(Balance);

    };

    return (
        <ConnectWalletWrapper onClick={connectWallet}>
            {balance == '' ? <Balance></Balance> : <Balance> {balance.slice(0, 4)} Matic</Balance>}
            {address == '' ? <WalletIcon /> : <Address>{address.slice(0, 6)}...{address.slice(39)}</Address>}
        </ConnectWalletWrapper>
    );
};

const ConnectWalletWrapper = styled.div`
  display: flex;
  align-items: center;
  border-color: #fff;
  height: 10%;
  border-radius: 10px;
  margin-right: 15px;
  font-family: 'Roboto';
  font-weight: bold;
  font-size: small;
  cursor: pointer;
  `;

const Address = styled.span`
    height: 10%;
    display: flex;
    background-color: #fff;
    align-items: center;
    justify-content: center;
    padding: 0 5px 0 5px;
    border-radius: 10px;
    color: black;
`

const Balance = styled.span`
    display: flex;
    height: 10%;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
    color: #fff;
`

export default Wallet;
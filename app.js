let web3;
let account;
const contractAddress = '0x109FeB79B32E541F055e3A3bD581AC15509729FC'; // Replace with your deployed contract address
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "bidder",
				"type": "address"
			}
		],
		"name": "acceptBid",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "depositForDividends",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "stakeholders",
				"type": "address[]"
			},
			{
				"internalType": "uint256",
				"name": "totalDividendAmount",
				"type": "uint256"
			}
		],
		"name": "distributeDividends",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "initialOwner",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "allowance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientAllowance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientBalance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSpender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenAmount",
				"type": "uint256"
			}
		],
		"name": "placeBid",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "bidder",
				"type": "address"
			}
		],
		"name": "rejectBid",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawBid",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdrawEther",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "bids",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "tokenAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "etherAmount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "walletAddress",
				"type": "address"
			}
		],
		"name": "checkBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lockedTokens",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]; // Replace with your contract ABI

let contract;
const ownerAddress = '0x4b8C8a27834EFF8efAf8fc7Bd180506c9eDB8cBb'; // Replace with your owner's address

window.onload = async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
            const accounts = await web3.eth.getAccounts();
            account = accounts[0];
            document.getElementById('account').innerText = account;

            contract = new web3.eth.Contract(contractABI, contractAddress);

            const ethBalance = await web3.eth.getBalance(account);
            document.getElementById('ethBalance').innerText = web3.utils.fromWei(ethBalance, 'ether');

            const tokenBalance = await contract.methods.balanceOf(account).call();
            document.getElementById('tokenBalance').innerText = web3.utils.fromWei(tokenBalance, 'ether');

            document.getElementById('walletInfo').classList.remove('hidden');

            if (account.toLowerCase() === ownerAddress.toLowerCase()) {
                document.getElementById('ownerActions').classList.remove('hidden');
                const contractEthBalance = await web3.eth.getBalance(contractAddress);
                document.getElementById('contractEthBalance').innerText = web3.utils.fromWei(contractEthBalance, 'ether');
            }
        } catch (error) {
            console.error('User denied account access');
        }
    } else {
        alert('No Ethereum browser extension detected, install MetaMask!');
    }
};

document.getElementById('connectWallet').addEventListener('click', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
            const accounts = await web3.eth.getAccounts();
            account = accounts[0];
            document.getElementById('walletInfo').classList.remove('hidden');
            document.getElementById('account').innerText = account;

            // Fetch balances
            const ethBalance = await web3.eth.getBalance(account);
            document.getElementById('ethBalance').innerText = web3.utils.fromWei(ethBalance, 'ether');

            contract = new web3.eth.Contract(contractABI, contractAddress);
            const tokenBalance = await contract.methods.balanceOf(account).call();
            document.getElementById('tokenBalance').innerText = web3.utils.fromWei(tokenBalance, 'ether');

            if (account.toLowerCase() === ownerAddress.toLowerCase()) {
                document.getElementById('ownerActions').classList.remove('hidden');
                const contractEthBalance = await web3.eth.getBalance(contractAddress);
                document.getElementById('contractEthBalance').innerText = web3.utils.fromWei(contractEthBalance, 'ether');
            }

        } catch (error) {
            console.error('User denied account access');
        }
    } else {
        alert('No Ethereum browser extension detected, install MetaMask!');
    }
});

document.getElementById('distributeDividends').addEventListener('click', async () => {
    const stakeholders = document.getElementById('stakeholders').value.split(',').map(addr => addr.trim());
    const totalDividendAmount = document.getElementById('dividendAmount').value;

    if (contract && stakeholders.length > 0 && totalDividendAmount) {
        const dividendAmount = web3.utils.toWei(totalDividendAmount, 'ether');

        try {
            await contract.methods.distributeDividends(stakeholders, dividendAmount).send({ from: account });
            alert('Dividends distributed successfully');
        } catch (error) {
            if (error.code === 4001) {
                alert('Transaction denied. Please approve the transaction in MetaMask.');
            } else {
                console.error('Error distributing dividends:', error);
                alert('An error occurred while distributing dividends. Check the console for details.');
            }
        }
    } else {
        alert('Please fill in all fields correctly.');
    }
});

document.getElementById('depositEther').addEventListener('click', async () => {
    const depositAmount = prompt("Enter the amount of Ether to deposit:");
    if (contract && depositAmount) {
        const depositValue = web3.utils.toWei(depositAmount, 'ether');

        try {
            await contract.methods.depositForDividends().send({ from: account, value: depositValue });
            alert('Ether deposited successfully');
            const contractEthBalance = await web3.eth.getBalance(contractAddress);
            document.getElementById('contractEthBalance').innerText = web3.utils.fromWei(contractEthBalance, 'ether');
        } catch (error) {
            if (error.code === 4001) {
                alert('Transaction denied. Please approve the transaction in MetaMask.');
            } else {
                console.error('Error depositing Ether:', error);
                alert('An error occurred while depositing Ether. Check the console for details.');
            }
        }
    }
});

document.getElementById('withdrawEther').addEventListener('click', async () => {
    const withdrawAmount = prompt("Enter the amount of Ether to withdraw:");
    if (contract && withdrawAmount) {
        const withdrawValue = web3.utils.toWei(withdrawAmount, 'ether');

        try {
            await contract.methods.withdrawEther(withdrawValue).send({ from: account });
            alert('Ether withdrawn successfully');
            const contractEthBalance = await web3.eth.getBalance(contractAddress);
            document.getElementById('contractEthBalance').innerText = web3.utils.fromWei(contractEthBalance, 'ether');
        } catch (error) {
            if (error.code === 4001) {
                alert('Transaction denied. Please approve the transaction in MetaMask.');
            } else {
                console.error('Error withdrawing Ether:', error);
                alert('An error occurred while withdrawing Ether. Check the console for details.');
            }
        }
    }
});
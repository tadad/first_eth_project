const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
  'miracle alert injury cause tray rebuild pottery off fiction robot announce fancy',
  'https://rinkeby.infura.io/v3/8901857b01c348bbbcf9eefe3b7a9167'
);

const web3 = new Web3(provider);

// this is really similar to the beforeEach call in our tests - only difference is that we are going to a test netowrk now
const deploy = async() => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['He there!'] })
    .send({ gas: '1000000', from: accounts[0]});
  
  console.log('Contract deployed to', result.options.address);
}

deploy();
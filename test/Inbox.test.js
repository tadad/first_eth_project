const assert = require("assert");
const ganache = require("ganache-cli"); // use ganache for tests because it is relatively instant
const Web3 = require("web3"); // this is a constructor
const provider = ganache.provider();
const web3 = new Web3(provider);


const { interface, bytecode } = require('../compile');

let accounts;
let inbox;
const INITIAL_STRING = 'Hi there!';

beforeEach(async () => {
  // get a list of all accounts
  accounts = await web3.eth.getAccounts();
  
  // use an account to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
    .send({ from: accounts[0], gas: '1000000'});

  inbox.setProvider(provider);
});

describe("Inbox", () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });
  it('has a default message', async () => {
    const message = await inbox.methods.message().call(); // first set of ()s go the arguments, second goes how it gets called (gas limits &c)
    assert.strictEqual(message, INITIAL_STRING);
  });
  it('sets the message properly', async () => {
    await inbox.methods.setMessage('new message!').send({ from: accounts[0] });
    const newMessage = await inbox.methods.message().call();
    assert.strictEqual(newMessage, 'new message!');
  });
})
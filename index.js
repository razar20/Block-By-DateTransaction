const EthDater = require('ethereum-block-by-date');
const dotenv = require('dotenv').config();
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.rpc_Url));

// const date = new Date();
// console.log(date.toUTCString());

const dater = new EthDater(
    web3 // Web3 object, required.
);

async function blocks(startdate, enddate) {
let endBlock = await dater.getDate(
    startdate, // Date, required. Any valid moment.js value: string, milliseconds, Date() object, moment() object.
    true, // Block after, optional. Search for the nearest block before or after the given date. By default true.
    false // Refresh boundaries, optional. Recheck the latest block before request. By default false.
);
let endBlockNumber = endBlock.block
console.log("endBlockNumber ", endBlockNumber)

let startBlock = await dater.getDate(
    enddate, // Date, required. Any valid moment.js value: string, milliseconds, Date() object, moment() object.
    true, // Block after, optional. Search for the nearest block before or after the given date. By default true.
    false // Refresh boundaries, optional. Recheck the latest block before request. By default false.
);

let startBlockNumber = startBlock.block
console.log("startBlockNumber ", startBlockNumber)

for(i=startBlockNumber; i<=endBlockNumber; i++) {
    blocks = await web3.eth.getBlock(i)
    trs = blocks.transactions
    // console.log("Number of transactions ",trs.length)
    trs.forEach(async(transactionAddress) => {
        let tx = await web3.eth.getTransaction(transactionAddress)
        console.log(tx)
    })
}

}

blocks ('2022-09-21 12:00:00','2022-09-20 12:00:00')
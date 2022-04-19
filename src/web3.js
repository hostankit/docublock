
// //overrides metamask v0.2 for our 1.0 version.  
//1.0 lets us use async and await instead of promises

// import Web3 from 'web3';
// //overrides metamask v0.2 for our v 1.0
// const web3 = new Web3(window.web3.currentProvider);


// export default web3;

/*const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');

let web3;

if (false && typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  //In browser and has metamask
  web3 = new Web3(window.web3.currentProvider);
} else {

//const web3 = new Web3(new Web3.providers.HttpProvider("http://ripe7q-dns-reg1.southindia.cloudapp.azure.com:8545"));
  const provider = new HDWalletProvider(
    'dress steel phrase album average giggle sad room exile web divert cause',
    'https://rinkeby.infura.io/I7P2ErGiQjuq4jNp41OE',
  );
  web3 = new Web3(provider);
}

export default web3;
*/
// //overrides metamask v0.2 for our 1.0 version.  
//1.0 lets us use async and await instead of promises

// import Web3 from 'web3';
// //overrides metamask v0.2 for our v 1.0
// const web3 = new Web3(window.web3.currentProvider);

// export default web3;

import Web3 from 'web3';

var web3;

if (typeof window !== 'undefined') {
    if(window.web3 !== 'undefined'){
        const provider = new Web3.providers.HttpProvider(
            'http://127.0.0.1:8545'
            );
        web3 = new Web3(provider);
        web3.eth.defaultAccount = "0xa86aDd77bcDf07F44f7d64fb3425a4930682FD6F";
    } else{
        web3 = new Web3(window.web3.currentProvider);
        console.log(web3.eth.getAccounts());
    }
} else {
    const provider = new Web3.providers.HttpProvider(
        'http://127.0.0.1:8545'
        );
    web3 = new Web3(provider);
    console.log(web3.eth.getAccounts());
}

export default web3;


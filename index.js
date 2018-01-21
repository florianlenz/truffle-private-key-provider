const FiltersSubprovider = require('web3-provider-engine/subproviders/filters.js');
const HookedSubprovider = require('web3-provider-engine/subproviders/hooked-wallet.js');
const Web3 = require('web3');
const Transaction = require('ethereumjs-tx');
const ProviderEngine = require('web3-provider-engine');
const Web3Subprovider = require('web3-provider-engine/subproviders/web3.js');
const ethUtils = require('ethereumjs-util');

function HDWalletProvider (privateKey, providerUrl) {

    this.address = ethUtils.addHexPrefix(ethUtils.privateToAddress(Buffer.from(privateKey, 'hex')));

    this.engine = new ProviderEngine();
    this.engine.addProvider(
        new HookedSubprovider({
            getAccounts: function (cb) {
                cb(null, [address])
            },
            getPrivateKey: function (address, cb) {



            },
            signTransaction: function (txParams, cb) {

            }
        })
    );
    this.engine.addProvider(new FiltersSubprovider())
    this.engine.addProvider(
        new Web3Subprovider(new Web3.providers.HttpProvider(providerUrl))
    );
    this.engine.start() // Required by the provider engine.
}

HDWalletProvider.prototype.sendAsync = function () {
    this.engine.sendAsync.apply(this.engine, arguments)
};

HDWalletProvider.prototype.send = function () {
    return this.engine.send.apply(this.engine, arguments)
};

// returns the addresses cache
HDWalletProvider.prototype.getAddresses = function () {
    return [this.address];
};

module.exports = HDWalletProvider

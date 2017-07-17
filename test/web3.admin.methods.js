var chai = require('chai');
var assert = chai.assert;
var Web3 = require('../index.js');
var web3 = new Web3();
var u = require('./helpers/test.utils.js');
var FakeHttpProvider = require('./helpers/FakeHttpProvider');
var provider = new FakeHttpProvider();
web3.setProvider(provider);

describe('web3.admin', function() {
    describe('methods', function() {
        u.propertyExists(web3.admin, 'nodeInfo');
        u.propertyExists(web3.admin, 'peers');
        u.methodExists(web3.admin, 'addPeer');
    });
});

var chai = require('chai');
var assert = chai.assert;
var Web3 = require('../index');
var web3 = new Web3();
var FakeHttpProvider = require('./helpers/FakeHttpProvider');

var method = 'peers';

var tests = [{
    result: [{
        caps: ["eth/61", "eth/62", "eth/63"],
        id: "08a6b39263470c78d3e4f58e3c997cd2e7af623afce64656cfc56480babcea7a9138f3d09d7b9879344c2d2e457679e3655d4b56eaff5fd4fd7f147bdb045124",
        name: "Geth/v1.5.0-unstable/linux/go1.5.1",
        network: {
          localAddress: "192.168.0.104:51068",
          remoteAddress: "71.62.31.72:30303"
        },
        protocols: {
          eth: {
            difficulty: 17334052235346465000,
            head: "5794b768dae6c6ee5366e6ca7662bdff2882576e09609bf778633e470e0e7852",
            version: 63
          }
        }
    }, /* ... */ {
        caps: ["eth/61", "eth/62", "eth/63"],
        id: "fcad9f6d3faf89a0908a11ddae9d4be3a1039108263b06c96171eb3b0f3ba85a7095a03bb65198c35a04829032d198759edfca9b63a8b69dc47a205d94fce7cc",
        name: "Geth/v1.3.5-506c9277/linux/go1.4.2",
        network: {
          localAddress: "192.168.0.104:55968",
          remoteAddress: "121.196.232.205:30303"
        },
        protocols: {
          eth: {
            difficulty: 17335165914080772000,
            head: "5794b768dae6c6ee5366e6ca7662bdff2882576e09609bf778633e470e0e7852",
            version: 63
          }
        }
    }],
    formattedResult: [{
        caps: ["eth/61", "eth/62", "eth/63"],
        id: "08a6b39263470c78d3e4f58e3c997cd2e7af623afce64656cfc56480babcea7a9138f3d09d7b9879344c2d2e457679e3655d4b56eaff5fd4fd7f147bdb045124",
        name: "Geth/v1.5.0-unstable/linux/go1.5.1",
        network: {
          localAddress: "192.168.0.104:51068",
          remoteAddress: "71.62.31.72:30303"
        },
        protocols: {
          eth: {
            difficulty: 17334052235346465000,
            head: "5794b768dae6c6ee5366e6ca7662bdff2882576e09609bf778633e470e0e7852",
            version: 63
          }
        }
    }, /* ... */ {
        caps: ["eth/61", "eth/62", "eth/63"],
        id: "fcad9f6d3faf89a0908a11ddae9d4be3a1039108263b06c96171eb3b0f3ba85a7095a03bb65198c35a04829032d198759edfca9b63a8b69dc47a205d94fce7cc",
        name: "Geth/v1.3.5-506c9277/linux/go1.4.2",
        network: {
          localAddress: "192.168.0.104:55968",
          remoteAddress: "121.196.232.205:30303"
        },
        protocols: {
          eth: {
            difficulty: 17335165914080772000,
            head: "5794b768dae6c6ee5366e6ca7662bdff2882576e09609bf778633e470e0e7852",
            version: 63
          }
        }
    }],
    call: 'admin_'+ method
}];

describe('web3.admin', function () {
    describe(method, function () {
        tests.forEach(function (test, index) {
            it('property test: ' + index, function () {

                // given
                var provider = new FakeHttpProvider();
                web3.setProvider(provider);
                provider.injectResult(test.result);
                provider.injectValidation(function (payload) {
                    assert.equal(payload.jsonrpc, '2.0');
                    assert.equal(payload.method, test.call);
                    assert.deepEqual(payload.params, []);
                });

                // when
                var result = web3.admin[method];

                // then
                assert.deepEqual(test.formattedResult, result);
            });
        });
    });
});

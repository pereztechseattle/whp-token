var WHPToken = artifacts.require("./WHPToken.sol");

contract('WHPToken', function (accounts) {
  it("should have one hundred million initial supply", function () {
    return WHPToken.deployed().then(function (instance) {
      return instance.totalSupply.call();
    }).then(function (balance) {
      assert.equal(balance.div(1e18).valueOf(), 100000000, "one hundred million wasn't the initial supply");
    });
  });

  it("should send coin correctly", function () {
    var meta;

    // Get initial balances of first and second account.
    var account_one = accounts[0];
    var account_two = accounts[1];

    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_one_ending_balance;
    var account_two_ending_balance;

    var amount = 10;

    return WHPToken.deployed().then(function (instance) {
      meta = instance;
      return meta.balanceOf.call(account_one);
    }).then(function (balance) {
      account_one_starting_balance = balance.toNumber();
      return meta.balanceOf.call(account_two);
    }).then(function (balance) {
      account_two_starting_balance = balance.toNumber();
      return meta.transfer(account_two, amount, { from: account_one });
    }).then(function () {
      return meta.balanceOf.call(account_one);
    }).then(function (balance) {
      account_one_ending_balance = balance.toNumber();
      return meta.balanceOf.call(account_two);
    }).then(function (balance) {
      account_two_ending_balance = balance.toNumber();

      assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
      assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
    });
  });
});

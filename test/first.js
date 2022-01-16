const Bids = artifacts.require('./Bids.sol');

contract('Bids', (accounts) => {
  it('should store the first day', async () => {
    const bids = await Bids.deployed();
    const firstday = await bids.getFistDayBid.call();
    console.log(firstday);
    // const day = await dayStorage.getFistDayBid.assert.equal(day.toNumber(), 0);
  });
});

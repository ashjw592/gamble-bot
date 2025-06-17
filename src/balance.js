const fs = require('fs')
const path = require('path');
const BALANCE_FILE = path.join(__dirname, '..', 'balances', 'balances.json');
const balancesJson = JSON.parse(fs.readFileSync(BALANCE_FILE));
function balanceCommand(userId) {
  return `Balance: ${getBalance(userId)}`
}
function getBalance(userId) {
  let bal;
  if (!balancesJson[userId]) {
    balancesJson[userId] = 0;
    bal = 0;
    saveBalances(balancesJson)
  }
  else {
    bal = balancesJson[userId];
  }
  return bal;
}
function saveBalances(balancesJson) {
  fs.writeFileSync(BALANCE_FILE, JSON.stringify(balancesJson, null, 2));
}
function giveMoney(userId) {
  if (!balancesJson[userId]) {
    accountInit(userId)
  }
  else {
    balancesJson[userId] += 100;
    saveBalances(balancesJson);
  }
  return getBalance(userId);
}
function changeBalance(id, amount) {
  balancesJson[id] += amount;
  saveBalances(balancesJson);
}
function accountInit(userId) {
  balancesJson[userId] = 100;
  saveBalances(balancesJson);
}

module.exports = {
  balanceCommand,
  getBalance,
  saveBalances,
  giveMoney,
  changeBalance,
  accountInit,
  balancesJson
};

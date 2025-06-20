const { getBalance, changeBalance, } = require('./balance.js')

function slotsCommand(id, amount) {
  let bal = getBalance(id);
  if (!bal) {
    return 'Run /hourly first!'
  }
  if (bal < amount) {
    return 'insufficient funds'
  }
  let result = slotsResult();
  let multiplier = result.multiplier
  if (multiplier === 0) {
    changeBalance(id, -amount);
    bal -= amount
  }
  else {
    bal += amount * multiplier
    changeBalance(id, amount * multiplier)
  }


  let returnObject = {
    bet: amount,
    multiplier: multiplier,
    winnings: multiplier * amount,
    balance: bal,
    id: id,
    emojiArr: result.emojiArr,
    resultString: result.resultString,
    resultBit: result.resultBit
  }
  return returnObject
}

function slotsResult() {
  let emojiArr = [];
  let returnString;
  let multiplier;
  for (let i = 0; i < 3; i++) {
    emojiArr.push(chooseEmoji());
  }
  let result = slotsLogic(emojiArr);
  if (result === 1) {
    returnString = `You Win!`
    if (emojiArr[0] === '🍒') {
      multiplier = 15
    }
    else if (emojiArr[0] === '🍋') {
      multiplier = 10;
    }
    else {
      multiplier = 5;
    }
  }
  else {
    returnString = `You Lost!`
    multiplier = 0;
  }
  return {
    multiplier: multiplier,
    emojiArr: emojiArr,
    resultString: returnString,
    resultBit: result
  };
}

function chooseEmoji() {
  const emojiList = ['🍒', '🍋', '🍇'];
  return emojiList[Math.floor(Math.random() * emojiList.length)];
}

function slotsLogic(emojiArr) {
  if (emojiArr[0] === emojiArr[1] && emojiArr[0] === emojiArr[2]) {
    return 1;
  }
  return 0;
}

module.exports = {
  slotsCommand,
};

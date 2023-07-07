/* eslint-disable @typescript-eslint/no-var-requires */
const ruButtons = require('./ru/buttons.json');
const enButtons = require('./en/buttons.json');

export const MAIN_KEYBOARD = [
  ruButtons.main_keyboard,
  enButtons.main_keyboard,
].reduce(function (acc, obj) {
  Object.keys(obj).forEach(function (key) {
    if (acc.hasOwnProperty(key)) {
      acc[key].push(obj[key]);
    } else {
      acc[key] = [obj[key]];
    }
  });
  return acc;
}, {});

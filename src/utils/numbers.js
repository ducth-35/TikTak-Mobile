import numeral from 'numeral';

const trillion = 1000000000000;
const billion = 1000000000;
const million = 1000000;

export const formatNumber = (number, numDecimal) => {
  const decimal = Math.pow(10, numDecimal);
  const value = Math.floor(number * decimal) / decimal;
  return value;
};

export const formatCommaNumber = (value) => {
  return numeral(value).format('0,0.[00000000]');
};
export const formatNumberBuy = (value) => {
  return numeral(value).format('0.[00000000]');
};

export const formatNumberFee = (value) => {
  return numeral(value).format('0,0');
};

export const numberWithCommas = (value) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatBigValue = (input) => {
  const value = parseInt(input, 10);
  if (value / trillion > 1) {
    return `${Math.floor(value / trillion)}.${getSubValue(value, trillion)}T`;
  }
  if (value / billion > 1) {
    return `${Math.floor(value / billion)}.${getSubValue(value, billion)}B`;
  }
  if (value / million > 1) {
    return `${Math.floor(value / million)}.${getSubValue(value, million)}M`;
  }
  return 0;
};

export const getSubValue = (value, range) => {
  const temp = value % range;
  const subRange = range / 100;
  const result = temp / subRange;
  return `${Math.floor(result)}`;
};

export const removeRedundantZeros = (value) => {
  let flag = 0;
  for (let i = value.length - 1; i >= 0; i--) {
    if (value[i] != 0) {
      flag = i;
      break;
    }
  }
  return value.substring(0, flag + 1);
};

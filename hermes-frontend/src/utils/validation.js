import moment from "moment";
export const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const verifyEmail = value => EMAIL_REGEXP.test(value);

export const verifyLength = (value, length) => value.length >= length;

export const verifyIsNumber = value =>
  typeof value === "number" && !isNaN(value);

export const verifyIsPositiveNumber = value =>
  verifyIsNumber(value) && value >= 0;

export const verifyRangeInclusive = (value, min, max) =>
  value >= min && value <= max;

export const verifyRangeExclusive = (value, min, max) =>
  value > min && value < max;

export const verifyFutureDate = value => moment(value).isAfter(moment());

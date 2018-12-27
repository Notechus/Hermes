import moment from "moment";
export const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const verifyEmail = value => EMAIL_REGEXP.test(value);

export const verifyLength = (value, length) => value.length >= length;

export const verifyFutureDate = value => moment(value).isAfter(moment());

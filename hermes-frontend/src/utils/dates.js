import moment from "moment";

export const DATE_FORMAT = "YYYY-MM-DD";
export const DATETIME_FORMAT = DATE_FORMAT + " HH:mm::ss";

export const formatDate = date => {
  return moment(date, DATE_FORMAT);
};

export const formatDateTime = date => {
  return moment(date, DATETIME_FORMAT);
};

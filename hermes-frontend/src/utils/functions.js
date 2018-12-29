import moment from "moment";

export const DATE_FORMAT = "YYYY-MM-DD";
export const DATETIME_FORMAT = DATE_FORMAT + " HH:mm:ss";

export const formatDate = date => moment(date, DATE_FORMAT);

export const formatDateAsString = date => moment(date).format(DATE_FORMAT);

export const formatDateTime = date => moment(date, DATETIME_FORMAT);

export const compareOrders = (order1, order2) => order1 - order2;

export const sorByDateString = (date1, date2) => {
  const d1 = moment(date1, DATE_FORMAT);
  const d2 = moment(date2, DATE_FORMAT);

  if (d1.isAfter(d2)) {
    return 1;
  } else if (d2.isAfter(d1)) {
    return -1;
  } else {
    return 0;
  }
};

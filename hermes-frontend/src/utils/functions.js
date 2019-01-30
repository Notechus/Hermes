import moment from 'moment'

export const DATE_FORMAT = 'YYYY-MM-DD'
export const DATETIME_FORMAT = DATE_FORMAT + ' HH:mm:ss'
export const DAY_FORMAT = 'dddd'

export const formatDate = date => moment(date, DATE_FORMAT)

export const formatDateAsString = date => moment(date).format(DATE_FORMAT)

export const formatDateTime = date => moment(date, DATETIME_FORMAT)

export const compareOrders = (order1, order2) => order1 - order2

export const sortByActivityOrderAsc = (activity1, activity2) =>
  compareOrders(activity1.order, activity2.order)

export const sortByActivityOrderDesc = (activity1, activity2) =>
  compareOrders(activity2.order, activity1.order)

export const getStartOfDayMoment = () =>
  moment()
    .set('hour', 0)
    .set('minute', 0)
    .set('second', 0)

export const sortByTrainingDateDesc = (a, b) => sortByDateString(a.trainingDate, b.trainingDate)
export const sortByTrainingDateAsc = (a, b) => sortByDateString(b.trainingDate, a.trainingDate)

export const sortByDateString = (date1, date2) => {
  const d1 = moment(date1, DATE_FORMAT)
  const d2 = moment(date2, DATE_FORMAT)

  if (d1.isAfter(d2)) {
    return 1
  } else if (d2.isAfter(d1)) {
    return -1
  } else {
    return 0
  }
}

export const isDateInRange = (date, rangeStart, rangeEnd) => {
  const d = moment(date, DATE_FORMAT)
  return d.isSameOrAfter(rangeStart) && d.isSameOrBefore(rangeEnd)
}

export const normalizeToPercentRange = (value, oldMax, oldMin) =>
  (100 / (oldMax - oldMin)) * (value - oldMin)

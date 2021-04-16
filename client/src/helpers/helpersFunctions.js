export const convertTimestamp = (timestamp) => {
  const date = Date.parse(timestamp)
  const newDate = new Date(date)
  //prettier-ignore
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec'
  ]

  return months[newDate.getMonth()] + ' ' + newDate.getFullYear()
}

export const formatDates = (date: string) => {
  const dateObject = new Date(date)
  return dateObject.toDateString()
}

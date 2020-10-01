const convertStringToDate = (date: string): string => {
  const [day, month, year] = date.split('/');

  const newDate = new Date(`${year}-${month}-${day}`).setHours(3);

  const dateToString = new Date(newDate).toLocaleString('en');

  return dateToString;
};

export default convertStringToDate;

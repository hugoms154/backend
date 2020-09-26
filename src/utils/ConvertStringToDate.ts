const convertStringToDate = (date: string): string => {
  const [day, month, year] = date.split('/');

  const newDate = new Date(`${year}-${month}-${day}`).toISOString();

  return newDate;
};

export default convertStringToDate;

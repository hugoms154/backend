const convertStringToDate = (date: string): Date => {
  const [day, month, year] = date.split('/');
  const newDate = `${year}-${month}-${day}`;
  return new Date(newDate);
};

export default convertStringToDate;

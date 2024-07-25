export const getMinDate = () => {
  const today = new Date();
  const minDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate(),
  );
  return minDate.toISOString().split("T")[0];
};

export const getMaxDate = () => {
  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() - 100,
    today.getMonth(),
    today.getDate(),
  );
  return maxDate.toISOString().split("T")[0];
};

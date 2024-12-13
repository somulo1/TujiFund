export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};


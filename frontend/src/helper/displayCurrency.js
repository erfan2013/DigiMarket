const DisplayUSDCurrency = (num) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0, // همیشه دو رقم اعشاری نمایش داده می‌شود
    maximumFractionDigits: 2  // حداکثر دو رقم اعشاری (برای جلوگیری از اعداد بزرگتر از دو رقم اعشاری)
  });

  return formatter.format(num);
}

export default DisplayUSDCurrency;
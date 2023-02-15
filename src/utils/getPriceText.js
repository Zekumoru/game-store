const getPriceText = (price, { space = false } = {}) => {
  if (typeof price.value !== 'number') return '';

  let text;
  if (price.currency.placement === 'left') {
    text =
      (price.currency.symbol ?? '') +
      (space ? ' ' : '') +
      price.value.toFixed(2);
  } else {
    text =
      price.value.toFixed(2) +
      (space ? ' ' : '') +
      (price.currency.symbol ?? '');
  }

  if (price?.text?.match(/,\d{2}/)) {
    return text.replace('.', ',');
  }
  return text;
};

export default getPriceText;

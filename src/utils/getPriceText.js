const getPriceText = (price, { space = false } = {}) => {
  let text;
  if (price.currency?.placement === 'left') {
    text = `${price.currency?.symbol ?? ''}${space ? ' ' : ''}${price.value}`;
  } else {
    text = `${price.value}${space ? ' ' : ''}${price.currency?.symbol ?? ''}`;
  }

  if (price?.text?.match(/,\d{2}/)) {
    return text.replace('.', ',');
  }
  return text;
};

export default getPriceText;

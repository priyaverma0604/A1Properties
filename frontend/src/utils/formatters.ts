export const formatIndianPrice = (
  price: number,
  propertyType: string,
  lang: 'en' | 'hi' = 'en'
): string => {
  if (!price || price === 0) {
    return lang === 'hi' ? 'कीमत संपर्क पर' : 'Price on Request';
  }
  if (propertyType === 'rent') {
    return `₹${price.toLocaleString('en-IN')}/${lang === 'hi' ? 'माह' : 'mo'}`;
  }
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2).replace(/\.00$/, '')} ${lang === 'hi' ? 'करोड़' : 'Cr'}`;
  }
  if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2).replace(/\.00$/, '')} ${lang === 'hi' ? 'लाख' : 'Lakh'}`;
  }
  return `₹${price.toLocaleString('en-IN')}`;
};

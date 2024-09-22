export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
};

export const calculateDiscountedPrice = (price: number, discount: number): number => {
  return price - (price * (discount / 100));
};

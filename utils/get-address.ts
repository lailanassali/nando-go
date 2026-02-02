export const getAddress = (address: any) => {
  if (!address) return "";
  return [address.addressLocality, address.streetAddress, address.postalCode]
    .filter(Boolean)
    .join("\n");
};
